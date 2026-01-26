export default function handler(req, res) {
  const { id, key } = req.query;
  
  const validKeys = {
    'FOUNDER_KEY_2026': '0000000001',
    'NEURO-FIRST-2026': '0000000002'
  };

  if (validKeys[key] === id) {
    res.status(200).json({
      status: 'CERTIFICATE_ISSUED',
      alias: id === '0000000001' ? 'FOUNDER' : 'Citizen 02',
      verification: 'AI GUARD PROTOCOL v1.0'
    });
  } else {
    res.status(403).json({ status: 'INVALID_ACCESS' });
  }
}
