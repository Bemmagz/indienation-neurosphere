import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    const { alias, email } = req.body;
    const supabase = createClient(process.env.DB_URL, process.env.DB_KEY);
    
    // Cek apakah alias sudah ada
    const { data: existing } = await supabase.from('ledger').select('id').eq('alias', alias).single();
    if (existing) return res.status(400).json({ success: false, error: 'Identity already manifested in Ledger' });

    const sequenceId = `TM-GEN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const signature = `SIG-${Math.random().toString(36).substr(2, 20)}`;

    const { error } = await supabase.from('ledger').insert([{ alias, email, sequence_id: sequenceId, signature }]);
    if (error) throw error;

    return res.status(200).json({ success: true, id: sequenceId, sig: signature });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Protocol Integrity Breach: Identity exists or Database offline' });
  }
}
