import Head from 'next/head';
import React, { useState } from 'react';

export default function Enroll() {
  const [lang, setLang] = useState('ID');
  const [step, setStep] = useState(1);
  const [iid, setIid] = useState('');

  const t = {
    ID: { title: "AJUKAN KEDAULATAN DIGITAL", desc: "Alokasi €100.000 & 1.000.000 LUV (Distribusi: 1 Februari 2027)", btn: "KIRIM KE AI GUARD" },
    ENG: { title: "CLAIM DIGITAL SOVEREIGNTY", desc: "Allocation €100,000 & 1,000,000 LUV (Distribution: Feb 1, 2027)", btn: "SEND TO AI GUARD" },
    AR: { title: "طالب بالسيادة الرقمية", desc: "تخصيص 100,000 يورو و 1,000,000 LUV (التوزيع: 1 فبراير 2027)", btn: "أرسل إلى AI GUARD" }
  }[lang];

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <Head>
        <title>NeuroSphere - {t.title}</title>
        <meta name="description" content="Pendaftaran Resmi NeuroSphere. Alokasi 1.000.000 LUV untuk 1 Februari 2027. Tanpa Kutipan Teknis." />
      </Head>
      
      <div style={{ textAlign: 'right' }}><button onClick={() => setLang(lang==='ID'?'ENG':lang==='ENG'?'AR':'ID')} style={{ background: '#111', color: '#46FF2E', border: '1px solid #46FF2E', padding: '10px', cursor: 'pointer' }}>🌍 {lang}</button></div>

      <div style={{ maxWidth: '450px', margin: 'auto', border: '1px solid #46FF2E', padding: '20px', marginTop: '30px' }}>
        {step === 1 ? (
          <>
            <h2 style={{ textAlign: 'center' }}>◈ {t.title} ◈</h2>
            <p style={{ textAlign: 'center', color: '#FFD700' }}>{t.desc}</p>
            <form onSubmit={(e) => { e.preventDefault(); setIid("IID-"+Math.random().toString(36).toUpperCase().substr(2,8)); setStep(2); }} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="ALIAS" required style={{ background: '#111', border: '1px solid #46FF2E', color: '#fff', padding: '10px' }} />
              <input type="email" placeholder="EMAIL" required style={{ background: '#111', border: '1px solid #46FF2E', color: '#fff', padding: '10px' }} />
              <textarea placeholder="BUKTI KARYA" required style={{ background: '#111', border: '1px solid #46FF2E', color: '#fff', padding: '10px', height: '80px' }}></textarea>
              <button type="submit" style={{ background: '#46FF2E', color: '#000', padding: '15px', fontWeight: 'bold', border: 'none' }}>{t.btn}</button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}><h2>BERHASIL</h2><h1>{iid}</h1><p>Data dikunci untuk distribusi 2027.</p></div>
        )}
      </div>
    </div>
  );
}
