import React, { useState } from 'react';

export default function TMWallet({ balances }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', fontFamily: 'monospace', padding: '20px' }}>
      
      {/* IDENTITAS */}
      <div style={{ color: '#00ff41', fontSize: '1.2rem', letterSpacing: '4px', marginTop: '10px', fontWeight: 'bold' }}>
        INDIE-Founder
      </div>

      {/* THE ORB - AURA MURNI (CLICK TO REVEAL QR) */}
      <div 
        onClick={() => setShowQR(!showQR)}
        style={{
          width: '240px', height: '240px', borderRadius: '50%',
          background: showQR ? '#fff' : 'radial-gradient(circle, #39ff14 0%, #008000 85%, #000 100%)',
          boxShadow: '0 0 40px #39ff1433',
          margin: '30px 0', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
        }}>
        {showQR && (
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=FOUNDER-VALID-TX-0102030405" alt="QR VERIFIED" />
        )}
      </div>

      {/* SALDO & LIVING VALUE */}
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '320px' }}>
        <p style={{ color: '#00ff41', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '5px' }}>TOTAL LIVING VALUE IDENTITY</p>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '30px' }}>
          € {balances?.total || "0"}
        </div>

        {/* KOIN LOGIC - RAPIH */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '8px', background: '#050505' }}>
            <p style={{ color: '#fbbf24', fontSize: '0.65rem', marginBottom: '5px' }}>IND-EUR</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{balances?.stable || "0.00"}</p>
          </div>
          <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '8px', background: '#050505' }}>
            <p style={{ color: '#00ff41', fontSize: '0.65rem', marginBottom: '5px' }}>ENPE</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{balances?.enpe || "0"}</p>
          </div>
        </div>

        <div style={{ marginTop: '15px', padding: '15px', border: '1px solid #1a1a1a', borderRadius: '8px', background: '#050505' }}>
          <p style={{ color: '#ff00ff', fontSize: '0.65rem', marginBottom: '5px' }}>AURA REWARD (LUV)</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{balances?.luv || "0"} LUV</p>
        </div>
      </div>

      {/* JALUR SERTIFIKAT */}
      <button 
        onClick={() => window.location.href='mailto:sah@indienation.io?subject=CONFIRM_SAH_FOUNDER'}
        style={{ marginTop: 'auto', marginBottom: '20px', backgroundColor: 'transparent', border: '1px solid #00ff41', color: '#00ff41', padding: '10px 20px', cursor: 'pointer', fontSize: '0.75rem' }}>
        PUSH TO EMAIL (SAH CERTIFICATE)
      </button>

      <style jsx>{`
        @keyframes pulse {
          from { transform: scale(0.98); opacity: 0.8; }
          to { transform: scale(1.02); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
