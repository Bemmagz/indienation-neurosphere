const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.DB_URL, process.env.DB_KEY);

export default async function handler(req, res) {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "ID REQUIRED" });

    const { data, error } = await supabase
        .from('ledger')
        .select('alias, sequence_id, signature, created_at')
        .eq('sequence_id', id)
        .single();

    if (error || !data) return res.status(404).json({ status: "INVALID", message: "IDENTITY NOT FOUND" });

    // Masking email untuk privasi, tampilkan identitas publik
    res.status(200).json({
        status: "VALID",
        holder: data.alias,
        sequence: data.sequence_id,
        timestamp: data.created_at,
        integrity_hash: data.signature.substring(0, 16) + "..."
    });
}
