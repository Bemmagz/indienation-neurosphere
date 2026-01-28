const { createClient } = require('@supabase/supabase-client');
require('dotenv').config();
const crypto = require('crypto');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function autoPilotDistro() {
    console.log("📡 AI Guard: Menjalankan Distribusi Otomatis...");

    // Data IID yang akan diproses
    const iid_list = ["NS-GEN-001", "NS-GEN-002", "NS-GEN-003", "NS-GEN-004", "NS-GEN-005"];

    const payload = iid_list.map(id => ({
        iid: id,
        wallet_address: "0x" + crypto.randomBytes(20).toString('hex'),
        status: 'LOCKED',
        // Dialek Ekonomi TM (Technology Money)
        ind_eur_balance: 100000, // Basic Living Value [cite: 2026-01-25]
        luv_balance: 1000000     // 1M LUV/person [cite: 2025-12-20]
    }));

    const { error } = await supabase.from('iid_inventory').upsert(payload);

    if (error) {
        console.error("❌ GAGAL:", error.message);
    } else {
        console.log("✅ SUCCESS: Wallet & Saldo Terdistribusi Otomatis.");
    }
}

autoPilotDistro();

