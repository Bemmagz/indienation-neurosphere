const fs = require('fs');
const crypto = require('crypto');
const registryPath = 'genesis-registry.json';

let registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const founderCertContent = "NEUROSPHERE_FOUNDER_SOVEREIGN_IDENTITY_2026";
const founderHash = crypto.createHash('sha256').update(founderCertContent).digest('hex');

// Pindahkan data ID 0000000001 ke alias "FOUNDER"
const internalID = "0000000001";
const founderData = registry[internalID] || {};

registry["FOUNDER"] = {
    ...founderData,
    h: founderHash,
    internal_id: internalID,
    role: "SUPREME_FOUNDER",
    ts: "2026-01-26"
};

// Hapus entitas numerik agar hanya muncul sebagai "FOUNDER" secara visual
delete registry[internalID];

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
console.log("✔ SUCCESS: Founder ID 'FOUNDER' (0000000001) is now active.");
