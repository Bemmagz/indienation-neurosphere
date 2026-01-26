const { Pool } = require('pg');

// Menambahkan user secara eksplisit untuk menghindari error startup packet
const pool = new Pool({ 
    user: 'u0_a446',
    database: 'neurosphere',
    host: 'localhost',
    port: 5432
});

async function rebuild() {
    const client = await pool.connect();
    try {
        console.log("--- REBUILDING MASTER LEDGER (IID-2026) ---");
        await client.query('BEGIN');

        const batchSize = 10000;
        for (let i = 1; i <= 10000000; i += batchSize) {
            let values = [];
            for (let j = 0; j < batchSize; j++) {
                const idNum = (i + j).toString().padStart(7, '0');
                values.push("('IID-2026-" + idNum + "', 'User')");
            }
            // Batch Insert untuk performa tinggi
            await client.query("INSERT INTO wallets (id, owner_type) VALUES " + values.join(','));

            if ((i + batchSize - 1) % 1000000 === 0) {
                console.log("Progress: " + (i + batchSize - 1) + " IID records created...");
            }
        }

        await client.query('COMMIT');
        console.log("\n✔ SUCCESS: 10,000,000 IID-2026 Wallets Created in Master Ledger.");
    } catch (e) {
        await client.query('ROLLBACK');
        console.error("✘ Error:", e.message);
    } finally {
        client.release();
        await pool.end();
    }
}
rebuild();
