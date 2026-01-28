require('dotenv').config();

async function shootToCloud() {
  const url = `${process.env.SUPABASE_URL}/rest/v1/iid_inventory`;
  const key = process.env.SUPABASE_KEY;

  const data = [
    { iid: "00000000001", status: "CLAIMED & LOCKED", date: "2026-01-27" },
    { iid: "00000000002", status: "CLAIMED & LOCKED", date: "2026-01-27" },
    { iid: "00000000003", status: "CLAIMED & LOCKED", date: "2026-01-27" },
    { iid: "00000000004", status: "CLAIMED & LOCKED", date: "2026-01-27" },
    { iid: "00000000005", status: "CLAIMED & LOCKED", date: "2026-01-27" }
  ];

  console.log("📡 AI Guard: Memulai transmisi ke Cloud...");

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    console.log("✅ SUCCESS: 5 Genesis IID telah terdaftar di Supabase.");
  } else {
    const err = await response.text();
    console.log("❌ FAILED: Periksa apakah tabel 'iid_inventory' sudah dibuat di Supabase.");
    console.log("Detail Error:", err);
  }
}

shootToCloud();
