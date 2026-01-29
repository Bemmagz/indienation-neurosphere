export default async function handler(req, res) {
  // Mengambil token dari berbagai kemungkinan jalur (Universal Detection)
  const token = req.query.id || req.query.token || req.url.split('/').pop().split('?')[0];
  
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE;

  if (!token || token === 'session') return res.status(400).json({ error: 'Token Missing' });

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/iid_inventory?access_token=eq.${token}&select=iid,balance,currency`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    const data = await response.json();
    if (!data || data.length === 0) return res.status(404).json({ error: 'Identity Not Found' });

    return res.status(200).json({
      ...data[0],
      status: 'VERIFIED_CITIZEN'
    });
  } catch (err) {
    return res.status(500).json({ error: 'System Offline' });
  }
}
