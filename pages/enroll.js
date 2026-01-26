import React, { useState } from 'react';

export default function Enroll() {
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
      desc: "Register to receive €100,000 & 1,000,000 LUV (Distribution: Feb 1, 2027)",
      alias: "DIGITAL ALIAS / NAME:",
      email: "VERIFICATION EMAIL:",
      proof: "PROOF OF WORK (Link/Description):",
      btn: "SEND TO AI GUARD"
    },
    AR: {
      title: "طالب بالسيادة الرقمية",
      desc: "توزيع 100,000 يورو و 1,000,000 LUV (1 فبراير 2027)",
      alias: "الاسم الرقمي:",
      email: "البريد الإلكتروني:",
      proof: "دليل العمل (رابط/وصف):",
      btn: "أرسل إلى AI GUARD"
    }
  }[lang];

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <div style={{ textAlign: 'right', marginBottom: '15px' }}>
        <button onClick={() => setLang(lang === 'ID' ? 'ENG' : lang === 'ENG' ? 'AR' : 'ID')} style={{ background: '#222', color: '#46FF2E', border: '1px solid #46FF2E', padding: '10px' }}>🌍 {lang}</button>
      </div>
      <div style={{ maxWidth: '450px', margin: 'auto', border: '1px solid #46FF2E', padding: '20px' }}>
        {step === 1 ? (
          <>
            <h2 style={{ textAlign: 'center', fontSize: '18px' }}>{t.title}</h2>
            <p style={{ textAlign: 'center', color: '#FFD700', fontSize: '13px' }}>{t.desc}</p>
            <form onSubmit={(e) => { e.preventDefault(); setIid("IID-" + Math.random().toString(36).toUpperCase().substr(2, 8)); setStep(2); }} style={{ marginTop: '20px' }}>
              <p style={{fontSize: '11px'}}>{t.alias}</p>
              <input type="text" required style={{ width: '100%', background: '#111', border: '1px solid #46FF2E', color: '#fff', padding: '10px', marginBottom: '15px' }} />
              <p style={{fontSize: '11px'}}>{t.email}</p>
              <input type="email" required style={{ width: '100%', background: '#111', border: '1px solid #46FF2E', color: '#fff', padding: '10px', marginBottom: '15px' }} />
              <p style={{fontSize: '11px'}}>{t.proof}</p>
              <textarea required style={{ width: '100%', background: '#111', border: '1px solid #46FF2E', color: '#fff', padding: '10px', height: '80px', marginBottom: '20px' }}></textarea>
              <button type="submit" style={{ width: '100%', background: '#46FF2E', color: '#000', padding: '15px', fontWeight: 'bold', border: 'none' }}>{t.btn}</button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#FFD700' }}>BERHASIL</h2>
            <p style={{ fontSize: '20px' }}>{iid}</p>
            <p style={{ fontSize: '12px' }}>Alokasi 2027 Dicatat oleh AI Guard.</p>
          </div>
        )}
      </div>
    </div>
  );
}
