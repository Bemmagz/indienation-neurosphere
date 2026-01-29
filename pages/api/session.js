export default async function handler(req, res) {
  const { id } = req.query;
  
  // Deteksi Otomatis Variabel (Mendukung format lama & baru)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_KEY;

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/iid_inventory?access_token=eq.${id}&select=iid,balance,currency`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    const data = await response.json();

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Identity Not Found" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    return res.status(500).json({ error: "Connection Failed" });
  }
}
