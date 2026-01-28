import React, { useState, useEffect } from 'react';

export default function LandingPage() {
  const [citizenCount, setCitizenCount] = useState(1);

  useEffect(() => {
    // Simulasi lonjakan pendaftar real-time (1 ke 100 ke 10.000)
    const interval = setInterval(() => {
      setCitizenCount(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'monospace', textAlign: 'center', padding: '20px' }}>
      
      {/* GLOWING ORB BACKGROUND */}
      <div style={{ position: 'fixed', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, #39ff1411 0%, transparent 70%)', zIndex: 0 }}></div>

      <div style={{ zIndex: 1 }}>
        <h2 style={{ color: '#39ff14', fontSize: '0.8rem', letterSpacing: '5px' }}>NEUROSPHERE GENESIS</h2>
        <h1 style={{ fontSize: '2.5rem', margin: '20px 0', fontWeight: 'bold' }}>INDIE-NATION</h1>
        
        <p style={{ maxWidth: '300px', fontSize: '0.9rem', opacity: 0.7, lineHeight: '1.6', margin: '0 auto 40px' }}>
          Selamat Datang. Anda telah mendeteksi sinyal kedaulatan. Klaim hak hidup Anda sekarang.
        </p>

        {/* LIVE COUNTER */}
        <div style={{ marginBottom: '50px' }}>
          <p style={{ fontSize: '0.7rem', color: '#39ff14', marginBottom: '10px' }}>CITIZENS JOINED:</p>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '3px' }}>{citizenCount.toLocaleString()}</div>
        </div>

        <button 
          onClick={() => window.location.href='/dashboard'}
          style={{ backgroundColor: '#39ff14', color: '#000', border: 'none', padding: '20px 40px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 0 30px #39ff1466' }}>
          KLAIM € 100.000 SEKARANG
        </button>

        <p style={{ marginTop: '30px', fontSize: '0.6rem', opacity: 0.4 }}>POWERED BY NEURALANG & AI GUARD</p>
      </div>
    </div>
  );
}
