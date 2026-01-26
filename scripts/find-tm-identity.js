const { Pool } = require('pg');

const pool = new Pool({
  user: 'u0_a446',
  host: 'localhost',
  database: 'neurosphere',
  port: 5432,
});

async function findIdentity(searchId) {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM wallets WHERE id = $1", [searchId]);
    if (res.rows.length > 0) {
      console.log("\x1b[32m%s\x1b[0m", "--- IDENTITY FOUND IN NEUROSPHERE LEDGER ---");
      console.table(res.rows);
    } else {
      console.log("\x1b[31m%s\x1b[0m", "ID NOT FOUND: Identity might be in lock period or wrong ID.");
    }
  } finally {
    client.release();
    await pool.end();
  }
}

// Ganti ID di bawah dengan ID yang ingin dicari (misal dari gambar)
findIdentity('NS_USER_10000000');
