const { exec } = require('child_process');
console.log("🛠️ AI Guard: Mencoba menyegarkan jalur DNS...");

exec('pkg install dnsutils -y', (err) => {
    if (err) console.log("⚠️ dnsutils sudah terpasang atau gagal.");
    console.log("📡 Mencoba resolusi paksa...");
    exec('nslookup nylpoyjiyfexmppvunli.supabase.co 1.1.1.1', (err, stdout) => {
        console.log(stdout);
        console.log("🏁 Jika angka IP muncul di atas, jalankan kembali nuclear-reset.js");
    });
});
