const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: 'u0_a446',
    host: 'localhost',
    database: 'neurosphere',
    port: 5432,
});

async function generateSplitIID() {
    const client = await pool.connect();
    try {
        console.log("--- GENERATING IID-2026 REGISTRY (11 PARTS) ---");
        await client.query('BEGIN');
        await client.query("DECLARE cur CURSOR FOR SELECT id, owner_type FROM wallets ORDER BY id ASC");

        let fileIndex = 1;
        let recordCount = 0;
        const recordsPerFile = 910000; // Membagi 10jt ke 11 file

        let writeStream = fs.createWriteStream(`registry_part${fileIndex}.csv`);
        writeStream.write('wallet_id,owner_type\n');

        while (true) {
            const res = await client.query('FETCH 10000 FROM cur');
            if (res.rows.length === 0) break;

            const chunk = res.rows.map(row => `${row.id},${row.owner_type}`).join('\n') + '\n';
            
            if (!writeStream.write(chunk)) {
                await new Promise(resolve => writeStream.once('drain', resolve));
            }

            recordCount += res.rows.length;
            if (recordCount >= recordsPerFile && fileIndex < 11) {
                writeStream.end();
                console.log(`✔ Part ${fileIndex} Finished.`);
                fileIndex++;
                recordCount = 0;
                writeStream = fs.createWriteStream(`registry_part${fileIndex}.csv`);
                writeStream.write('wallet_id,owner_type\n');
            }
        }

        await client.query('CLOSE cur');
        await client.query('COMMIT');
        writeStream.end();
        console.log("\n✔ SUCCESS: All 11 IID-2026 Registry parts created.");
    } catch (e) {
        console.error("✘ Error:", e.message);
    } finally {
        client.release();
        await pool.end();
    }
}
generateSplitIID();
