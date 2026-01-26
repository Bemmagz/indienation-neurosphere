const fs = require('fs');
const registryPath = 'genesis-registry.json';
let registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

const sender = "FOUNDER";
const receiver = "0000000002";
const amount = 1000;

console.log(`◈ Memulai Transfer: ${amount} ENPE dari ${sender} ke ${receiver}...`);

if (registry[sender] && registry[receiver]) {
    // Parsing String ke Number (menghilangkan titik format Indonesia)
    let sBal = parseInt(registry[sender].tm_identity.enpe.replace(/\./g, ''));
    let rBal = parseInt(registry[receiver].tm_identity.enpe.replace(/\./g, ''));

    if (sBal >= amount) {
        // Kalkulasi
        sBal -= amount;
        rBal += amount;

        // Kembalikan ke format String dengan titik
        registry[sender].tm_identity.enpe = sBal.toLocaleString('id-ID');
        registry[receiver].tm_identity.enpe = rBal.toLocaleString('id-ID');

        fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
        console.log("✔ SUCCESS: Aliran ENPE telah tercatat di Ledger!");
    } else {
        console.log("❌ Error: Saldo ENPE Founder tidak mencukupi.");
    }
} else {
    console.log("❌ Error: Entitas tidak ditemukan dalam Registry.");
}
