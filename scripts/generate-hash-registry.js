const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const registry = {};
const TOTAL_SHARDS = 5;

console.log("◈ Starting Neural-Hash Mapping...");

for (let s = 1; s <= TOTAL_SHARDS; s++) {
    const shardDir = path.join(__dirname, `../certificates/shard_${s}`);
    const files = fs.readdirSync(shardDir).filter(f => f.endsWith('.svg'));
    
    console.log(`  Scanning Shard ${s}...`);
    
    files.forEach(file => {
        const filePath = path.join(shardDir, file);
        const content = fs.readFileSync(filePath);
        const hash = crypto.createHash('sha256').update(content).digest('hex');
        
        // Simpan IID sebagai Key dan Hash sebagai Fingerprint
        const iid = file.replace('.svg', '');
        registry[iid] = {
            h: hash,
            s: s, // Shard ID
            ts: "2026-02-01" // Genesis Date
        };
    });
}

fs.writeFileSync('genesis-registry.json', JSON.stringify(registry, null, 2));
console.log("✔ SUCCESS: genesis-registry.json has been created.");
console.log(`✔ TOTAL FINGERPRINTS: ${Object.keys(registry).length}`);
