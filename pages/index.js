import React, { useState, useEffect } from 'react';

export default function LandingPage() {
  const [citizenCount, setCitizenCount] = useState(1250); // Angka awal simulasi

  const shareToWhatsApp = () => {
    const text = "Saya baru saja mengklaim hak kedaulatan saya sebesar € 100.000 di NeuroSphere. Cukup scan dan klaim milikmu sekarang! Sah & Terverifikasi: https://indienation-neurosphere.vercel.app";
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'monospace', textAlign: 'center', padding: '20px' }}>
      
      <div style={{ zIndex: 1 }}>
        <h2 style={{ color: '#39ff14', fontSize: '0.8rem', letterSpacing: '5px' }}>NEUROSPHERE GENESIS</h2>
        <h1 style={{ fontSize: '2.5rem', margin: '20px 0', fontWeight: 'bold' }}>INDIE-NATION</h1>
        
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.7rem', color: '#39ff14' }}>CITIZENS JOINED:</p>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>{citizenCount.toLocaleString()}</div>
        </div>

        <button 
          onClick={() => window.location.href='/dashboard'}
          style={{ backgroundColor: '#39ff14', color: '#000', border: 'none', padding: '18px 35px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer', marginBottom: '20px', width: '100%' }}>
          KLAIM € 100.000 SEKARANG
        </button>

        <button 
          onClick={shareToWhatsApp}
          style={{ backgroundColor: 'transparent', color: '#25D366', border: '2px solid #25D366', padding: '15px 30px', fontSize: '0.9rem', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer', width: '100%' }}>
          BAGIKAN KE WHATSAPP (1 KE 100)
        </button>

        <p style={{ marginTop: '40px', fontSize: '0.6rem', opacity: 0.5 }}>IDENTITAS ANDA ADALAH KEDAULATAN ANDA</p>
      </div>
    </div>
  );
}
