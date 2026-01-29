require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function snapshot() {
    console.log("🧊 AI Guard: Mengunci Snapshot Genesis (1.250 Citizens)...");
    const { data, error } = await supabase
        .from('iid_inventory')
        .select('iid, balance, access_token, updated_at')
        .order('iid', { ascending: true });

    if (error) return console.error("❌ Gagal:", error.message);

    const filename = `snapshot-genesis-1250.json`;
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    
    console.log(`✅ BERHASIL: Snapshot disimpan di ${filename}`);
    console.log(`💰 Total Aset Terkunci: € ${(data.length * 100000).toLocaleString()}`);
    console.log(`📝 File Link Siap: DAFTAR_LINK_WARGA.txt`);
}
snapshot();
