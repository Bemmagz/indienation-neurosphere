const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 3000;

// Konfigurasi Supabase (Gunakan URL & Key Proyek indienation-neurosphere Anda)
const supabase = createClient('URL_SUPABASE_ANDA', 'KEY_SUPABASE_ANDA');

app.get('/api/dashboard/total-tm', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('v_total_tm')
            .select('*');

        if (error) throw error;

        // Visualisasi TM sebagai Identitas Nilai Hidup
        res.json({
            status: "Sovereign",
            founder: "INDIE-Founder",
            timestamp: new Date().toISOString(),
            total_tm_details: {
                description: "Manifestasi ENPE, LUV, dan Stable (IND-EUR)",
                data: data
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log('🛡️ NeuroSphere Dashboard API running at http://localhost:' + port);
});
