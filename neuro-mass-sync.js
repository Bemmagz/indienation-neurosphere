require('dotenv').config();
const crypto = require('crypto');
const URL = process.env.SUPABASE_URL + '/rest/v1/iid_inventory';
const KEY = process.env.SUPABASE_KEY;

async function syncPopulasi() {
    const start = 51; // Melanjutkan setelah 50 pertama
    const end = 1250;
    const chunkSize = 100;

    console.log(`🧠 AI Guard: Memulai Sinkronisasi Sisa Populasi (${start}-${end})...`);

    for (let i = start; i <= end; i += chunkSize) {
        const chunk = [];
        for (let j = 0; j < chunkSize && (i + j) <= end; j++) {
            const currentId = i + j;
            chunk.push({
                iid: `INDIE-${currentId.toString().padStart(10, '0')}`,
                wallet_address: "0x" + crypto.randomBytes(20).toString('hex'),
                ind_eur_balance: 100000,
                luv_balance: 1000000,
                status: 'LOCKED'
            });
        }

        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                'apikey': KEY,
                'Authorization': `Bearer ${KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify(chunk)
        });

        if (res.ok) {
            console.log(`✅ Batch INDIE-${i.toString().padStart(10, '0')} s/d ${Math.min(i + chunkSize - 1, end).toString().padStart(10, '0')} Selesai.`);
        } else {
            console.error(`❌ Gagal pada Batch ${i}`);
        }
    }
    console.log("🏁 EKOSISTEM LENGKAP: 1.250 Warga Kedaulatan Telah Terdaftar.");
}

syncPopulasi();
