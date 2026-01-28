import React, { useState } from 'react';

export default function TMWallet({ balances }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', fontFamily: 'monospace', padding: '20px' }}>
      
      {/* IDENTITAS MURNI */}
      <div style={{ color: '#00ff41', fontSize: '1.4rem', letterSpacing: '5px', marginTop: '20px', fontWeight: 'bold' }}>
        INDIE-Founder
      </div>

      {/* THE ORB - PENUH WARNA KEBAIKAN (TANPA TEKS) */}
      <div 
        onClick={() => setShowQR(!showQR)}
        style={{
          width: '280px', height: '280px', borderRadius: '50%',
          background: showQR ? '#fff' : 'radial-gradient(circle, #39ff14 0%, #008000 80%, #000 100%)',
          boxShadow: '0 0 60px #39ff1444',
          margin: '40px 0', cursor: 'pointer', transition: 'all 0.5s ease',
          display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
          border: '1px solid #39ff1433'
        }}>
        {showQR && (
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=IID-FOUNDER-VAULT-01-02-03" alt="QR" />
        )}
      </div>

      {/* SALDO RAPI & ELEGAN */}
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '380px' }}>
        <p style={{ color: '#00ff41', fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '10px' }}>TOTAL LIVING VALUE IDENTITY</p>
        <div style={{ fontSize: '3.2rem', fontWeight: 'bold', marginBottom: '40px' }}>
          € {balances?.total || "0"}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ padding: '20px', border: '1px solid #1a1a1a', borderRadius: '12px', background: '#050505' }}>
            <p style={{ color: '#fbbf24', fontSize: '0.7rem', marginBottom: '10px' }}>IND-EUR</p>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{balances?.stable || "0.00"}</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #1a1a1a', borderRadius: '12px', background: '#050505' }}>
            <p style={{ color: '#00ff41', fontSize: '0.7rem', marginBottom: '10px' }}>ENPE</p>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{balances?.enpe || "0"}</p>
          </div>
        </div>

        <div style={{ marginTop: '15px', padding: '20px', border: '1px solid #1a1a1a', borderRadius: '12px', background: '#050505' }}>
          <p style={{ color: '#ff00ff', fontSize: '0.7rem', marginBottom: '10px' }}>AURA REWARD (LUV)</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{balances?.luv || "0"} LUV</p>
        </div>
      </div>

      {/* LINK SERTIFIKAT KONFIRMASI SAH */}
      <div style={{ marginTop: 'auto', padding: '40px 0', textAlign: 'center' }}>
        <a 
          href="mailto:confirm@indienation.io?subject=SAH_CERTIFICATE_CLAIM&body=VERIFY_FOUNDER_VAULT" 
          style={{ color: '#00ff41', textDecoration: 'none', border: '1px solid #00ff41', padding: '10px 20px', borderRadius: '5px', fontSize: '0.8rem' }}>
          PUSH TO EMAIL (SAH CERTIFICATE)
        </a>
      </div>
    </div>
  );
}
