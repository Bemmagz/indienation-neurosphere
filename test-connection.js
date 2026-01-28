require('dotenv').config();
async function test() {
    console.log("📡 Mencoba menyapa Supabase...");
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/iid_inventory?select=count`, {
        headers: { 'apikey': process.env.SUPABASE_KEY, 'Authorization': `Bearer ${process.env.SUPABASE_KEY}` }
    });
    if (res.ok) console.log("✅ KONEKSI TERJALIN: Gerbang NeuroSphere Terbuka!");
    else console.log("❌ KONEKSI DITOLAK: Periksa kembali API Key Anda.");
}
test();
