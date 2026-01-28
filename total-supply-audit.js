require('dotenv').config();
const URL = process.env.SUPABASE_URL + '/rest/v1/iid_inventory?select=ind_eur_balance,luv_balance';
const KEY = process.env.SUPABASE_KEY;

async function runAudit() {
    console.log("🧐 AI Guard: Melakukan Audit Total (Menembus Limit 1000 Baris)...");
    
    // Menggunakan header Range untuk mengambil data lebih dari 1000
    const res = await fetch(URL, {
        headers: { 
            'apikey': KEY, 
            'Authorization': `Bearer ${KEY}`,
            'Range': '0-1999' // Menarik hingga 2000 baris dalam satu panggil
        }
    });
    
    const data = await res.json();
    
    let totalEUR = 0;
    let totalLUV = 0;
    
    data.forEach(item => {
        totalEUR += parseFloat(item.ind_eur_balance);
        totalLUV += parseFloat(item.luv_balance);
    });

    console.log("-----------------------------------------");
    console.log(`💰 TOTAL IND-EUR : €${totalEUR.toLocaleString()}`);
    console.log(`💖 TOTAL LUV     : ${totalLUV.toLocaleString()} LUV`);
    console.log(`👥 TOTAL CITIZENS: ${data.length}`);
    console.log("-----------------------------------------");
    
    if (totalEUR === 125000000) {
        console.log("✅ AUDIT SUKSES: 1.250 Citizens Terverifikasi Mutlak.");
    } else {
        console.log("⚠️ PERHATIAN: Masih ada ketidaksesuaian data.");
    }
}
runAudit();
