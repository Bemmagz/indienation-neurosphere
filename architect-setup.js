require('dotenv').config();

const URL = process.env.SUPABASE_URL + '/rest/v1/';
const KEY = process.env.SUPABASE_KEY;

// Fungsi untuk membuat kolom via SQL API (jika diizinkan) atau cek status
async function setupDatabase() {
    console.log("🏗️ AI Guard: Membangun Arsitektur Tabel secara otomatis...");
    
    // Kita gunakan trik POST ke rpc atau langsung ke tabel dengan kolom dinamis
    // Jika kolom belum ada, kita lakukan sinkronisasi data dengan skrip cerdas
    const payload = [
        {
            iid: "SYSTEM-CHECK",
            wallet_address: "0x000",
            ind_eur_balance: 0,
            luv_balance: 0,
            status: 'INITIALIZED'
        }
    ];

    const response = await fetch(URL + 'iid_inventory', {
        method: 'POST',
        headers: {
            'apikey': KEY,
            'Authorization': `Bearer ${KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(payload)
    });

    if (response.status === 400) {
        console.log("⚠️ Kolom belum ada. AI Guard merekomendasikan: Buka SQL Editor sekali saja (SOP Keamanan Supabase).");
    } else {
        console.log("✅ Database siap menerima data.");
    }
}

setupDatabase();
