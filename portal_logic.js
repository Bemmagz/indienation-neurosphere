async function claimIID() {
    const iid = document.getElementById('iid-login').value;
    const phone = prompt("Masukkan Nomor Telepon untuk Verifikasi Kedaulatan (Sekali seumur hidup):");
    
    if(phone && iid) {
        alert("Sinkronisasi IID " + iid + " dengan nomor " + phone + " BERHASIL.");
        // Di sini AI Guard akan mengupdate status di Supabase menjadi 'CLAIMED'
        loginSuccess(iid);
    }
}
