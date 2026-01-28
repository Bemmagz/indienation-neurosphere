const crypto = require('crypto');
require('dotenv').config();

const URL = process.env.SUPABASE_URL + '/rest/v1/iid_inventory';
const KEY = process.env.SUPABASE_KEY;

async function runMassSeed() {
    const totalTarget = 1250;
    const chunkSize = 50;
    console.log(`🚀 AI Guard: Memulihkan Identitas Sejati (INDIE-0000000001)...`);

    for (let i = 0; i < totalTarget; i += chunkSize) {
        const chunk = [];
        for (let j = 0; j < chunkSize && (i + j) < totalTarget; j++) {
            // Format 10-digit: INDIE-0000000001
            const idNumber = (i + j + 1).toString().padStart(10, '0');
            chunk.push({
                iid: `INDIE-${idNumber}`,
                wallet_address: "0x" + crypto.randomBytes(20).toString('hex'),
                ind_eur_balance: 100000,
                luv_balance: 1000000,
                status: 'LOCKED'
            });
        }

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

        if (response.ok) {
            console.log(`✅ Batch INDIE-${(i+1).toString().padStart(10, '0')} s/d ${(i+chunk.length).toString().padStart(10, '0')} Sinkron.`);
        } else {
            console.error(`❌ Gagal pada urutan ${i}`);
        }
    }
    console.log("🏁 IDENTITAS TERSEMPURNAKAN: 1.250 INDIE Citizens Online.");
}
runMassSeed();
