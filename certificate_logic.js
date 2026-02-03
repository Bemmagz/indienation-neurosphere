async function generateCertificate() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const iid = document.getElementById('user-iid').innerText.replace('CITIZEN: ', '');
    const date = new Date().toLocaleString('id-ID');

    // Desain Background Hitam
    doc.setFillColor(5, 5, 5);
    doc.rect(0, 0, 297, 210, 'F');

    // Border Emas
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Teks Utama
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(30);
    doc.text("SERTIFIKAT KEDAULATAN DIGITAL", 148.5, 60, { align: 'center' });
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("DENGAN INI MENYATAKAN BAHWA PEMEGANG IDENTITAS:", 148.5, 80, { align: 'center' });

    doc.setTextColor(0, 255, 136); // Warna Neon
    doc.setFontSize(40);
    doc.text(iid, 148.5, 110, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("ADALAH WARGA NEGARA SAH DALAM EKOSISTEM NEUROSPHERE", 148.5, 130, { align: 'center' });
    doc.text("AKTIVASI PADA: " + date, 148.5, 145, { align: 'center' });

    // Digital Signature Hash (Simulasi)
    const signature = "SIG-" + Math.random().toString(36).substring(2, 15).toUpperCase();
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text("VALIDATION HASH: " + signature, 148.5, 180, { align: 'center' });

    // Download File
    doc.save("SERTIFIKAT-" + iid + ".pdf");
}
