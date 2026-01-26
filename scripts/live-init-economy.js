const fs = require('fs');
const registryPath = 'genesis-registry.json';
let registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

console.log("◈ INITIALIZING LIVE ECONOMY LAYER...");

// 1. Set Saldo Utama Founder
if (registry["FOUNDER"]) {
    registry["FOUNDER"].tm_identity = {
        enpe: "100.000.000",
        luv: "1.000.000",
        stable: "100.000",
        unit: "IND-EUR"
    };
    console.log("✔ FOUNDER balances initialized.");
}

// 2. Set Saldo Dasar Warga 0000000002 (Sebagai Target Test)
const citizen02 = "0000000002";
if (registry[citizen02]) {
    registry[citizen02].tm_identity = {
        enpe: "0",
        luv: "0",
        stable: "100.000",
        unit: "IND-EUR"
    };
    console.log(`✔ Citizen ${citizen02} initialized with Basic Living Value.`);
}

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
