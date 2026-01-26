const fs = require('fs');
const crypto = require('crypto');
const registryPath = 'genesis-registry.json';
let registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

const citizenId = "0000000002";
// Ganti 'KODE_RAHASIA_ANDA' dengan kata sandi unik untuk calon pemilik
const secretKey = "NEURO-FIRST-2026"; 
const hashedSecret = crypto.createHash('sha256').update(secretKey).digest('hex');

if (registry[citizenId]) {
    registry[citizenId].auth = {
        k: hashedSecret,
        status: "LOCKED_FOR_DISTRIBUTION"
    };
    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
    console.log(`✔ SUCCESS: ID ${citizenId} telah dikunci dengan Secret Key.`);
    console.log(`⚠ Berikan kode ini kepada calon pemilik: ${secretKey}`);
}
