const { createClient } = require('@supabase/supabase-client');
require('dotenv').config();
const crypto = require('crypto');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function runMassSeed() {
    const totalTarget = 1250;
    const chunkSize = 100;
    console.log(`🚀 AI Guard: Memulai Mass Seeding ${totalTarget} Citizens...`);

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

        const { error } = await supabase.from('iid_inventory').upsert(chunk);
        if (error) {
            console.error(`❌ GAGAL di batch ${i}:`, error.message);
        } else {
            console.log(`✅ Batch ${i + chunkSize} berhasil disinkronkan...`);
        }
    }
    console.log("🏁 MASS SEEDING SELESAI. Ekosistem kini memiliki 1,250 Citizens.");
}

runMassSeed();

