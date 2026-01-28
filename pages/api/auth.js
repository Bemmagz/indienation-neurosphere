export default function handler(req, res) {
  const { secret, role } = req.body;
  
  // PROTOKOL BYPASS FOUNDER: Menggunakan kata sandi rahasia
  if (secret === 'NEURO_ROOT_2026' || role === 'FOUNDER') {
    res.status(200).json({ 
      access: 'FOUNDER_PRIVILEGE', 
      status: 'UNLOCKED',
      wallet_main: '100 Trillion ENPE (Locked)',
      reserve: '10% Open',
      donation_pool: '15% Open',
      citizens: '1,250 Verified'
    });
  } else {
    res.status(200).json({ access: 'CITIZEN_VIEW', status: 'CLAIM_ONLY' });
  }
}
