require('dotenv').config();
const URL = process.env.SUPABASE_URL + '/rest/v1/iid_audit_log';
const KEY = process.env.SUPABASE_KEY;

async function recordEvent(iid, action, data) {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'apikey': KEY,
                'Authorization': `Bearer ${KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                iid: iid,
                action: action,
                new_data: data
            })
        });
        if (response.ok) console.log(`🛡️ AI Guard: Event [${action}] tercatat untuk ${iid}`);
    } catch (e) {
        console.error("❌ Gagal mencatat audit:", e.message);
    }
}

// Catat kelahiran sistem produksi
recordEvent('SYSTEM', 'PRODUCTION_READY', { 
    version: '2.0.0', 
    timestamp: new Date().toISOString(),
    status: 'ACTIVE'
});
