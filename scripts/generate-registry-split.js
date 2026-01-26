const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'u0_a446',
  host: 'localhost',
  database: 'neurosphere',
  port: 5432,
});

const RECORDS_PER_FILE = 1000000;

async function generateSplitRegistry() {
  const client = await pool.connect();
  try {
    console.log("\x1b[36m%s\x1b[0m", "=== NEUROSPHERE REGISTRY ENGINE ACTIVATED ===");
    console.log("\x1b[33m[INFO]\x1b[0m Mapping 'id' as wallet_id identity...");

    await client.query("BEGIN");
    // Menggunakan 'id' sesuai hasil inspeksi psql Anda
    await client.query("DECLARE cur CURSOR FOR SELECT id AS wallet_id, owner_type FROM wallets");

    let fileIndex = 1;
    let recordCount = 0;
    let totalProcessed = 0;

    let fileName = `registry_part${fileIndex}.csv`;
    let writeStream = fs.createWriteStream(fileName);
    writeStream.write("wallet_id,owner_type\n");

    while (true) {
      const res = await client.query("FETCH 10000 FROM cur");
      if (res.rows.length === 0) break;

      const lines = res.rows.map(r => `${r.wallet_id},${r.owner_type}`).join("\n") + "\n";
      
      const canWrite = writeStream.write(lines);
      if (!canWrite) {
        await new Promise(resolve => writeStream.once("drain", resolve));
      }

      recordCount += res.rows.length;
      totalProcessed += res.rows.length;

      if (recordCount >= RECORDS_PER_FILE) {
        writeStream.end();
        console.log(`\n\x1b[32m✔\x1b[0m ${fileName} | Records: ${recordCount.toLocaleString()}`);

        fileIndex++;
        recordCount = 0;
        fileName = `registry_part${fileIndex}.csv`;
        writeStream = fs.createWriteStream(fileName);
        writeStream.write("wallet_id,owner_type\n");
      }

      process.stdout.write(`\r> Processing TM Identity: ${totalProcessed.toLocaleString()} records...`);
    }

    await client.query("CLOSE cur");
    await client.query("COMMIT");
    writeStream.end();
    
    console.log("\n\n\x1b[35m--- EXECUTION SUMMARY ---\x1b[0m");
    console.log(`Total Files Created : ${fileIndex}`);
    console.log(`Total TM Manifested : ${totalProcessed.toLocaleString()} Identities`);
    console.log("\x1b[32m%s\x1b[0m", "STATUS: SUCCESSFUL SYNC");

  } catch (err) {
    console.error("\n\x1b[31m%s\x1b[0m", "CRITICAL ERROR:", err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

generateSplitRegistry();
