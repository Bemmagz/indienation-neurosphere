const crypto = require('crypto');
require('dotenv').config();

const URL_BASE = "https://indienation-neurosphere.vercel.app";
const SALT = "NEURO-SECRET-2026"; // Garam enkripsi agar tidak bisa didekripsi sembarang orang

function generateStealth(iid) {
    // Membuat Hash unik dari IID + Salt
    const hash = crypto.createHash('sha256').update(iid + SALT).digest('hex').substring(0, 12);
    return hash;
}

console.log("🕵️ DAFTAR LINK STEALTH (IDENTITAS TERSEMBUNYI):");
console.log("-------------------------------------------");

for (let i = 1; i <= 5; i++) {
    const iid = `INDIE-${String(i).padStart(10, '0')}`;
    const stealthKey = generateStealth(iid);
    // Sekarang URL tidak lagi menunjukkan nomor urut
    console.log(`Citizen #${i}: ${URL_BASE}/access/${stealthKey}`);
}

console.log("-------------------------------------------");
console.log("💡 ID Asli 'INDIE-XXXX' kini tersembunyi di balik Hash.");
