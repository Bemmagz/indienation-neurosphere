import React, { useState } from 'react';

export default function Apply() {
  const [lang, setLang] = useState('ID');
  const [step, setStep] = useState(1);
  const [iid, setIid] = useState('');

  const content = {
    ID: {
      title: "AJUKAN KEDAULATAN DIGITAL",
      desc: "Daftar untuk menerima alokasi €100.000 & 1.000.000 LUV (Distribusi: 1 Februari 2027)",
      fields: ["ALIAS / NAMA DIGITAL:", "EMAIL VERIFIKASI:", "BUKTI KARYA/KEBAIKAN (Link/Deskripsi):"],
      btn: "KIRIM KE AI GUARD",
      success: "PENDAFTARAN BERHASIL"
    },
    ENG: {
      title: "CLAIM DIGITAL SOVEREIGNTY",
      desc: "Register to receive €100,000 & 1,000,000 LUV allocation (Distribution: Feb 1, 2027)",
      fields: ["DIGITAL ALIAS / NAME:", "VERIFICATION EMAIL:", "PROOF OF WORK/KINDNESS (Link/Description):"],
      btn: "SEND TO AI GUARD",
      success: "REGISTRATION SUCCESSFUL"
    },
    AR: {
      title: "طالب بالسيادة الرقمية",
      desc: "سجل للحصول على تخصيص 100,000 يورو و 1,000,000 LUV (التوزيع: 1 فبراير 2027)",
      fields: ["الاسم الرقمي:", "البريد الإلكتروني للتحقق:", "دليل العمل / أعمال الخير (رابط/وصف):"],
      btn: "أرسل إلى الحارس الذكي",
      success: "تم التسجيل بنجاح"
    }
  };

  const t = content[lang];

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '15px', fontFamily: 'monospace' }}>
      <div style={{ textAlign: 'right', marginBottom: '15px' }}>
        <button onClick={() => setLang(lang === 'ID' ? 'ENG' : lang === 'ENG' ? 'AR' : 'ID')} style={{ background: '#111', border: '1px solid #46FF2E', color: '#46FF2E', padding: '10px' }}>
          🌍 {lang}
        </button>
      </div>

      <div style={{ border: '1px solid #46FF2E', padding: '20px', backgroundColor: '#050505' }}>
        {step === 1 ? (
          <>
            <h2 style={{ textAlign: 'center', fontSize: '18px' }}>{t.title}</h2>
            <p style={{ fontSize: '12px', textAlign: 'center', color: '#FFD700', margin: '20px 0' }}>{t.desc}</p>
            <form onSubmit={(e) => { e.preventDefault(); setIid("NS-" + Math.random().toString(36).substr(2, 8).toUpperCase()); setStep(2); }}>
              <p style={{fontSize: '11px', marginBottom: '5px'}}>{t.fields[0]}</p>
              <input type="text" required style={{ width: '100%', background: '#111', border: '1px solid #46FF2E', padding: '10px', color: '#fff', marginBottom: '15px' }} />
              
              <p style={{fontSize: '11px', marginBottom: '5px'}}>{t.fields[1]}</p>
              <input type="email" required style={{ width: '100%', background: '#111', border: '1px solid #46FF2E', padding: '10px', color: '#fff', marginBottom: '15px' }} />
              
              <p style={{fontSize: '11px', marginBottom: '5px'}}>{t.fields[2]}</p>
              <textarea required style={{ width: '100%', background: '#111', border: '1px solid #46FF2E', padding: '10px', color: '#fff', height: '80px', marginBottom: '20px' }}></textarea>
              
              <button type="submit" style={{ width: '100%', background: '#46FF2E', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold' }}>{t.btn}</button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#FFD700' }}>{t.success}</h2>
            <div style={{ border: '1px dashed #46FF2E', padding: '20px', margin: '20px 0' }}>
              <p>IID ANDA:</p>
              <h1 style={{fontSize: '24px'}}>{iid}</h1>
            </div>
            <a href="/" style={{ color: '#46FF2E' }}>← KEMBALI</a>
          </div>
        )}
      </div>
    </div>
  );
}
