#!/usr/bin/env node
const fs = require('fs');
const { Pool } = require('pg');
const os = require('os');

// Menggunakan username sistem Termux secara otomatis
const pool = new Pool({
    user: os.userInfo().username,
    host: 'localhost',
    database: 'neurosphere',
    port: 5432,
});

async function executeLedgerTransfer(senderId, receiverId, amount, dialect) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const senderRes = await client.query(
            'SELECT balance_ind_eur, locked_until FROM wallets WHERE id = $1 FOR UPDATE',
            [senderId]
        );
        if (senderRes.rows.length === 0) throw new Error('Wallet pengirim tidak ditemukan.');
        const sender = senderRes.rows[0];
        
        // Aturan Lock 3 Tahun Founder [cite: 2025-12-20]
        if (sender.locked_until && new Date() < new Date(sender.locked_until)) {
            throw new Error('Aset terkunci (Protocol 3-Year Lock)');
        }
        if (parseFloat(sender.balance_ind_eur) < amount) throw new Error('Saldo tidak cukup.');

        await client.query('UPDATE wallets SET balance_ind_eur = balance_ind_eur - $1 WHERE id = $2', [amount, senderId]);
        await client.query('UPDATE wallets SET balance_ind_eur = balance_ind_eur + $1 WHERE id = $2', [amount, receiverId]);
        
        const txRes = await client.query(
            'INSERT INTO transactions (sender_id, receiver_id, amount, dialect) VALUES ($1, $2, $3, $4) RETURNING tx_hash',
            [senderId, receiverId, amount, dialect]
        );
        await client.query('COMMIT');
        return { success: true, tx_hash: "NS-TX-" + txRes.rows[0].tx_hash };
    } catch (e) {
        await client.query('ROLLBACK');
        return { success: false, error: e.message };
    } finally {
        client.release();
    }
}

async function main() {
    const filePath = process.argv[2];
    if (!filePath) process.exit(1);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const amount = parseFloat(content.match(/VALUE:\s*([\d.]+)/)[1]);
        const dialect = content.match(/ASSET:\s*([\w-]+)/)[1];
        const sender = content.match(/SOURCE:\s*([\w_]+)/)[1];
        const receiver = content.match(/TARGET:\s*([\w_]+)/)[1];

        console.log("\n[AURALANG EXECUTION]");
        const result = await executeLedgerTransfer(sender, receiver, amount, dialect);
        if (result.success) {
            console.log("✔ SUCCESS | TX:" + result.tx_hash);
            console.log("Identity: Living Value Identity Synced [cite: 2025-12-23]");
        } else {
            console.log("✘ FAILED | Error: " + result.error);
        }
    } catch (err) { console.error("Error: " + err.message); }
    finally { await pool.end(); process.exit(); }
}
main();
