const fs = require('fs');
const crypto = require('crypto');

const registry = JSON.parse(fs.readFileSync('genesis-registry.json', 'utf8'));
const hashes = Object.values(registry).map(v => v.h).sort();

// Simple Merkle Root for 100k
const combinedHash = crypto.createHash('sha256').update(hashes.join('')).digest('hex');

const eventLog = {
    event: "GENESIS_LOCK",
    timestamp: new Date().toISOString(),
    total_identity: hashes.length,
    merkle_root: combinedHash,
    founder_seal: "AUTHORIZED_BY_FOUNDER_2026"
};

fs.writeFileSync('merkle-root.json', JSON.stringify({ merkle_root: combinedHash }, null, 2));
fs.writeFileSync('event-log.json', JSON.stringify([eventLog], null, 2));
console.log("✔ Merkle Root & Event Log Generated.");
