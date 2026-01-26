const { Pool } = require('pg');
const os = require('os');

const pool = new Pool({
    user: os.userInfo().username,
    host: 'localhost',
    database: 'neurosphere',
    port: 5432,
});

async function massGenerate() {
    const client = await pool.connect();
    try {
        console.log("--- NEUROSPHERE MASS SCALE TEST ---");
        console.log("Target: 100,000 Users");
        await client.query('BEGIN');
        
        // Memulai dari 10.001 (karena 10.000 sudah ada) sampai 100.000
        for (let i = 10001; i <= 100000; i++) {
            const userId = 'NS_USER_' + i.toString().padStart(6, '0');
            await client.query(
                'INSERT INTO wallets (id, owner_type, balance_ind_eur) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
                [userId, 'User', 0.00]
            );
            
            // Progress tracker setiap 10.000 data
            if (i % 10000 === 0) {
                console.log("Status: " + i + " users synchronized to Local Ledger...");
            }
        }
        
        await client.query('COMMIT');
        console.log("\n✔ SUCCESS: Total 100,000 User Wallets are now active in NeuroSphere.");
    } catch (e) {
        await client.query('ROLLBACK');
        console.log("✘ ERROR: " + e.message);
    } finally {
        client.release();
        await pool.end();
    }
}

massGenerate();
