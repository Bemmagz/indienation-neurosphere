require('dotenv').config();
const URL = process.env.SUPABASE_URL + '/rest/v1/iid_inventory?iid=eq.INDIE-0000000007';
const KEY = process.env.SUPABASE_KEY;

async function verify() {
    const res = await fetch(URL, {
        headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` }
    });
    const data = await res.json();
    console.log("💎 VERIFIKASI CITIZEN INDIE-0000000007:");
    console.log(JSON.stringify(data, null, 2));
}
verify();
