export default function handler(req, res) {
  const { iid, key } = req.query;

  // Database Identitas Genesis
  const registry = {
    "0000000002": {
      key: "NEURO-FIRST-2026",
      alias: "Citizen 02",
      role: "Genesis Pioneer",
      tm_identity: { enpe: "1.000", luv: "0", stable: "100.000" }
    },
    "0000000003": {
      key: "NEURO-EXPAND-2026",
      alias: "Citizen 03",
      role: "Early Adopter",
      tm_identity: { enpe: "1.000", luv: "1.000.000", stable: "100.000" }
    }
  };

  const user = registry[iid];

  if (user && user.key === key) {
    res.status(200).json({
      status: "ACCESS_GRANTED",
      identity: iid,
      alias: user.alias,
      role: user.role,
      tm_identity: user.tm_identity
    });
  } else {
    res.status(403).json({ status: "ACCESS_DENIED" });
  }
}
