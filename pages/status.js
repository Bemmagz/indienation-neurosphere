import React, { useState, useEffect } from 'react';

export default function SystemStatus() {
  const [claims, setClaims] = useState(0);
  
  useEffect(() => {
    // Simulasi data real-time (bisa dihubungkan ke database nantinya)
    setClaims(Math.floor(Math.random() * 500) + 1200);
  }, []);

  const statusStyle = {
    backgroundColor: '#000', color: '#0f0', height: '100vh',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', fontFamily: 'monospace', textAlign: 'center'
  };

  return (
    <div style={statusStyle}>
      <h1 style={{ color: '#00ffff', letterSpacing: '5px' }}>NEUROSPHERE SYSTEM STATUS</h1>
      <hr style={{ width: '60%', borderColor: '#333' }} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
        <div style={{ border: '1px solid #0f0', padding: '20px' }}>
          <h3>DISTRIBUTION</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{claims.toLocaleString()} / 1,000,000</p>
          <p style={{ fontSize: '0.7rem' }}>LUV CLAIMS ACTIVE</p>
        </div>
        
        <div style={{ border: '1px solid #ff00ff', padding: '20px' }}>
          <h3>DONATION POOL</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff00ff' }}>OPEN</p>
          <p style={{ fontSize: '0.7rem' }}>15% READY FOR DISASTER [cite: 2025-12-20]</p>
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'left', fontSize: '0.8rem', opacity: 0.7 }}>
        <p>• FOUNDER ALLOCATION: LOCKED (3 YEARS) [cite: 2025-12-20]</p>
        <p>• ENPE NATIVE ASSETS: LOCKED (2 YEARS) [cite: 2025-12-20]</p>
        <p>• TECHNOLOGY MONEY IDENTITY: ACTIVE [cite: 2025-12-23]</p>
      </div>

      <button onClick={() => window.location.href='/'} style={{ marginTop: '30px', padding: '10px 20px', background: '#00ffff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
        BACK TO GATE
      </button>
    </div>
  );
}
