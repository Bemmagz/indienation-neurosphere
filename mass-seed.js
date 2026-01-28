const crypto = require('crypto');
require('dotenv').config();

const URL = process.env.SUPABASE_URL + '/rest/v1/iid_inventory';
const KEY = process.env.SUPABASE_KEY;

async function runMassSeed() {
    const totalTarget = 1250;
    const chunkSize = 50;
    console.log(`🚀 AI Guard: Memperbaiki Schema & Sinkronisasi Ulang...`);

    for (let i = 0; i < totalTarget; i += chunkSize) {
        const chunk = [];
        for (let j = 0; j < chunkSize && (i + j) < totalTarget; j++) {
            const idNumber = (i + j + 1).toString().padStart(3, '0');
            // Menyesuaikan dengan kolom yang pasti ada atau membuat fallback
            chunk.push({
                iid: `NS-GEN-${idNumber}`,
                wallet_address: "0x" + crypto.randomBytes(20).toString('hex'),
                // Jika kolom ind_eur_balance gagal, kita kirim data inti dulu
                status: 'LOCKED',
                metadata: JSON.stringify({
                    val: 100000,
                    symbol: "IND-EUR",
                    luv: 1000000
                })
            });
        }

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'apikey': KEY,
                    'Authorization': `Bearer ${KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates'
                },
                body: JSON.stringify(chunk)
            });

            if (!response.ok) {
                const errData = await response.json();
                console.error(`❌ Batch ${i} Gagal:`, errData.message);
            } else {
                console.log(`✅ Batch ${i + chunk.length} Sinkron.`);
            }
        } catch (err) {
            console.error(`📡 Error Network:`, err.message);
        }
    }
}
runMassSeed();
