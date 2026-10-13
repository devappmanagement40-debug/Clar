import { db } from "./db";
import { users, tasks, paymentChannels, platformSettings, countries, products } from "@shared/schema";
import { getActiveCountryMethodNames } from "@shared/country-methods";
import { equinorInitialOffers } from "@shared/equinor-initial-offers";
import bcrypt from "bcrypt";
import { eq, sql } from "drizzle-orm";

export async function seed() {
  console.log("Seeding database...");

  // Create session table for connect-pg-simple (if not exists)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL,
      CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE
    ) WITH (OIDS=FALSE)
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire")
  `);
  await db.execute(sql`
    ALTER TABLE "payment_numbers" ALTER COLUMN "phone" DROP NOT NULL
  `).catch(() => undefined);
  await db.execute(sql`
    ALTER TABLE "payment_numbers" ADD COLUMN IF NOT EXISTS "payment_link" text
  `).catch(() => undefined);
  await db.execute(sql`
    ALTER TABLE "deposits" ADD COLUMN IF NOT EXISTS "withdrawal_fee_payment_id" integer
  `).catch(() => undefined);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "withdrawal_fee_payments" (
      "id" serial PRIMARY KEY,
      "user_id" integer NOT NULL REFERENCES "users"("id"),
      "withdrawal_amount" integer NOT NULL,
      "required_amount" integer NOT NULL,
      "status" text NOT NULL DEFAULT 'pending',
      "deposit_id" integer,
      "created_at" timestamp NOT NULL DEFAULT now(),
      "paid_at" timestamp,
      "used_at" timestamp
    )
  `).catch(() => undefined);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "withdrawal_fee_payments_user_status_idx"
      ON "withdrawal_fee_payments" ("user_id", "status")
  `).catch(() => undefined);

  // Ensure countries table exists
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "countries" (
      "id" serial PRIMARY KEY,
      "code" text NOT NULL UNIQUE,
      "name" text NOT NULL,
      "currency" text NOT NULL,
      "phone_prefix" text NOT NULL,
      "operators" text NOT NULL DEFAULT '[]',
      "withdrawal_methods" text,
      "is_active" boolean NOT NULL DEFAULT true
    )
  `);
  await db.execute(sql`
    ALTER TABLE "countries" ADD COLUMN IF NOT EXISTS "withdrawal_methods" text
  `);

  // Check if admin already exists. Keep a development fallback for existing
  // installations, while allowing deployments to configure the admin phone
  // through the secret store.
  const adminPhone = process.env.ADMIN_PHONE || "99935673";
  const adminCountry = process.env.ADMIN_COUNTRY || "TG";
  const existingAdmin = await db.select().from(users).where(eq(users.phone, adminPhone));
  const adminPassword = process.env.ADMIN_PASSWORD;

  const adminPin = process.env.ADMIN_PIN;

  if (existingAdmin.length === 0) {
    if (!adminPassword) {
      console.warn("No administrator exists yet; set ADMIN_PASSWORD to provision the initial admin.");
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      await db.insert(users).values({
        fullName: "Super Admin",
        phone: adminPhone,
        country: adminCountry,
        password: hashedPassword,
        referralCode: "ADMIN1",
        balance: "0",
        isAdmin: true,
        isSuperAdmin: true,
        adminPin: adminPin || null,
      });
      console.log("Super admin created");
      if (adminPin) console.log("Super admin PIN configured");
    }
  } else {
    // Promote the configured account without replacing its existing login credentials.
    const updateData: any = { isAdmin: true, isSuperAdmin: true };
    if (adminPin) {
      updateData.adminPin = adminPin;
      console.log("Super admin PIN updated");
    }
    await db.update(users)
      .set(updateData)
      .where(eq(users.phone, adminPhone));
    console.log("Super admin access verified");
  }

  // Seed countries only on first install — never overwrite admin changes
  const existingCountries = await db.select().from(countries);
  if (existingCountries.length === 0) {
    const defaultCountries = [
      {
        code: "TG",
        name: "Togo",
        currency: "XOF",
        phonePrefix: "228",
        operators: JSON.stringify(["Togocel", "Moov Africa Togo"]),
        withdrawalMethods: JSON.stringify(["Togocel", "Moov Africa Togo"]),
        isActive: true,
      },
      {
        code: "CI",
        name: "Côte d'Ivoire",
        currency: "XOF",
        phonePrefix: "225",
        operators: JSON.stringify([]),
        withdrawalMethods: JSON.stringify(["Wave"]),
        isActive: true,
      },
      {
        code: "BF",
        name: "Burkina Faso",
        currency: "XOF",
        phonePrefix: "226",
        operators: JSON.stringify(["Orange Burkina", "Moov Africa Burkina"]),
        withdrawalMethods: JSON.stringify(["Orange Burkina", "Moov Africa Burkina"]),
        isActive: true,
      },
      {
        code: "NE",
        name: "Niger",
        currency: "XOF",
        phonePrefix: "227",
        operators: JSON.stringify(["NITA TRANSFERT", "AMANA TRANSFERT"]),
        withdrawalMethods: JSON.stringify(["Airtel Money", "Wave"]),
        isActive: true,
      },
      {
        code: "TD",
        name: "Tchad",
        currency: "XAF",
        phonePrefix: "235",
        operators: JSON.stringify(["Airtel Money", "Moov"]),
        withdrawalMethods: JSON.stringify(["Airtel Money", "Moov"]),
        isActive: true,
      },
    ];
    for (const countryData of defaultCountries) {
      await db.insert(countries).values(countryData);
      console.log(`Country added: ${countryData.name}`);
    }
  } else {
    console.log(`Countries skipped — ${existingCountries.length} existing countries preserved`);
  }

  const currentCountries = await db.select().from(countries);
  if (!currentCountries.some((country) => country.code.toUpperCase() === "TD")) {
    await db.insert(countries).values({
      code: "TD",
      name: "Tchad",
      currency: "XAF",
      phonePrefix: "235",
      operators: JSON.stringify(["Airtel Money", "Moov"]),
      withdrawalMethods: JSON.stringify(["Airtel Money", "Moov"]),
      isActive: true,
    });
    console.log("Country added: Tchad");
  }

  const legacyWithdrawalDefaults: Record<string, string[]> = {
    CI: ["Wave"],
    NE: ["Airtel Money", "Wave"],
  };
  const legacyTchadNames = ["Airtel Tchad", "Moov Africa Tchad"];
  const currentTchadNames = ["Airtel Money", "Moov"];
  const normalizedNames = (names: string[]) => names.map((name) => name.toLocaleLowerCase()).sort();
  for (const country of currentCountries) {
    if (
      country.code.toUpperCase() === "TD" &&
      JSON.stringify(normalizedNames(getActiveCountryMethodNames(country.operators))) ===
        JSON.stringify(normalizedNames(legacyTchadNames))
    ) {
      const updateData: { operators: string; withdrawalMethods?: string } = {
        operators: JSON.stringify(currentTchadNames),
      };
      const existingWithdrawalNames = getActiveCountryMethodNames(country.withdrawalMethods);
      if (
        country.withdrawalMethods === null ||
        JSON.stringify(normalizedNames(existingWithdrawalNames)) === JSON.stringify(normalizedNames(legacyTchadNames))
      ) {
        updateData.withdrawalMethods = JSON.stringify(currentTchadNames);
      }
      await db.update(countries).set(updateData).where(eq(countries.id, country.id));
      continue;
    }
    if (country.withdrawalMethods !== null) continue;
    const code = country.code.toUpperCase();
    const methods = legacyWithdrawalDefaults[code] ?? getActiveCountryMethodNames(country.operators);
    await db.update(countries)
      .set({ withdrawalMethods: JSON.stringify(methods) })
      .where(eq(countries.id, country.id));
  }

  // Insert the approved initial offers once. The marker and rows share a transaction,
  // so later starts preserve admin edits and deletions instead of reseeding the catalog.
  const productCatalogSeedKey = "migration_initial_equinor_offers_applied";
  const initialOffersResult = await db.transaction(async tx => {
    const [seedMarker] = await tx.insert(platformSettings)
      .values({ key: productCatalogSeedKey, value: "pending" })
      .onConflictDoNothing()
      .returning({ key: platformSettings.key });

    if (!seedMarker) return { inserted: 0, alreadyApplied: true, existing: 0 };

    const existingProducts = await tx.select({
      name: products.name,
      sortOrder: products.sortOrder,
    }).from(products);
    const existingNames = new Set(
      existingProducts.map(product => product.name.trim().toLocaleLowerCase("fr")),
    );
    const offersToInsert = equinorInitialOffers.filter(
      offer => !existingNames.has(offer.name.toLocaleLowerCase("fr")),
    );
    const firstSortOrder = existingProducts.reduce(
      (highest, product) => Math.max(highest, product.sortOrder),
      -1,
    ) + 1;

    if (offersToInsert.length > 0) {
      await tx.insert(products).values(offersToInsert.map((offer, index) => ({
        name: offer.name,
        price: offer.price,
        dailyEarnings: offer.dailyEarnings,
        cycleDays: offer.cycleDays,
        totalReturn: offer.dailyEarnings * offer.cycleDays,
        imageUrl: offer.imageUrl,
        isFree: false,
        isActive: offer.isActive,
        sortOrder: firstSortOrder + index,
      })));
    }

    await tx.update(platformSettings)
      .set({ value: "true" })
      .where(eq(platformSettings.key, productCatalogSeedKey));

    return { inserted: offersToInsert.length, alreadyApplied: false };
  });
  if (initialOffersResult.alreadyApplied) {
    console.log("Initial product offers skipped — bootstrap already applied");
  } else {
    console.log(`Initial product offers added: ${initialOffersResult.inserted}; existing products preserved`);
  }

  // Apply defaults once only. Persisting the marker means admin deletions stay deleted after a restart.
  const initialTasksSeedKey = "migration_initial_tasks_applied";
  const initialTasksSeedResult = await db.transaction(async tx => {
    const [seedMarker] = await tx.insert(platformSettings)
      .values({ key: initialTasksSeedKey, value: "pending" })
      .onConflictDoNothing()
      .returning({ key: platformSettings.key });

    if (!seedMarker) return { inserted: 0, alreadyApplied: true };

    const existingTasks = await tx.select().from(tasks);
    if (existingTasks.length === 0) {
      await tx.insert(tasks).values([
        { name: "Parrain Bronze", description: "Inviter 3 personnes a investir", requiredInvites: 3, reward: 350, sortOrder: 1 },
        { name: "Parrain Argent", description: "Inviter 5 personnes a investir", requiredInvites: 5, reward: 750, sortOrder: 2 },
        { name: "Parrain Or", description: "Inviter 10 personnes a investir", requiredInvites: 10, reward: 2500, sortOrder: 3 },
        { name: "Parrain Platine", description: "Inviter 30 personnes a investir", requiredInvites: 30, reward: 6500, sortOrder: 4 },
        { name: "Parrain Diamant", description: "Inviter 100 personnes a investir", requiredInvites: 100, reward: 15000, sortOrder: 5 },
        { name: "Parrain Elite", description: "Inviter 300 personnes a investir", requiredInvites: 300, reward: 50000, sortOrder: 6 },
      ]);
    }

    await tx.update(platformSettings)
      .set({ value: "true" })
      .where(eq(platformSettings.key, initialTasksSeedKey));
    return {
      inserted: existingTasks.length === 0 ? 6 : 0,
      alreadyApplied: false,
      existing: existingTasks.length,
    };
  });
  if (initialTasksSeedResult.alreadyApplied) {
    console.log("Initial task catalog bootstrap already applied");
  } else if (initialTasksSeedResult.inserted > 0) {
    console.log(`Initial task catalog added: ${initialTasksSeedResult.inserted}`);
  } else {
    console.log(`Initial task catalog preserved; ${initialTasksSeedResult.existing} task(s) already existed`);
  }

  // Add the requested seventh milestone once; this marker prevents deleted admin-managed tasks from being reseeded.
  const seventhTaskSeedKey = "migration_initial_task_seven_applied";
  const seventhTaskSeedResult = await db.transaction(async tx => {
    const [seedMarker] = await tx.insert(platformSettings)
      .values({ key: seventhTaskSeedKey, value: "pending" })
      .onConflictDoNothing()
      .returning({ key: platformSettings.key });

    if (!seedMarker) return { added: false, alreadyApplied: true };

    const currentTasks = await tx.select().from(tasks);
    const alreadyExists = currentTasks.some(
      task => task.name.trim().toLocaleLowerCase("fr") === "parrain émeraude",
    );

    if (!alreadyExists) {
      const sortOrder = currentTasks.reduce((highest, task) => Math.max(highest, task.sortOrder), 0) + 1;
      await tx.insert(tasks).values({
        name: "Parrain Émeraude",
        description: "Inviter 500 personnes à rejoindre votre équipe",
        requiredInvites: 500,
        reward: 100000,
        sortOrder,
        isActive: true,
      });
    }

    await tx.update(platformSettings)
      .set({ value: "true" })
      .where(eq(platformSettings.key, seventhTaskSeedKey));
    return { added: !alreadyExists, alreadyApplied: false };
  });
  if (seventhTaskSeedResult.added) {
    console.log("Seventh task milestone added; it remains editable in administration");
  } else if (seventhTaskSeedResult.alreadyApplied) {
    console.log("Seventh task milestone bootstrap already applied");
  }

  // Check if payment channels exist
  const existingChannels = await db.select().from(paymentChannels);
  if (existingChannels.length === 0) {
    await db.insert(paymentChannels).values([
      { name: "LeekPay", redirectUrl: "https://leekpay.com/pay", isApi: false },
      { name: "FedaPay", redirectUrl: "https://fedapay.com/payment", isApi: false },
    ]);
    console.log("Payment channels seeded");
  }

  // Check if settings exist - apply new values for new keys or update existing
  const existingSettings = await db.select().from(platformSettings);
  const requiredSettings = [
    { key: "supportLink", value: "https://t.me/sybotx" },
    { key: "supportType", value: "telegram" },
    { key: "supportLabel", value: "Service client" },
    { key: "support2Link", value: "https://t.me/sybotx" },
    { key: "support2Type", value: "telegram" },
    { key: "support2Label", value: "Service client 2" },
    { key: "channelLink", value: "https://t.me/sybotx" },
    { key: "channelType", value: "telegram" },
    { key: "channelLabel", value: "Chaîne officielle" },
    { key: "groupLink", value: "https://t.me/sybotx" },
    { key: "groupType", value: "telegram" },
    { key: "groupLabel", value: "Groupe de discussion" },
    { key: "popupButtonLabel", value: "Cliquez ici pour rejoindre le groupe Telegram" },
    { key: "noticeText", value: "Bienvenue sur Equinor ! Consultez les conditions des dépôts, retraits et bonus avant toute opération." },
    { key: "supportEnabled", value: "true" },
    { key: "support2Enabled", value: "true" },
    { key: "channelEnabled", value: "true" },
    { key: "groupEnabled", value: "true" },
    { key: "minDeposit", value: "3500" },
    { key: "minWithdrawal", value: "800" },
    { key: "withdrawalFees", value: "16" },
    { key: "withdrawalStartHour", value: "9" },
    { key: "withdrawalEndHour", value: "17" },
    { key: "maxWithdrawalsPerDay", value: "1" },
    { key: "withdrawalPrepaymentEnabled", value: "false" },
    { key: "level1Commission", value: "25" },
    { key: "level2Commission", value: "4" },
    { key: "level3Commission", value: "1" },
    { key: "signupBonus", value: "1000" },
    { key: "soleaspayEnabled", value: "false" },
    { key: "soleaspayCountries", value: "" },
    { key: "soleaspayChannelName", value: "SoleaPay" },
    { key: "omnipayEnabled", value: "false" },
    { key: "omnipayChannelName", value: "OmniPay" },
    { key: "sendavapayEnabled", value: "false" },
    { key: "sendavapayChannelName", value: "SendavaPay" },
    { key: "westpayEnabled", value: "false" },
    { key: "westpayChannelName", value: "WestPay" },
    { key: "westpayCountries", value: "" },
    { key: "ashtechEnabled", value: "false" },
    { key: "ashtechChannelName", value: "AshtechPay" },
    { key: "ashtechCountries", value: "" },
    { key: "inpayEnabled", value: "false" },
    { key: "inpayChannelName", value: "InPay" },
    { key: "inpayCountries", value: "" },
    { key: "clapayPayoutCountries", value: '["NE","BF"]' },
  ];

  for (const settingData of requiredSettings) {
    const existing = existingSettings.find(s => s.key === settingData.key);
    const isSensitive = /secret|key|token|password/i.test(settingData.key);
    if (!existing) {
      await db.insert(platformSettings).values(settingData);
      console.log(`Setting added: ${settingData.key}${isSensitive ? "" : ` = ${settingData.value}`}`);
    } else if (
      settingData.key === "noticeText" &&
      /sybotx|disney|walt|pixar|marvel|star wars/i.test(existing.value)
    ) {
      await db.update(platformSettings)
        .set({ value: settingData.value })
        .where(eq(platformSettings.key, settingData.key));
      console.log(`Setting updated: ${settingData.key} = ${settingData.value}`);
    } else {
      console.log(`Setting preserved: ${existing.key}${isSensitive ? "" : ` = ${existing.value}`}`);
    }
  }

  const withdrawalFeesMigrationKey = "migration_withdrawal_fees_16_applied";
  if (!existingSettings.some((setting) => setting.key === withdrawalFeesMigrationKey)) {
    await db.update(platformSettings)
      .set({ value: "16", modifiedAt: new Date() })
      .where(eq(platformSettings.key, "withdrawalFees"));
    await db.insert(platformSettings)
      .values({ key: withdrawalFeesMigrationKey, value: "true" })
      .onConflictDoNothing();
    console.log("Withdrawal fee setting migrated to 16%");
  }

  const signupBonusMigrationKey = "migration_signup_bonus_1000_applied";
  if (!existingSettings.some((setting) => setting.key === signupBonusMigrationKey)) {
    await db.update(platformSettings)
      .set({ value: "1000", modifiedAt: new Date() })
      .where(eq(platformSettings.key, "signupBonus"));
    await db.insert(platformSettings)
      .values({ key: signupBonusMigrationKey, value: "true" })
      .onConflictDoNothing();
    console.log("Signup bonus setting migrated to 1000 FCFA");
  }

  const minimumWithdrawalMigrationKey = "migration_min_withdrawal_800_applied";
  if (!existingSettings.some((setting) => setting.key === minimumWithdrawalMigrationKey)) {
    await db.update(platformSettings)
      .set({ value: "800", modifiedAt: new Date() })
      .where(eq(platformSettings.key, "minWithdrawal"));
    await db.insert(platformSettings)
      .values({ key: minimumWithdrawalMigrationKey, value: "true" })
      .onConflictDoNothing();
    console.log("Minimum withdrawal setting migrated to 800 FCFA");
  }

  // Preserve existing payment settings. Deposit routes are configured explicitly
  // by an administrator; startup seeding must not assign countries automatically.
  console.log("Settings check complete");

  console.log("Database seeding complete!");
}
