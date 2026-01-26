const { Pool } = require('pg');
const pool = new Pool({ user: 'u0_a446', database: 'neurosphere' });

async function processClaim(userId) {
    const client = await pool.connect();
    try {
        const today = new Date();
        const start = new Date('2026-02-01');
        const end = new Date('2027-02-01');
        let amount = 270.00;

        if (today.toDateString() === start.toDateString()) amount = 1000.00;
        else if (today.toDateString() === end.toDateString()) amount = 990.00;

        await client.query('BEGIN');
        
        // Anti-Double Claim Check
        const already = await client.query(
            "SELECT 1 FROM claim_logs WHERE iid=$1 AND claim_date=CURRENT_DATE", [userId]
        );
        
        if (already.rows.length > 0) {
            console.log("\x1b[33m! ALREADY CLAIMED TODAY:\x1b[0m " + userId);
            return;
        }

        // Update Balance & Log
        await client.query("UPDATE wallets SET balance_ind_eur = balance_ind_eur + $1 WHERE id = $2", [amount, userId]);
        await client.query("INSERT INTO claim_logs (iid, amount) VALUES ($1, $2)", [userId, amount]);
        
        await client.query('COMMIT');
        console.log(`\x1b[32m✔ SUCCESS:\x1b[0m ${userId} received ${amount} IND-EUR`);
    } catch (e) {
        await client.query('ROLLBACK');
        console.error("✘ Error:", e.message);
    } finally {
        client.release();
    }
}
processClaim(process.argv[2] || 'IID-2026-0000001');
