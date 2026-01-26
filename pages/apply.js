import React, { useState } from 'react';

export default function Apply() {
  const [step, setStep] = useState(1);
  const [iid, setIid] = useState('');

  const executeAiGuard = (e) => {
    e.preventDefault();
    // Protokol Neurolang: Validasi Integritas Otomatis
    const generatedIid = "NS-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setIid(generatedIid);
    setStep(2);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '40px', fontFamily: 'monospace' }}>
      {step === 1 ? (
        <div style={{ maxWidth: '500px', margin: 'auto', border: '1px solid #46FF2E', padding: '30px' }}>
          <h2 style={{ textAlign: 'center' }}>◈ AJUKAN KEDAULATAN DIGITAL ◈</h2>
          <p style={{ fontSize: '11px', textAlign: 'center' }}>Alokasi: €100.000 & 1.000.000 LUV [Target 01-02-2027]</p>
          <form onSubmit={executeAiGuard} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            <input type="text" placeholder="ALIAS / NAMA DIGITAL" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff' }} />
            <input type="email" placeholder="EMAIL VERIFIKASI" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff' }} />
            <textarea placeholder="BUKTI KARYA/KEBAIKAN (Link/Deskripsi)" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '12px', color: '#fff', height: '100px' }}></textarea>
            <button type="submit" style={{ background: '#46FF2E', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
              KIRIM KE AI GUARD
            </button>
          </form>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h2 style={{ color: '#FFD700' }}>◈ IDENTITAS DITERBITKAN ◈</h2>
          <div style={{ border: '2px double #46FF2E', padding: '40px', display: 'inline-block', backgroundColor: '#111' }}>
            <p>IID IDENTITY:</p>
            <h1 style={{ letterSpacing: '5px' }}>{iid}</h1>
            <hr style={{ borderColor: '#46FF2E' }} />
            <p style={{ fontSize: '12px' }}>STATUS: TERKUNCI (LOCKED) - 2 TAHUN</p>
            <p style={{ fontSize: '12px' }}>AURA METER: INITIALIZING...</p>
          </div>
          <br />
          <a href="/" style={{ color: '#fff', textDecoration: 'underline', display: 'block', marginTop: '30px' }}>Masuk ke Dashboard Dashboard Dashboard Dashboard Control Room</a>
        </div>
      )}
    </div>
  );
}
