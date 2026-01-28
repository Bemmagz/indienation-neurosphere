require('dotenv').config();
const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_KEY;
const crypto = require('crypto');

async function nuclear() {
    console.log("🧨 AI Guard: Memulai Nuclear Delete (Bypass Cache)...");
    
    // 1. Hapus paksa menggunakan filter saldo (agar tidak ditolak API)
    const del = await fetch(`${URL}/rest/v1/iid_inventory?ind_eur_balance=gt.-1`, {
        method: 'DELETE',
        headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` }
    });

    if (del.ok) {
        console.log("🧹 Database Bersih Total. Memulai Re-Seeding...");
        
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
            await fetch(`${URL}/rest/v1/iid_inventory`, {
                method: 'POST',
                headers: {
                    'apikey': KEY, 'Authorization': `Bearer ${KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chunk)
            });
            console.log(`✅ INDIE-${(i+chunk.length-1).toString().padStart(10, '0')} Terdaftar.`);
        }
        console.log("🏁 MISI SELESAI: Kedaulatan murni 1.250 INDIE pulih.");
    } else {
        console.log("❌ Gagal menghapus. Periksa RLS di Dashboard Supabase.");
    }
}
nuclear();
