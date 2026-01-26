import Head from 'next/head';
import React, { useState } from 'react';

export default function Enroll() {
  const [lang, setLang] = useState('ID');
  const [step, setStep] = useState(1);
  const [iid, setIid] = useState('');

  const t = {
    ID: { title: "PENDAFTARAN NEUROSPHERE", desc: "Alokasi €100.000 & 1.000.000 LUV (Distribusi: 1 Februari 2027)", btn: "KIRIM KE AI GUARD" },
    ENG: { title: "NEUROSPHERE ENROLLMENT", desc: "Allocation €100,000 & 1,000,000 LUV (Distribution: Feb 1, 2027)", btn: "SEND TO AI GUARD" },
    AR: { title: "تسجيل نيوروسفير", desc: "توزيع 100,000 يورو و 1,000,000 LUV (1 فبراير 2027)", btn: "أرسل إلى AI GUARD" }
  }[lang];

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content="Daftar IID NeuroSphere. Alokasi €100rb & 1 Juta LUV (Feb 2027). Tanpa Kutipan Teknis." />
        <meta name="robots" content="index, follow, noarchive" />
      </Head>
      
      <div style={{ textAlign: 'right' }}>
        <button onClick={() => setLang(lang==='ID'?'ENG':lang==='ENG'?'AR':'ID')} style={{ background: '#111', color: '#46FF2E', border: '1px solid #46FF2E', padding: '10px' }}>🌍 {lang}</button>
      </div>

      <div style={{ maxWidth: '450px', margin: 'auto', border: '1px solid #46FF2E', padding: '20px', marginTop: '30px' }}>
        {step === 1 ? (
          <>
            <h2 style={{ textAlign: 'center' }}>◈ {t.title} ◈</h2>
            <p style={{ textAlign: 'center', color: '#FFD700', fontSize: '13px' }}>{t.desc}</p>
            <form onSubmit={(e) => { e.preventDefault(); setIid("IID-"+Math.random().toString(36).toUpperCase().substr(2,8)); setStep(2); }} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="ALIAS" required style={{ background: '#111', border: '1px solid #46FF2E', color: '#fff', padding: '12px' }} />
              <input type="email" placeholder="EMAIL" required style={{ background: '#111', border: '1px solid #46FF2E', color: '#fff', padding: '12px' }} />
              <textarea placeholder="BUKTI KARYA" required style={{ background: '#111', border: '1px solid #46FF2E', color: '#fff', padding: '12px', height: '100px' }}></textarea>
              <button type="submit" style={{ background: '#46FF2E', color: '#000', padding: '15px', fontWeight: 'bold', border: 'none' }}>{t.btn}</button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}><h2>BERHASIL</h2><h1>{iid}</h1><p>Status: Locked for Feb 2027</p></div>
        )}
      </div>
    </div>
  );
}
