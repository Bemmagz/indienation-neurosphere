const fs = require('fs');
const path = require('path');

function generateCert(iid) {
    return `<svg width="800" height="500" xmlns="http://www.w3.org/2001/svg">
        <rect width="100%" height="100%" fill="#050505"/>
        <text x="400" y="250" font-family="monospace" font-size="30" fill="#00ff00" text-anchor="middle">${iid}</text>
        <rect x="10" y="10" width="780" height="480" fill="none" stroke="#bc13fe" stroke-width="2" opacity="0.5"/>
    </svg>`;
}

console.log("--- STARTING SHARDED GENERATION (100,000) ---");

const total = 100000;
const perShard = 20000; // 5 Shard x 20rb file = 100rb file

for (let s = 0; s < (total / perShard); s++) {
    const shardDir = `certificates/shard_${s+1}`;
    if (!fs.existsSync(shardDir)) fs.mkdirSync(shardDir, { recursive: true });

    for (let i = 1; i <= perShard; i++) {
        const currentNum = (s * perShard) + i;
        const iid = "IID-2026-" + currentNum.toString().padStart(7, '0');
        fs.writeFileSync(path.join(shardDir, `${iid}.svg`), generateCert(iid));
    }
    console.log(`✔ Shard ${s+1} Complete (20,000 files)`);
}
