# 🛡️ NeuroSphere Security Protocol (v1.0)
**Owner:** INDIE-Founder  
**Core Model:** Technology Money (TM) & Living Value Identity  
**Status:** FULLY OPERATIONAL

## 1. Gatekeeper Protocol (Anti-Fraud & Minor Protection)
- **Hard Rule:** Akses Root Account hanya diberikan kepada individu berusia ≥ 17 tahun.
- **Verification:** Wajib sinkronisasi foto wajah + ID Nasional (KTP/Passport).
- **Privacy:** Data gambar asli dihancurkan seketika (self-destruct) setelah status verifikasi 'True' diberikan oleh AI.
- **Anti-Breeding:** Menggunakan deterministic hashing (`id_hash`) yang UNIK. Satu identitas nasional hanya bisa melahirkan satu Root IID.

## 2. Session Sovereignty (The 30-Minute Rule)
- **Auto-Lock:** Database secara otomatis menolak transaksi jika `last_activity` > 30 menit.
- **Trigger Enforcement:** Menggunakan `enforce_session_security()` pada level PostgreSQL/Supabase.
- **Session Cleanup:** Skrip pembersihan berkala menghapus token kadaluwarsa untuk menjaga efisiensi penyimpanan dan privasi.

## 3. Cryptographic Layer (Data Sanctity)
- **Credential Hashing:** `session_token` tidak pernah disimpan dalam bentuk teks biasa. Semua token di-hash menggunakan **SHA256**.
- **IID Integrity:** Identifier internal (IID) tetap terbaca untuk transparansi audit, namun tidak mengandung data pribadi mentah.

## 4. Child-Protection Governance
- **Sub-Identity:** Anak di bawah 17 tahun tidak dapat memiliki Root Account mandiri.
- **Parental Link:** Hak anak dikelola di bawah akun orang tua yang sudah terverifikasi ID Nasional.
- **Wealth Lock:** Dana untuk anak dikunci (locked savings) hingga mencapai usia legal atau dialokasikan untuk edukasi terkurasi.

## 5. Maintenance & Compliance
- **Audit Trail:** Setiap aktivitas tercatat di `transfer_logs` dan `identity_collisions`.
- **System Health:** Monitoring rutin pada Termux untuk menjaga batas pengiriman data (max 100M per sesi).
