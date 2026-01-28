import React, { useState } from 'react';

export default function TMWallet({ balances }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', fontFamily: 'monospace', padding: '20px' }}>
      
      <div style={{ color: '#00ff41', fontSize: '1.2rem', letterSpacing: '5px', marginTop: '20px', fontWeight: 'bold' }}>
        INDIE-Founder
      </div>

      {/* THE ORB - PURITY GRADIENT */}
      <div 
        onClick={() => setShowQR(!showQR)}
        style={{
          width: '260px', height: '260px', borderRadius: '50%',
          background: showQR ? '#fff' : 'radial-gradient(circle, #39ff14 0%, #008000 80%, #000 100%)',
          boxShadow: '0 0 50px #39ff1433',
          margin: '40px 0', cursor: 'pointer', transition: '0.5s',
          display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
        }}>
        {showQR && (
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=FOUNDER-VERIFIED-VAULT-01" alt="QR" />
        )}
      </div>

      <div style={{ textAlign: 'center', width: '100%', maxWidth: '350px' }}>
        <p style={{ color: '#00ff41', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '10px' }}>TOTAL LIVING VALUE IDENTITY</p>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '40px' }}>
          € 100.000
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '10px', background: '#050505' }}>
            <p style={{ color: '#fbbf24', fontSize: '0.65rem', marginBottom: '5px' }}>IND-EUR</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>0.00</p>
          </div>
          <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '10px', background: '#050505' }}>
            <p style={{ color: '#00ff41', fontSize: '0.65rem', marginBottom: '5px' }}>ENPE</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>0</p>
          </div>
        </div>

        <div style={{ marginTop: '15px', padding: '15px', border: '1px solid #1a1a1a', borderRadius: '10px', background: '#050505' }}>
          <p style={{ color: '#ff00ff', fontSize: '0.65rem', marginBottom: '5px' }}>AURA REWARD</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>1.000.000 LUV</p>
        </div>
      </div>

      <button 
        onClick={() => window.location.href='mailto:sah@indienation.io?subject=SAH_CERTIFICATE_CLAIM'}
        style={{ marginTop: 'auto', marginBottom: '20px', backgroundColor: 'transparent', border: '1px solid #00ff41', color: '#00ff41', padding: '10px 20px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
        PUSH TO EMAIL (SAH CERTIFICATE)
      </button>
    </div>
  );
}
