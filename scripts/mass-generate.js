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
        console.log("Starting Mass Generation: 10,000 Users...");
        await client.query('BEGIN');
        
        for (let i = 1; i <= 10000; i++) {
            const userId = 'NS_USER_' + i.toString().padStart(5, '0');
            await client.query(
                'INSERT INTO wallets (id, owner_type, balance_ind_eur) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
                [userId, 'User', 0.00]
            );
            if (i % 1000 === 0) console.log("Generated " + i + " users...");
        }
        
        await client.query('COMMIT');
        console.log("✔ SUCCESS: 10,000 User Wallets Created.");
    } catch (e) {
        await client.query('ROLLBACK');
        console.log("✘ ERROR: " + e.message);
    } finally {
        client.release();
        await pool.end();
    }
}

massGenerate();
