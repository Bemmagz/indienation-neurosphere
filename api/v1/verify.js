const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

export default function handler(req, res) {
  const { iid, key } = req.query; // Mengambil ID dan Password dari URL
  const registry = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'genesis-registry.json'), 'utf8'));

  if (!registry[iid]) {
    return res.status(404).json({ status: "NOT_FOUND", message: "Identity not registered." });
  }

  const citizen = registry[iid];

  // Jika ID memiliki pengunci (auth), cek passwordnya
  if (citizen.auth) {
    const hashedInput = crypto.createHash('sha256').update(key || "").digest('hex');
    
    if (hashedInput !== citizen.auth.k) {
      return res.status(401).json({ 
        status: "LOCKED", 
        message: "Key rahasia salah. Akses ditolak." 
      });
    }
  }

  // Jika lolos (atau tidak dikunci), tampilkan data
  res.status(200).json({
    status: "ACCESS_GRANTED",
    identity: iid,
    alias: citizen.alias || "Citizen",
    tm_identity: citizen.tm_identity,
    role: citizen.role || "CITIZEN"
  });
}
