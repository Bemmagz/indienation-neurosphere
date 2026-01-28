// Logic Pemisahan Identitas AI Guard
export default function handler(req, res) {
  const { deviceId, role } = req.body;
  if (role === 'FOUNDER' && deviceId === 'MASTER_DEVICE_ID') {
    res.status(200).json({ access: 'FOUNDER_PRIVILEGE', status: 'LOCKED' });
  } else {
    res.status(200).json({ access: 'CITIZEN_VIEW', status: 'CLAIM_ONLY' });
  }
}
