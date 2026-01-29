require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function fix() {
    console.log("🛠️ AI Guard: Memperbaiki Token Citizen #1...");
    
    // Kita paksa Citizen #1 menggunakan token yang Anda klik tadi
    const { data, error } = await supabase
        .from('iid_inventory')
        .update({ access_token: '3a83f39e09b2' }) // Token dari link Anda
        .eq('iid', 'INDIE-0000000001');

    if (error) console.error("❌ Gagal:", error.message);
    else console.log("✅ Berhasil! Token 3a83f39e09b2 kini aktif untuk INDIE-0000000001.");
}
fix();
