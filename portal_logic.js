async function claimIID() {
    const iid = document.getElementById('iid-login').value;
    const phone = prompt("Masukkan Nomor Telepon untuk Verifikasi Kedaulatan (Sekali seumur hidup):");
    
    if(phone && iid) {
        alert("Sinkronisasi IID " + iid + " dengan nomor " + phone + " BERHASIL.");
        // Di sini AI Guard akan mengupdate status di Supabase menjadi 'CLAIMED'
        loginSuccess(iid);
    }
}

function loginSuccess(iid) {
    console.log("Akses Diberikan untuk IID: " + iid);
    // Mengarahkan warga ke pusat kendali ARGI (Sektor 34) sebagai landing page pertama
    setTimeout(() => {
        window.location.href = "argi_control.html";
    }, 1500);
}
