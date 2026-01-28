require('dotenv').config();
const crypto = require('crypto');
const URL = process.env.SUPABASE_URL + '/rest/v1/iid_inventory';
const KEY = process.env.SUPABASE_KEY;

async function reset() {
    console.log("🧹 AI Guard: Menghapus seluruh data lama (Cleaning)...");
    
    // Hapus SEMUA data di tabel iid_inventory
    await fetch(`${URL}`, {
        method: 'DELETE',
        headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` }
    });

    console.log("🚀 AI Guard: Memulai Re-Seeding 1.250 INDIE Citizens...");
    const total = 1250;
    const chunkSize = 100;

    for (let i = 1; i <= total; i += chunkSize) {
        const chunk = [];
        for (let j = 0; j < chunkSize && (i + j) <= total; j++) {
            const id = i + j;
            chunk.push({
                iid: `INDIE-${id.toString().padStart(10, '0')}`,
                wallet_address: "0x" + crypto.randomBytes(20).toString('hex'),
                ind_eur_balance: 100000,
                luv_balance: 1000000,
                status: 'LOCKED'
            });
        }
        await fetch(URL, {
            method: 'POST',
            headers: {
                'apikey': KEY, 'Authorization': `Bearer ${KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chunk)
        });
        console.log(`✅ Synced: INDIE-${(i+chunk.length-1).toString().padStart(10, '0')}`);
    }
    console.log("🏁 RESET SELESAI: 1.250 INDIE terdaftar murni.");
}
reset();
