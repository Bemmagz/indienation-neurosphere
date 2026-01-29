require('dotenv').config();
const URL = process.env.SUPABASE_URL + '/rest/v1/iid_inventory?select=iid,wallet_address';
const KEY = process.env.SUPABASE_KEY;

async function check() {
    const res = await fetch(URL, { headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` } });
    const data = await res.json();
    
    const wallets = new Set(data.map(d => d.wallet_address));
    console.log(`📊 Total Data: ${data.length}`);
    console.log(`💎 Total Wallet Unik: ${wallets.size}`);
    
    if (data.length === wallets.size) {
        console.log("✅ SUKSES: Setiap user memiliki dompet unik. Masalah ada di UI/Vercel.");
    } else {
        console.log("⚠️ PERHATIAN: Ada dompet yang duplikat (Bocor ke Founder).");
    }
}
check();
