const { createClient } = require('@supabase/supabase-client');

module.exports = async (req, res) => {
  // Inisialisasi koneksi ke Vault
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  
  try {
    // Menghitung statistik Citizens secara real-time
    const { count, error } = await supabase
      .from('iid_inventory')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      system: "NEUROSPHERE AI GUARD",
      pulse: "STABLE",
      total_citizens: count || 0,
      value_identity_issued: ((count || 0) * 100000).toLocaleString() + " EUR",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

