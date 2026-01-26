import React, { useState } from 'react';

export default function Apply() {
  const [lang, setLang] = useState('ID');
  const [step, setStep] = useState(1);
  const [iid, setIid] = useState('');

  const translations = {
    ID: {
      title: "AJUKAN KEDAULATAN DIGITAL",
      desc: "Daftar untuk menerima alokasi €100.000 & 1.000.000 LUV (Distribusi: 1 Februari 2027)",
      alias: "ALIAS / NAMA DIGITAL:",
      email: "EMAIL VERIFIKASI:",
      proof: "BUKTI KARYA/KEBAIKAN (Link/Deskripsi):",
      btn: "KIRIM KE AI GUARD",
      success: "PENDAFTARAN BERHASIL",
      dir: "ltr"
    },
    ENG: {
      title: "CLAIM DIGITAL SOVEREIGNTY",
      desc: "Register to receive €100,000 & 1,000,000 LUV allocation (Distribution: February 1, 2027)",
      alias: "DIGITAL ALIAS / NAME:",
      email: "VERIFICATION EMAIL:",
      proof: "PROOF OF WORK/KINDNESS (Link/Description):",
      btn: "SEND TO AI GUARD",
      success: "REGISTRATION SUCCESSFUL",
      dir: "ltr"
    },
    AR: {
      title: "طالب بالسيادة الرقمية",
      desc: "سجل للحصول على تخصيص 100,000 يورو و 1,000,000 LUV (التوزيع: 1 فبراير 2027)",
      alias: "الاسم الرقمي:",
      email: "البريد الإلكتروني للتحقق:",
      proof: "دليل العمل / أعمال الخير (رابط/وصف):",
      btn: "أرسل إلى الحارس الذكي",
      success: "تم التسجيل بنجاح",
      dir: "rtl"
    }
  };

  const t = translations[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIid("NS-" + Math.random().toString(36).substr(2, 9).toUpperCase());
    setStep(2);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '15px', fontFamily: 'monospace', direction: t.dir }}>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button onClick={() => setLang(lang === 'ID' ? 'ENG' : lang === 'ENG' ? 'AR' : 'ID')} style={{ background: '#111', border: '1px solid #46FF2E', color: '#46FF2E', padding: '10px 15px', borderRadius: '5px' }}>
          🌍 {lang}
        </button>
      </div>

      <div style={{ maxWidth: '500px', margin: 'auto', border: '1px solid #46FF2E', padding: '25px', backgroundColor: '#050505' }}>
        {step === 1 ? (
          <>
            <h2 style={{ textAlign: 'center', fontSize: '1.2rem' }}>◈ {t.title} ◈</h2>
            <p style={{ fontSize: '13px', textAlign: 'center', color: '#FFD700', margin: '20px 0' }}>{t.desc}</p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px' }}>{t.alias}</label>
              <input type="text" required style={{ width: '100%', background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff' }} />
              
              <label style={{ fontSize: '11px' }}>{t.email}</label>
              <input type="email" required style={{ width: '100%', background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff' }} />
              
              <label style={{ fontSize: '11px' }}>{t.proof}</label>
              <textarea required style={{ width: '100%', background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff', height: '100px' }}></textarea>
              
              <button type="submit" style={{ width: '100%', background: '#46FF2E', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>
                {t.btn}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#FFD700' }}>{t.success}</h2>
            <div style={{ border: '2px dashed #46FF2E', padding: '30px', margin: '30px 0' }}>
              <p style={{ fontSize: '12px' }}>ID IDENTITAS ANDA (IID):</p>
              <h1 style={{ letterSpacing: '4px', fontSize: '22px' }}>{iid}</h1>
            </div>
            <a href="/" style={{ color: '#46FF2E', textDecoration: 'none' }}>← KEMBALI KE DASHBOARD</a>
          </div>
        )}
      </div>
    </div>
  );
}
