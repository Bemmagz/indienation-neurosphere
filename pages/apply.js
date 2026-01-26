import React, { useState } from 'react';

export default function Apply() {
  const [lang, setLang] = useState('ID');
  const [step, setStep] = useState(1);
  const [iid, setIid] = useState('');

  const t = {
    ID: {
      title: "AJUKAN KEDAULATAN DIGITAL",
      desc: "Daftar untuk menerima alokasi €100.000 & 1.000.000 LUV (Distribusi: 1 Februari 2027)",
      alias: "ALIAS / NAMA DIGITAL:",
      email: "EMAIL VERIFIKASI:",
      proof: "BUKTI KARYA/KEBAIKAN (Link/Deskripsi):",
      btn: "KIRIM KE AI GUARD"
    },
    ENG: {
      title: "CLAIM DIGITAL SOVEREIGNTY",
      desc: "Register to receive €100,000 & 1,000,000 LUV allocation (Distribution: February 1, 2027)",
      alias: "DIGITAL ALIAS / NAME:",
      email: "VERIFICATION EMAIL:",
      proof: "PROOF OF WORK/KINDNESS (Link/Description):",
      btn: "SEND TO AI GUARD"
    },
    AR: {
      title: "طالب بالسيادة الرقمية",
      desc: "سجل للحصول على تخصيص 100,000 يورو و 1,000,000 LUV (التوزيع: 1 فبراير 2027)",
      alias: "الاسم الرقمي:",
      email: "البريد الإلكتروني للتحقق:",
      proof: "دليل العمل / أعمال الخير (رابط/وصف):",
      btn: "أرسل إلى الحارس الذكي"
    }
  }[lang];

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button onClick={() => setLang(lang === 'ID' ? 'ENG' : lang === 'ENG' ? 'AR' : 'ID')} style={{ background: '#111', border: '1px solid #46FF2E', color: '#46FF2E', padding: '10px' }}>🌍 {lang}</button>
      </div>
      <div style={{ maxWidth: '500px', margin: 'auto', border: '1px solid #46FF2E', padding: '25px' }}>
        {step === 1 ? (
          <>
            <h2 style={{ textAlign: 'center' }}>◈ {t.title} ◈</h2>
            <p style={{ textAlign: 'center', color: '#FFD700', fontSize: '13px' }}>{t.desc}</p>
            <form onSubmit={(e) => { e.preventDefault(); setIid("NS-" + Math.random().toString(36).substr(2, 9).toUpperCase()); setStep(2); }} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <label>{t.alias}</label>
              <input type="text" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '10px', color: '#fff' }} />
              <label>{t.email}</label>
              <input type="email" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '10px', color: '#fff' }} />
              <label>{t.proof}</label>
              <textarea required style={{ background: '#111', border: '1px solid #46FF2E', padding: '10px', color: '#fff', height: '80px' }}></textarea>
              <button type="submit" style={{ background: '#46FF2E', color: '#000', padding: '15px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>{t.btn}</button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#FFD700' }}>BERHASIL</h2>
            <p>IID: {iid}</p>
            <a href="/" style={{ color: '#46FF2E' }}>Kembali</a>
          </div>
        )}
      </div>
    </div>
  );
}
