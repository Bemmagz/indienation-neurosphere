// NeuroSphere API Bridge - Vercel Edition
const { createClient } = require('@supabase/supabase-client');

const supabaseUrl = 'https://yyzymgkdpqevkuhowjci.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { iid } = req.query;

  // Mengambil data saldo dan status verifikasi warga
  const { data, error } = await supabase
    .from('wallets')
    .select('*, citizens(full_name, birth_date, is_verified)')
    .eq('iid', iid)
    .single();

  if (error) return res.status(404).json({ error: 'IID tidak ditemukan' });

  // Logika UI: Menghitung umur warga secara real-time
  const birthDate = new Date(data.citizens.birth_date);
  const age = Math.floor((new Date() - birthDate) / 31557600000);

  res.status(200).json({
    name: data.citizens.full_name,
    total_grant: "€100.000",
    liquid_balance: data.amount_ind_eur,
    status: age >= 17 ? "READY_FOR_ACTIVATION" : "LOCKED_MINOR",
    age: age
  });
}
