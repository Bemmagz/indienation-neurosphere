require('dotenv').config();
const URL = process.env.SUPABASE_URL + '/rest/v1/iid_inventory';
const KEY = process.env.SUPABASE_KEY;

async function runAudit() {
    console.log("🧐 AI Guard: Melakukan Audit Recursive (Paging Mode)...");
    
    let allData = [];
    let from = 0;
    let to = 999;
    let finished = false;

    while (!finished) {
        const res = await fetch(`${URL}?select=ind_eur_balance,luv_balance`, {
            headers: { 
                'apikey': KEY, 
                'Authorization': `Bearer ${KEY}`,
                'Range': `${from}-${to}`
            }
        });
        
        const chunk = await res.json();
        allData = allData.concat(chunk);
        
        if (chunk.length < 1000) {
            finished = true;
        } else {
            from += 1000;
            to += 1000;
        }
    }
    
    let totalEUR = 0;
    let totalLUV = 0;
    allData.forEach(item => {
        totalEUR += parseFloat(item.ind_eur_balance);
        totalLUV += parseFloat(item.luv_balance);
    });

    console.log("-----------------------------------------");
    console.log(`💰 TOTAL IND-EUR : €${totalEUR.toLocaleString()}`);
    console.log(`💖 TOTAL LUV     : ${totalLUV.toLocaleString()} LUV`);
    console.log(`👥 TOTAL CITIZENS: ${allData.length}`);
    console.log("-----------------------------------------");
    
    if (totalEUR === 125000000) {
        console.log("✅ AUDIT SUKSES: 1.250 Citizens Terverifikasi Mutlak.");
    } else {
        console.log(`⚠️ DATA MASIH BEDA: Periksa apakah mass-seed tadi terhenti.`);
    }
}
runAudit();
