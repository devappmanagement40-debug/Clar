import { inArray, sql } from "drizzle-orm";
import { db, pool } from "../server/db";
import { platformSettings } from "../shared/schema";

const keys = ["withdrawalStartHour", "withdrawalEndHour"] as const;

async function updateWithdrawalHours() {
  if (!process.env.SUPABASE_NEW_DATABASE_URL && !process.env.SUPABASE_DATABASE_URL) {
    throw new Error("The application's external PostgreSQL connection is unavailable.");
  }

  const identity = await db.execute(
    sql`select current_database() as database, current_user as role`,
  );
  const rows = await db
    .select({ key: platformSettings.key, value: platformSettings.value })
    .from(platformSettings)
    .where(inArray(platformSettings.key, [...keys]));

  console.log(JSON.stringify({
    database: identity.rows[0]?.database,
    role: identity.rows[0]?.role,
    previousHours: rows,
  }));

  await db.transaction(async (transaction) => {
    await transaction
      .insert(platformSettings)
      .values([
        { key: "withdrawalStartHour", value: "9" },
        { key: "withdrawalEndHour", value: "19" },
      ])
      .onConflictDoUpdate({
        target: platformSettings.key,
        set: { value: sql`excluded.value`, modifiedAt: new Date() },
      });
  });

  const updated = await db
    .select({ key: platformSettings.key, value: platformSettings.value })
    .from(platformSettings)
    .where(inArray(platformSettings.key, [...keys]));
  console.log(JSON.stringify({ savedHours: updated }));
}

updateWithdrawalHours()
  .catch((error) => {
    console.error(
      "Withdrawal-hour update failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
