require('dotenv').config();
const URL = process.env.SUPABASE_URL + '/rest/v1/iid_audit_log?select=*&order=created_at.desc&limit=1';
const KEY = process.env.SUPABASE_KEY;

async function check() {
    const res = await fetch(URL, {
        headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` }
    });
    const data = await res.json();
    console.log("📜 LOG AUDIT TERAKHIR:");
    console.log(JSON.stringify(data, null, 2));
}
check();
