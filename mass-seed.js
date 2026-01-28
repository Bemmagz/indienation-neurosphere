const crypto = require('crypto');
require('dotenv').config();

const URL = process.env.SUPABASE_URL + '/rest/v1/iid_inventory';
const KEY = process.env.SUPABASE_KEY;

async function runMassSeed() {
    const totalTarget = 1250;
    const chunkSize = 50;
    console.log(`🚀 AI Guard: Jalur REST Aktif. Memulai Seeding ${totalTarget} Citizens...`);

    for (let i = 0; i < totalTarget; i += chunkSize) {
        const chunk = [];
        for (let j = 0; j < chunkSize && (i + j) < totalTarget; j++) {
            const idNumber = (i + j + 1).toString().padStart(3, '0');
            chunk.push({
                iid: `NS-GEN-${idNumber}`,
                wallet_address: "0x" + crypto.randomBytes(20).toString('hex'),
                ind_eur_balance: 100000,
                luv_balance: 1000000,
                status: 'LOCKED'
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

            if (!response.ok) throw new Error(await response.text());
            console.log(`✅ Batch ${i + chunk.length} Sinkron.`);
        } catch (err) {
            console.error(`❌ Batch ${i} Gagal:`, err.message);
        }
    }
    console.log("🏁 MASS SEEDING SELESAI. NeuroSphere Online.");
}

runMassSeed();
