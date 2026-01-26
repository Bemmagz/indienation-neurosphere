import React, { useState } from 'react';

export default function Apply() {
  const [lang, setLang] = useState('ID');
  const [step, setStep] = useState(1);
  const [iid, setIid] = useState('');

  const t = {
    ID: {
      title: "AJUKAN KEDAULATAN DIGITAL",
      desc: "Daftar untuk menerima alokasi €100.000 & 1.000.000 LUV (Distribusi: 1 Feb 2027)",
      alias: "ALIAS / NAMA DIGITAL",
      email: "EMAIL VERIFIKASI",
      proof: "BUKTI KARYA/KEBAIKAN (Link/Deskripsi)",
      btn: "KIRIM KE AI GUARD",
      success: "PENDAFTARAN BERHASIL",
      dir: "ltr"
    },
    ENG: {
      title: "CLAIM DIGITAL SOVEREIGNTY",
      desc: "Register to receive €100,000 & 1,000,000 LUV allocation (Distribution: Feb 1, 2027)",
      alias: "DIGITAL ALIAS / NAME",
      email: "VERIFICATION EMAIL",
      proof: "PROOF OF WORK/KINDNESS (Link/Description)",
      btn: "SEND TO AI GUARD",
      success: "REGISTRATION SUCCESSFUL",
      dir: "ltr"
    },
    AR: {
      title: "طالب بالسيادة الرقمية",
      desc: "سجل للحصول على تخصيص 100,000 يورو و 1,000,000 LUV (التوزيع: 1 فبراير 2027)",
      alias: "الاسم الرقمي",
      email: "البريد الإلكتروني للتحقق",
      proof: "دليل العمل / أعمال الخير (رابط/وصف)",
      btn: "أرسل إلى الحارس الذكي",
      success: "تم التسجيل بنجاح",
      dir: "rtl"
    }
  }[lang];

  const handleApply = (e) => {
    e.preventDefault();
    setIid("NS-" + Math.random().toString(36).substr(2, 9).toUpperCase());
    setStep(2);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '20px', fontFamily: 'monospace', direction: t.dir }}>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button onClick={() => setLang(lang === 'ID' ? 'ENG' : lang === 'ENG' ? 'AR' : 'ID')} style={{ background: '#111', border: '1px solid #46FF2E', color: '#46FF2E', padding: '5px 15px', cursor: 'pointer', borderRadius: '20px' }}>
          🌍 {lang}
        </button>
      </div>

      <div style={{ maxWidth: '500px', margin: 'auto', border: '1px solid #46FF2E', padding: '30px', backgroundColor: '#050505', boxShadow: '0 0 15px #46FF2E' }}>
        {step === 1 ? (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>◈ {t.title} ◈</h2>
            <p style={{ fontSize: '13px', textAlign: 'center', color: '#FFD700', marginBottom: '25px', lineHeight: '1.5' }}>{t.desc}</p>
            <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ fontSize: '11px' }}>{t.alias}</label>
              <input type="text" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff' }} />
              
              <label style={{ fontSize: '11px' }}>{t.email}</label>
              <input type="email" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff' }} />
              
              <label style={{ fontSize: '11px' }}>{t.proof}</label>
              <textarea required style={{ background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff', height: '80px' }}></textarea>
              
              <button type="submit" style={{ background: '#46FF2E', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                {t.btn}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#FFD700' }}>{t.success}</h2>
            <div style={{ margin: '30px 0', border: '1px dashed #46FF2E', padding: '20px' }}>
              <p style={{ fontSize: '12px' }}>YOUR IDENTITY ID (IID):</p>
              <h1 style={{ letterSpacing: '3px' }}>{iid}</h1>
            </div>
            <p style={{ fontSize: '12px' }}>Status: Verifikasi AI Guard Berhasil.</p>
            <a href="/" style={{ color: '#46FF2E', textDecoration: 'none', fontSize: '14px' }}>← Kembali ke Dashboard</a>
          </div>
        )}
      </div>
    </div>
  );
}
