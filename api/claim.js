const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(process.env.DB_URL, process.env.DB_KEY);

export default async function handler(req, res) {
    const { alias, email } = req.body;
    
    // 1. Cek duplikasi di Ledger Nyata
    const { data: existing } = await supabase.from('ledger').select('*').eq('email', email).single();
    if (existing) return res.status(400).json({ error: "IDENTITAS SUDAH TERDAFTAR" });

    // 2. Generate ID & Signature di sisi Server (BUKAN BROWSER)
    const sequenceId = "TM-GEN-" + crypto.randomBytes(3).toString('hex').toUpperCase();
    const signature = crypto.createHmac('sha256', process.env.FOUNDER_SECRET)
                           .update(`${alias}:${sequenceId}`)
                           .digest('hex');

    // 3. Catat di Ledger Abadi
    await supabase.from('ledger').insert([{ alias, email, sequence_id: sequenceId, signature }]);

    res.status(200).json({ sequenceId, signature, status: "SUCCESS" });
}
