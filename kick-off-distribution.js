const { createClient } = require('@supabase/supabase-js');
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

const supabaseUrl = 'https://yyzymgkdqpqevkuhowjci.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y';
const supabase = createClient(supabaseUrl, supabaseKey);

async function startDistribution() {
    const startTime = new Date().toLocaleString();
    console.log(`\n[${startTime}] 🛡️ NEUROSPHERE SOVEREIGN ENGINE START`);
    
    let attempts = 0;
    let queue = [];

    // --- 1. RETRY LOGIC UNTUK KONEKSI ---
    while (attempts < 5) {
        try {
            const { data, error } = await supabase
                .from('claims').select('iid').eq('status', 'ACTIVE').limit(100);
            if (error) throw error;
            queue = data;
            break; 
        } catch (err) {
            attempts++;
            console.log(`⚠️ Koneksi gagal (${attempts}/5): ${err.message}. Mencoba lagi dalam 5 detik...`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }

    if (queue.length === 0) {
        console.log(`[${new Date().toLocaleTimeString()}] ℹ️ Status: Database Terhubung. Antrean Kosong.`);
        return;
    }

    console.log(`📦 Batch ditemukan: ${queue.length} pendaftar.`);

    // --- 2. TRANSAKSI DENGAN JEDA STABIL ---
    let successCount = 0;
    let failCount = 0;

    for (const person of queue) {
        try {
            const { error: txError } = await supabase
                .from('ledger_transactions').insert({
                    from_iid: 'POOL_PUSAT',
                    to_iid: person.iid,
                    amount: 100000,
                    tx_type: 'MINT'
                });

            if (txError) throw txError;
            console.log(`✅ [${new Date().toLocaleTimeString()}] Sukses: €100.000 -> ${person.iid}`);
            successCount++;
        } catch (e) {
            console.error(`❌ [${new Date().toLocaleTimeString()}] Gagal: ${person.iid}`);
            failCount++;
        }
        // Jeda 100ms agar mematuhi batasan traffic data
        await new Promise(res => setTimeout(res, 100));
    }

    console.log(`\n[${new Date().toLocaleString()}] 🏁 BATCH SELESAI`);
    console.log(`📊 Hasil: ${successCount} Berhasil, ${failCount} Gagal.`);
}

startDistribution();
