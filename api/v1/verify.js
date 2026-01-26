const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

export default function handler(req, res) {
  const { iid, key } = req.query;
  
  // Membaca file yang sekarang berada di folder yang sama
  const registryPath = path.join(process.cwd(), 'api/v1/genesis-registry.json');
  
  if (!fs.existsSync(registryPath)) {
    return res.status(500).json({ status: "ERROR", message: "Database not found in API path" });
  }

  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

  if (!registry[iid]) {
    return res.status(404).json({ status: "NOT_FOUND", message: "Identity not registered." });
  }

  const citizen = registry[iid];

  if (citizen.auth) {
    const hashedInput = crypto.createHash('sha256').update(key || "").digest('hex');
    if (hashedInput !== citizen.auth.k) {
      return res.status(401).json({ status: "LOCKED", message: "Key rahasia salah." });
    }
  }

  res.status(200).json({
    status: "ACCESS_GRANTED",
    identity: iid,
    alias: citizen.alias || "Citizen",
    tm_identity: citizen.tm_identity,
    role: citizen.role || "CITIZEN"
  });
}
