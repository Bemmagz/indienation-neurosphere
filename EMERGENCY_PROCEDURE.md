# ⚠️ NeuroSphere Emergency & Offline Protocol
**Version:** 1.0 (Survival Mode)

Jika terjadi kegagalan infrastruktur internet global atau isolasi nasional, ikuti langkah-langkah berikut untuk menjaga kedaulatan ekonomi lokal:

## 1. Local Ledger Isolation
Aktifkan mode node mandiri agar transaksi E-KINDNESS tetap bisa dicatat di server lokal negara masing-masing.
- Perintah: `./ns-core.sh config --mode "Guardian_Override"`
- Pastikan backup snapshot dilakukan setiap 6 jam secara otomatis.

## 2. Mesh-Network Distribution
Gunakan infrastruktur radio atau jaringan lokal (Intranet) untuk mendistribusikan nilai LUV di dalam wilayah administratif. NFT identitas tetap dapat divalidasi secara offline menggunakan kunci publik yang tersimpan di perangkat keras lokal.

## 3. Reconciliation (Sinkronisasi Ulang)
Saat koneksi internet pulih, jalankan prosedur audit integritas sebelum melakukan penggabungan data (merging) ke Global Ledger.
- Langkah: 
  1. `./ns-core.sh debug --integrity-scan`
  2. `./ns-audit.sh` (Pastikan hash cocok dengan snapshot terakhir).
  3. Hubungkan ke Global Hub.

## 4. Disaster Fund Activation
Jika terjadi bencana fisik bersamaan dengan kegagalan sistem, Founder memiliki otoritas untuk membuka gembok 15% Donation Pool menggunakan kunci fisik (Hardware Key) di Command Center utama.

---
*Kedaulatan tidak bergantung pada kabel, melainkan pada integritas data.*
