const crypto = require('crypto');
const fs = require('fs');

const SALT = 'INDIE-NATION-SOVEREIGN-2026-X';
const BASE_URL = 'https://indienation-neurosphere.vercel.app/access/';

console.log("📑 AI Guard: Membangkitkan 1.250 Link Kedaulatan...");

let output = "=== DAFTAR LINK AKSES INDIE-NATION (STEALTH) ===\n\n";

for (let i = 1; i <= 1250; i++) {
    const iid = `INDIE-${i.toString().padStart(10, '0')}`;
    const token = crypto.createHash('sha256').update(`${iid}:${SALT}`).digest('hex').substring(0, 24);
    output += `${iid} : ${BASE_URL}${token}\n`;
}

fs.writeFileSync('DAFTAR_LINK_WARGA.txt', output);
console.log("✅ SELESAI: File 'DAFTAR_LINK_WARGA.txt' telah siap.");
