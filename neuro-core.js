require('dotenv').config();
const crypto = require('crypto');
const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_KEY;

async function runCore() {
    console.log("🧠 NEURO-CORE: Sinkronisasi Massal & Audit Otomatis...");
    
    // 1. Catat Aktivitas di Audit Log
    const auditRes = await fetch(`${URL}/rest/v1/iid_audit_log`, {
        method: 'POST',
        headers: {
            'apikey': KEY, 'Authorization': `Bearer ${KEY}`,
            'Content-Type': 'application/json', 'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
            iid: 'SYSTEM',
            action: 'CORE_SYNC_START',
            new_data: { timestamp: new Date().toISOString() }
        })
    });

    if (!auditRes.ok) {
        console.log("⏳ Audit System masih sinkronisasi cache... melanjutkan seeding.");
    }

    // 2. Jalankan Seeding (Contoh 50 Data Pertama dengan IID INDIE)
    const chunk = [];
    for (let i = 1; i <= 50; i++) {
        chunk.push({
            iid: `INDIE-${i.toString().padStart(10, '0')}`,
            wallet_address: "0x" + crypto.randomBytes(20).toString('hex'),
            ind_eur_balance: 100000,
            luv_balance: 1000000,
            status: 'LOCKED'
        });
    }

    const seedRes = await fetch(`${URL}/rest/v1/iid_inventory`, {
        method: 'POST',
        headers: {
            'apikey': KEY, 'Authorization': `Bearer ${KEY}`,
            'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(chunk)
    });

    if (seedRes.ok) {
        console.log("✅ 50 Kedaulatan INDIE Berhasil Disinkronkan.");
    } else {
        const err = await seedRes.json();
        console.log(`❌ Gagal: ${err.message}`);
    }
}

runCore();
