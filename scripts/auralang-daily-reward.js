const fs = require('fs');
const registryPath = 'api/v1/genesis-registry.json';
let registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

// Algoritma E-KINDNESS: 0-10 koin secara acak per hari
const generateReward = () => Math.floor(Math.random() * 11);

console.log("◈ Memulai Distribusi Auralang (E-KINDNESS)...");

Object.keys(registry).forEach(id => {
    if (id !== "FOUNDER") { // Reward hanya untuk warga
        const reward = generateReward();
        let currentLuv = parseInt(registry[id].tm_identity.luv || "0");
        
        registry[id].tm_identity.luv = (currentLuv + reward).toString();
        console.log(`✔ ID ${id} menerima ${reward} LUV.`);
    }
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
console.log("◈ Distribusi Selesai. Ledger telah diperbarui.");
