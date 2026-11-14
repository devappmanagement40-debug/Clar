import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const sandboxRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const previewPath = '/__mockup/';
const startupTimeoutMs = 30_000;

async function getAvailablePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const { port } = server.address();
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  return port;
}

async function waitForPreview(url, child) {
  const deadline = Date.now() + startupTimeoutMs;
  let lastError;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Preview server exited early with code ${child.exitCode}.`);
    }

    try {
      return await fetch(url, { signal: AbortSignal.timeout(1_000) });
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  throw new Error(
    `Preview server did not respond within ${startupTimeoutMs}ms: ${lastError?.message ?? 'unknown error'}`,
  );
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const port = await getAvailablePort();
const origin = `http://127.0.0.1:${port}`;
const previewUrl = new URL(previewPath, origin);
const { REPL_ID: _replId, ...environment } = process.env;
const server = spawn(
  process.execPath,
  [
    path.join(sandboxRoot, 'node_modules/vite/bin/vite.js'),
    '--config',
    'vite.config.ts',
    '--host',
    '127.0.0.1',
    '--port',
    String(port),
    '--strictPort',
  ],
  {
    cwd: sandboxRoot,
    env: {
      ...environment,
      NODE_ENV: 'development',
      PORT: String(port),
      BASE_PATH: previewPath,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let serverOutput = '';
server.stdout.setEncoding('utf8').on('data', (chunk) => {
  serverOutput += chunk;
});
server.stderr.setEncoding('utf8').on('data', (chunk) => {
  serverOutput += chunk;
});

try {
  const pageResponse = await waitForPreview(previewUrl, server);
  assert(
    pageResponse.status === 200,
    `GET ${previewPath} returned HTTP ${pageResponse.status}, expected 200.`,
  );

  const html = await pageResponse.text();
  const title = html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]?.trim();
  assert(title === 'Mockup Canvas', `Expected page title "Mockup Canvas", received "${title ?? 'none'}".`);

  const moduleScripts = [...html.matchAll(/<script\b([^>]*)>\s*<\/script>/gi)]
    .map(([, attributes]) => {
      const type = attributes.match(/\btype=["']([^"']+)["']/i)?.[1];
      const src = attributes.match(/\bsrc=["']([^"']+)["']/i)?.[1];
      return type === 'module' ? src : undefined;
    })
    .filter(Boolean);
  const entrySource = moduleScripts.find((src) =>
    new URL(src, pageResponse.url).pathname.endsWith('/src/main.tsx'),
  );
  assert(entrySource, 'The page does not declare the application entry point at src/main.tsx.');

  const entryUrl = new URL(entrySource, pageResponse.url);
  const entryResponse = await fetch(entryUrl, {
    signal: AbortSignal.timeout(5_000),
  });
  assert(
    entryResponse.status === 200,
    `Application entry point returned HTTP ${entryResponse.status}, expected 200.`,
  );

  const contentType = entryResponse.headers.get('content-type') ?? '';
  const entryCode = await entryResponse.text();
  assert(
    contentType.includes('javascript') && entryCode.length > 0,
    `Application entry point did not load as JavaScript (content-type: ${contentType || 'missing'}).`,
  );

  console.log(`PASS ${previewUrl} returned HTTP 200 with title "${title}".`);
  console.log(`PASS application entry point loaded from ${entryUrl.pathname}.`);
} catch (error) {
  if (serverOutput.trim()) {
    console.error('Preview server output:');
    console.error(serverOutput.trim());
  }
  console.error(`FAIL ${error.message}`);
  process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]);
  if (server.exitCode === null) {
    server.kill('SIGKILL');
  }
}
