const fs = require("node:fs/promises");
const path = require("node:path");

const dotenv = require("dotenv");

const rootDir = path.join(__dirname, "..");
dotenv.config({ path: path.join(rootDir, ".env") });
dotenv.config({ path: path.join(rootDir, ".env.local"), override: true });

const backupRoot = path.join(rootDir, "backups");
const buckets = ["portfolio-images", "portfolio-videos"];
const tables = ["site_content", "site_links", "videos", "leads"];

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

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

async function listBucketFiles(supabase, bucket, prefix = "") {
  const { data, error } = await supabase.storage.from(bucket).list(prefix, {
    limit: 1000,
    sortBy: { column: "name", order: "asc" },
  });
  if (error) throw error;

  const files = [];
  for (const item of data || []) {
    const filePath = prefix ? `${prefix}/${item.name}` : item.name;
    const isFolder = !item.id && !item.metadata;
    if (isFolder) {
      files.push(...(await listBucketFiles(supabase, bucket, filePath)));
    } else {
      files.push({
        path: filePath,
        size: Number(item.metadata?.size || 0),
        createdAt: item.created_at || "",
        updatedAt: item.updated_at || "",
      });
    }
  }
  return files;
}

async function downloadFile(supabase, bucket, filePath, outputDir) {
  const { data, error } = await supabase.storage.from(bucket).download(filePath);
  if (error) throw error;

  const outputFile = path.join(outputDir, "storage", bucket, filePath);
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  const buffer = Buffer.from(await data.arrayBuffer());
  await fs.writeFile(outputFile, buffer);
  return buffer.length;
}

async function backupTables(supabase, outputDir) {
  const result = {};
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw error;
    result[table] = data || [];
    await fs.writeFile(path.join(outputDir, `${table}.json`), `${JSON.stringify(result[table], null, 2)}\n`, "utf8");
  }
  return result;
}

async function backupStorage(supabase, outputDir) {
  const inventory = {};
  for (const bucket of buckets) {
    const files = await listBucketFiles(supabase, bucket);
    let downloadedBytes = 0;
    for (const file of files) {
      downloadedBytes += await downloadFile(supabase, bucket, file.path, outputDir);
    }
    inventory[bucket] = {
      fileCount: files.length,
      totalBytes: downloadedBytes,
      files,
    };
  }
  await fs.writeFile(path.join(outputDir, "storage-inventory.json"), `${JSON.stringify(inventory, null, 2)}\n`, "utf8");
  return inventory;
}

async function main() {
  const supabase = await createSupabaseClient();
  const outputDir = path.join(backupRoot, `supabase-${timestamp()}`);
  await fs.mkdir(outputDir, { recursive: true });

  const tableData = await backupTables(supabase, outputDir);
  const storage = await backupStorage(supabase, outputDir);
  const summary = {
    createdAt: new Date().toISOString(),
    tables: Object.fromEntries(Object.entries(tableData).map(([table, rows]) => [table, rows.length])),
    storage: Object.fromEntries(
      Object.entries(storage).map(([bucket, item]) => [
        bucket,
        {
          fileCount: item.fileCount,
          totalMB: Number((item.totalBytes / 1024 / 1024).toFixed(2)),
        },
      ]),
    ),
  };

  await fs.writeFile(path.join(outputDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ outputDir, ...summary }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
