require('dotenv').config();
const URL_BASE = "https://indienation-neurosphere.vercel.app"; // Pastikan URL Vercel Anda benar

async function generate() {
    console.log("🔗 DAFTAR LINK AKSES MANDIRI (SAMPEL 1-10):");
    console.log("-------------------------------------------");
    
    for (let i = 1; i <= 10; i++) {
        const iid = `INDIE-${String(i).padStart(10, '0')}`;
        // Link ini menyertakan ID unik yang akan dibaca oleh UI
        console.log(`Citizen #${i}: ${URL_BASE}/?iid=${iid}`);
    }
    
    console.log("-------------------------------------------");
    console.log("👉 Kirim salah satu link di atas ke klien untuk tes.");
}
generate();
