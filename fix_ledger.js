const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SB_URL, process.env.SB_KEY);

async function fix() {
  console.log("--- MEMULAI PERBAIKAN STRUKTUR NEUROLANG ---");
  const { data, error } = await supabase.rpc('exec_sql', { 
    sql_query: "DROP TABLE IF EXISTS ledger; CREATE TABLE ledger (id SERIAL PRIMARY KEY, asset_name TEXT UNIQUE, total_supply NUMERIC, owner_identity TEXT); INSERT INTO ledger (asset_name, total_supply, owner_identity) VALUES ('ENPE', 100000000000000, 'Bemmagz'), ('LUV', 1000000000000, 'Community');" 
  });
  
  if (error) {
    console.log("Gagal otomatis. Jalur API RPC dikunci. Harus klik RUN di dashboard satu kali.");
  } else {
    console.log("BERHASIL! Struktur ENPE & LUV telah sinkron.");
  }
}
fix();
