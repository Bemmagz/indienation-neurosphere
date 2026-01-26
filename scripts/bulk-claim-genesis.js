const { Pool } = require('pg');
const pool = new Pool({ user: 'u0_a446', database: 'neurosphere' });
async function bulk() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        for (let i = 1; i <= 100; i++) {
            const id = "IID-2026-" + i.toString().padStart(7, '0');
            await client.query("UPDATE wallets SET balance_ind_eur = 1000.00 WHERE id = $1", [id]);
            await client.query("INSERT INTO claim_logs (iid, amount) VALUES ($1, 1000.00) ON CONFLICT DO NOTHING", [id]);
        }
        await client.query('COMMIT');
        console.log("✔ 100 Genesis Citizens funded with 1,000 IND-EUR");
    } finally { client.release(); await pool.end(); }
}
bulk();
