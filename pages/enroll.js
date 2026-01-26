import Head from 'next/head';
import React, { useState } from 'react';

export default function Enroll() {
  const [lang, setLang] = useState('ID');
  const [step, setStep] = useState(1);
  const [iid, setIid] = useState('');

  const t = {
    ID: { title: "PENDAFTARAN NEUROSPHERE", desc: "Alokasi €100.000 & 1.000.000 LUV (Distribusi: 1 Feb 2027)", btn: "KIRIM KE AI GUARD" },
    ENG: { title: "NEUROSPHERE ENROLLMENT", desc: "Allocation €100,000 & 1,000,000 LUV (Distribution: Feb 1, 2027)", btn: "SEND TO AI GUARD" },
    AR: { title: "تسجيل نيوروسفير", desc: "توزيع 100,000 يورو و 1,000,000 LUV (1 فبراير 2027)", btn: "أرسل إلى AI GUARD" }
  }[lang];

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content="Pendaftaran Resmi NeuroSphere. Alokasi 1.000.000 LUV untuk 2027." />
        <link rel="canonical" href="https://indienation-neurosphere.vercel.app/enroll" />
      </Head>
      
      <div style={{ textAlign: 'right', marginBottom: '15px' }}>
        <button onClick={() => setLang(lang==='ID'?'ENG':lang==='ENG'?'AR':'ID')} style={{ background: '#111', color: '#46FF2E', border: '1px solid #46FF2E', padding: '10px' }}>🌍 {lang}</button>
      </div>

      <div style={{ maxWidth: '450px', margin: 'auto', border: '1px solid #46FF2E', padding: '25px', backgroundColor: '#050505' }}>
        {step === 1 ? (
          <>
            <h2 style={{ textAlign: 'center', fontSize: '18px' }}>◈ {t.title} ◈</h2>
            <p style={{ textAlign: 'center', color: '#FFD700', fontSize: '13px' }}>{t.desc}</p>
            <form onSubmit={(e) => { e.preventDefault(); setIid("IID-"+Math.random().toString(36).toUpperCase().substr(2,8)); setStep(2); }} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="ALIAS" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff' }} />
              <input type="email" placeholder="EMAIL" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff' }} />
              <textarea placeholder="BUKTI KARYA" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff', height: '100px' }}></textarea>
              <button type="submit" style={{ background: '#46FF2E', color: '#000', padding: '15px', fontWeight: 'bold', border: 'none' }}>{t.btn}</button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#FFD700' }}>BERHASIL</h2>
            <div style={{ border: '1px dashed #46FF2E', padding: '20px', margin: '20px 0' }}>
              <p>ID IDENTITAS ANDA:</p>
              <h1 style={{ fontSize: '24px' }}>{iid}</h1>
            </div>
            <p style={{ fontSize: '12px' }}>Alokasi 2027 telah dicatat oleh AI Guard.</p>
          </div>
        )}
      </div>
    </div>
  );
}
