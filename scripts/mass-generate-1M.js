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
        console.log("--- NEUROSPHERE HYPER-SCALE TEST: 1,000,000 USERS ---");
        
        // Memulai dari 100.001 sampai 1.000.000
        const batchSize = 5000;
        for (let i = 100001; i <= 1000000; i += batchSize) {
            await client.query('BEGIN');
            let values = [];
            for (let j = 0; j < batchSize && (i + j) <= 1000000; j++) {
                const userId = 'NS_USER_' + (i + j).toString().padStart(7, '0');
                values.push("('" + userId + "', 'User', 0.00)");
            }
            
            const query = 'INSERT INTO wallets (id, owner_type, balance_ind_eur) VALUES ' + values.join(',') + ' ON CONFLICT DO NOTHING';
            await client.query(query);
            await client.query('COMMIT');
            
            if (i % 50000 === 0 || i === 100001) {
                console.log("Status: " + i + " users recorded in Local Ledger...");
            }
        }
        
        console.log("\n✔ VICTORY: 1,000,000 User Wallets are now live in NeuroSphere.");
    } catch (e) {
        console.log("✘ ERROR: " + e.message);
    } finally {
        client.release();
        await pool.end();
    }
}

massGenerate();
