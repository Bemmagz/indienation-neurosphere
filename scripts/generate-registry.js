const { Pool } = require('pg');
const fs = require('fs');
const os = require('os');

const pool = new Pool({
    user: os.userInfo().username,
    host: 'localhost',
    database: 'neurosphere',
    port: 5432,
});

async function generateCSV() {
    const client = await pool.connect();
    const writeStream = fs.createWriteStream('public_registry.csv');
    
    // Header CSV
    writeStream.write('wallet_id,owner_type\n');

    try {
        console.log("--- GENERATING PUBLIC REGISTRY (10M) ---");
        
        // Menggunakan Cursor/Stream agar tidak memakan RAM
        const query = "DECLARE cur CURSOR FOR SELECT id, owner_type FROM wallets ORDER BY id ASC";
        await client.query('BEGIN');
        await client.query(query);

        let count = 0;
        while (true) {
            const res = await client.query('FETCH 10000 FROM cur');
            if (res.rows.length === 0) break;

            const chunk = res.rows.map(row => `${row.id},${row.owner_type}`).join('\n') + '\n';
            writeStream.write(chunk);
            
            count += res.rows.length;
            if (count % 100000 === 0) {
                console.log(`Progress: ${count} records exported...`);
            }
        }

        await client.query('COMMIT');
        console.log("\n✔ SUCCESS: public_registry.csv created.");
        console.log("Total Records:", count);
        
    } catch (e) {
        console.error("✘ Error:", e.message);
    } finally {
        writeStream.end();
        client.release();
        await pool.end();
    }
}

generateCSV();
