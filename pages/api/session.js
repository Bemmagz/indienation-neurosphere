import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE // Menggunakan Kunci Master (Hanya di Server)
);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token missing' });

    // AI Guard: Validasi token di sisi Server (Aman dari intaian browser)
    const { data, error } = await supabase
        .from('iid_inventory')
        .select('iid, balance, wallet_address')
        .eq('access_token', token)
        .single();

    if (error || !data) {
        return res.status(401).json({ error: 'Access Denied: Invalid Stealth Key' });
    }

    // Mengirim data tanpa membocorkan access_token kembali ke client
    return res.status(200).json({ 
        iid: data.iid, 
        balance: data.balance,
        wallet: data.wallet_address,
        status: 'AUTHENTICATED'
    });
}
