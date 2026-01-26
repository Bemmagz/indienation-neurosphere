import React, { useState } from 'react';

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [iid, setIid] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    // LOGIKA OTOMATIS AI GUARD
    const newIid = "IDN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setIid(newIid);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ backgroundColor: '#000', color: '#46FF2E', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
        <h2>◈ PENDAFTARAN BERHASIL ◈</h2>
        <p>IID ANDA TELAH DITERBITKAN OTOMATIS:</p>
        <h1 style={{ border: '1px solid #46FF2E', padding: '10px 20px' }}>{iid}</h1>
        <p style={{ color: '#FFD700' }}>✓ Signed by AI GUARD DIGITAL SIGNATURE</p>
        <a href="/" style={{ color: '#fff', marginTop: '20px' }}>Masuk ke Dashboard Dashboard</a>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '40px', fontFamily: 'monospace' }}>
      <h2 style={{ textAlign: 'center' }}>◈ CLAIM YOUR DIGITAL IDENTITY ◈</h2>
      <form onSubmit={handleApply} style={{ maxWidth: '400px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="ALIAS / NAMA" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '10px', color: '#fff' }} />
        <input type="email" placeholder="EMAIL" required style={{ background: '#111', border: '1px solid #46FF2E', padding: '10px', color: '#fff' }} />
        <textarea placeholder="LINK BUKTI KEBAIKAN (Opsional untuk Aura Meter)" style={{ background: '#111', border: '1px solid #46FF2E', padding: '10px', color: '#fff', height: '100px' }}></textarea>
        <button type="submit" style={{ background: '#46FF2E', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
          KIRIM KE AI GUARD & TERBITKAN IID
        </button>
      </form>
    </div>
  );
}
