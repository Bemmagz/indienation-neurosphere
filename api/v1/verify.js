const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const { iid } = req.query;
  const registry = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'genesis-registry.json'), 'utf8'));

  if (registry[iid]) {
    const data = registry[iid];
    res.status(200).json({
      status: "VERIFIED",
      identity: iid,
      role: data.role || "CITIZEN",
      tm_identity: data.tm_identity || { message: "Value Pending Activation" },
      timestamp: data.ts
    });
  } else {
    res.status(404).json({ status: "NOT_FOUND", message: "Identity not registered in Genesis Registry" });
  }
}
