const fs = require('fs');
function generateGenesisCert(iid, name) {
    const svg = `
    <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#050505"/>
        <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111" stroke-width="1"/>
            </pattern>
            <linearGradient id="auraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#00ff00;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#bc13fe;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect x="10" y="10" width="780" height="480" fill="none" stroke="url(#auraGrad)" stroke-width="2" stroke-dasharray="10,5"/>
        <text x="400" y="80" font-family="monospace" font-size="45" fill="#fff" text-anchor="middle" font-weight="900" letter-spacing="12">INDIENATION</text>
        <text x="400" y="110" font-family="monospace" font-size="11" fill="#00ff00" text-anchor="middle" letter-spacing="4">SOVEREIGN WEALTH GENESIS IDENTITY</text>
        <text x="400" y="210" font-family="sans-serif" font-size="12" fill="#555" text-anchor="middle">OFFICIAL IDENTIFIER:</text>
        <text x="400" y="260" font-family="monospace" font-size="36" fill="url(#auraGrad)" text-anchor="middle" font-weight="bold">${iid}</text>
        <text x="400" y="320" font-family="sans-serif" font-size="20" fill="#fff" text-anchor="middle">CITIZEN OF THE NEUROSPHERE</text>
        <text x="400" y="420" font-family="monospace" font-size="10" fill="#444" text-anchor="middle">SYSTEM AUTHENTICATED | TOTAL REWARD ELIGIBILITY: €100,000</text>
        <text x="400" y="440" font-family="monospace" font-size="9" fill="#bc13fe" text-anchor="middle">AURA FREQUENCY: STABLE-GENESIS</text>
        <path d="M20 20 L80 20 L20 80 Z" fill="#00ff00" opacity="0.6"/>
        <path d="M780 480 L720 480 L780 420 Z" fill="#bc13fe" opacity="0.6"/>
    </svg>`;
    fs.writeFileSync(`certificates/${iid}.svg`, svg);
}
for (let i = 1; i <= 100; i++) {
    const id = "IID-2026-" + i.toString().padStart(7, '0');
    generateGenesisCert(id, "GENESIS CITIZEN");
}
console.log("✔ 100 Cyberpunk Certificates generated in /certificates");
