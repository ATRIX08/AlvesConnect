const fs = require("node:fs/promises");
const path = require("node:path");

const dotenv = require("dotenv");
const { Pool } = require("pg");

const rootDir = path.join(__dirname, "..");
dotenv.config({ path: path.join(rootDir, ".env") });
dotenv.config({ path: path.join(rootDir, ".env.local"), override: true });

const schemaFile = path.join(rootDir, "neon", "schema.sql");
const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || "";

async function createSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY precisam estar no ambiente local.");
  }

  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function createPool() {
  if (!databaseUrl) {
    throw new Error("Defina DATABASE_URL com a connection string da Neon antes de migrar.");
  }

  const isLocal = /localhost|127\.0\.0\.1/i.test(databaseUrl);
  return new Pool({
    connectionString: databaseUrl,
    max: 3,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });
}

async function readSupabaseTable(supabase, table) {
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw error;
  return data || [];
}

async function loadSupabaseData() {
  const supabase = await createSupabaseClient();
  const [siteContent, siteLinks, videos, leads] = await Promise.all([
    readSupabaseTable(supabase, "site_content"),
    readSupabaseTable(supabase, "site_links"),
    readSupabaseTable(supabase, "videos"),
    readSupabaseTable(supabase, "leads"),
  ]);

  return { siteContent, siteLinks, videos, leads };
}

async function upsertSiteContent(client, rows) {
  for (const row of rows) {
    await client.query(
      `
        insert into public.site_content (key, value, updated_at)
        values ($1, $2, coalesce($3::timestamptz, now()))
        on conflict (key) do update
        set value = excluded.value,
            updated_at = excluded.updated_at
      `,
      [row.key, row.value || "", row.updated_at || null],
    );
  }
}

async function upsertSiteLinks(client, rows) {
  for (const row of rows) {
    await client.query(
      `
        insert into public.site_links (type, url, updated_at)
        values ($1, $2, coalesce($3::timestamptz, now()))
        on conflict (type) do update
        set url = excluded.url,
            updated_at = excluded.updated_at
      `,
      [row.type, row.url || "", row.updated_at || null],
    );
  }
}

async function upsertVideos(client, rows) {
  for (const row of rows) {
    await client.query(
      `
        insert into public.videos (id, title, description, url, position, active, created_at, updated_at)
        values ($1, $2, $3, $4, $5, $6, coalesce($7::timestamptz, now()), coalesce($8::timestamptz, now()))
        on conflict (id) do update
        set title = excluded.title,
            description = excluded.description,
            url = excluded.url,
            position = excluded.position,
            active = excluded.active,
            created_at = excluded.created_at,
            updated_at = excluded.updated_at
      `,
      [
        row.id,
        row.title || "",
        row.description || "",
        row.url || "",
        Number.isFinite(Number(row.position)) ? Number(row.position) : 0,
        row.active !== false,
        row.created_at || null,
        row.updated_at || null,
      ],
    );
  }
}

async function upsertLeads(client, rows) {
  for (const row of rows) {
    await client.query(
      `
        insert into public.leads (
          id, name, company, phone, service, investment_range, start_timeline, message, status, created_at, updated_at
        )
        values (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, coalesce($10::timestamptz, now()), coalesce($11::timestamptz, now())
        )
        on conflict (id) do update
        set name = excluded.name,
            company = excluded.company,
            phone = excluded.phone,
            service = excluded.service,
            investment_range = excluded.investment_range,
            start_timeline = excluded.start_timeline,
            message = excluded.message,
            status = excluded.status,
            created_at = excluded.created_at,
            updated_at = excluded.updated_at
      `,
      [
        row.id,
        row.name || "",
        row.company || "",
        row.phone || "",
        row.service || "",
        row.investment_range || "",
        row.start_timeline || "",
        row.message || "",
        row.status || "Novo",
        row.created_at || null,
        row.updated_at || null,
      ],
    );
  }
}

async function verifyTarget(client) {
  const tables = ["site_content", "site_links", "videos", "leads"];
  const result = {};
  for (const table of tables) {
    const { rows } = await client.query(`select count(*)::int as count from public.${table}`);
    result[table] = rows[0].count;
  }
  return result;
}

async function main() {
  const source = await loadSupabaseData();
  const pool = createPool();
  const client = await pool.connect();

  try {
    const schema = await fs.readFile(schemaFile, "utf8");
    await client.query("begin");
    await client.query(schema);
    await upsertSiteContent(client, source.siteContent);
    await upsertSiteLinks(client, source.siteLinks);
    await upsertVideos(client, source.videos);
    await upsertLeads(client, source.leads);
    await client.query("commit");
    const targetCounts = await verifyTarget(client);
    console.log(
      JSON.stringify(
        {
          ok: true,
          sourceCounts: {
            site_content: source.siteContent.length,
            site_links: source.siteLinks.length,
            videos: source.videos.length,
            leads: source.leads.length,
          },
          targetCounts,
          note: "Mídias continuam no Supabase Storage. Este script migra apenas o Postgres.",
        },
        null,
        2,
      ),
    );
  } catch (error) {
    await client.query("rollback").catch(() => {});
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
