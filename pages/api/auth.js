export default function handler(req, res) {
  const { secret, action } = req.body;
  if (secret !== 'NEURO_ROOT_2026') {
    return res.status(200).json({ access: 'CITIZEN_VIEW', status: 'CLAIM_ONLY' });
  }

  const data = {
    founder_vault: {
      total_enpe: "100 Trillion",
      locked_founder: "74% (3 Years)",
      donation_pool: "15% (OPEN)",
      reserve_ops: "10% (OPEN)",
      luv_dist: "1% for 1M People"
    },
    top_5_citizens: [
      { id: "NS-GEN-001", type: "Pioneer", status: "Verified", claim: "€100.000" },
      { id: "NS-CIT-002", type: "Citizen", status: "Verified", claim: "€100.000" },
      { id: "NS-CIT-003", type: "Citizen", status: "Verified", claim: "€100.000" },
      { id: "NS-CIT-004", type: "Citizen", status: "Verified", claim: "€100.000" },
      { id: "NS-CIT-005", type: "Citizen", status: "Verified", claim: "€100.000" }
    ]
  };

  if (action === 'FULL_AUDIT') res.status(200).json(data);
}
