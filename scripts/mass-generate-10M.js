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
        console.log("--- NEUROSPHERE ULTRA-SCALE TEST: 10,000,000 USERS ---");
        
        const batchSize = 10000;
        // Memulai dari 1.000.001 sampai 10.000.000
        for (let i = 1000001; i <= 10000000; i += batchSize) {
            await client.query('BEGIN');
            let values = [];
            for (let j = 0; j < batchSize && (i + j) <= 10000000; j++) {
                const userId = 'NS_USER_' + (i + j).toString().padStart(8, '0');
                values.push("('" + userId + "', 'User', 0.00)");
            }
            
            const query = 'INSERT INTO wallets (id, owner_type, balance_ind_eur) VALUES ' + values.join(',') + ' ON CONFLICT DO NOTHING';
            await client.query(query);
            await client.query('COMMIT');
            
            if (i % 100000 === 0) {
                console.log("Progress: " + i + " users recorded (Current Target: 10M)...");
            }
        }
        
        console.log("\n✔ LEGENDARY: 10,000,000 User Wallets are now active in NeuroSphere Ledger.");
    } catch (e) {
        console.log("✘ ERROR: " + e.message);
    } finally {
        client.release();
        await pool.end();
    }
}

massGenerate();
