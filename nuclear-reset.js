require('dotenv').config();
const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_KEY;
const crypto = require('crypto');

async function nuclear() {
    if (!URL || URL.includes('xxxx')) {
        console.error("❌ ERROR: URL Supabase di file .env masih 'xxxx'.");
        console.error("👉 Masukkan URL asli dari Dashboard Supabase Anda.");
        return;
    }

    console.log(`🧨 AI Guard: Menghubungkan ke ${URL}...`);
    
    try {
        const del = await fetch(`${URL}/rest/v1/iid_inventory?ind_eur_balance=gt.-1`, {
            method: 'DELETE',
            headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` }
        });

        if (del.ok) {
            console.log("🧹 Database Bersih Total. Memulai Re-Seeding...");
            // Proses Seeding (Sesuai SOP 1.250 INDIE)
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
                console.log(`✅ Synced Batch ending at ID: ${i + chunk.length - 1}`);
            }
            console.log("🏁 EKOSISTEM PULIH: 1.250 INDIE Citizens Online.");
        } else {
            console.error("❌ Respon Server Gagal. Cek API Key Anda.");
        }
    } catch (e) {
        console.error("❌ KONEKSI TERPUTUS:", e.message);
        console.log("👉 Pastikan URL di .env benar dan internet aktif.");
    }
}
nuclear();
