import React, { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';

export default function TMWallet({ auraValue = 100, balances, txHash }) {
  const [timestamp, setTimestamp] = useState("");
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toISOString().replace('T', ' ').slice(0, 19) + " UTC");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pulseSpeed = Math.max(0.5, 3 - (auraValue / 100)) + 's';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '20px', color: '#00ff41' }}>
        LEDGER_HASH: {txHash || "INDIE-GENESIS"}
      </div>

      <div 
        onClick={() => setShowQR(!showQR)}
        style={{
          width: '320px', height: '320px', borderRadius: '50%',
          background: showQR ? '#fff' : 'radial-gradient(circle, #0b3d0b 0%, #000 85%)',
          border: '2px solid #00ff41',
          boxShadow: '0 0 50px #00ff4144',
          animation: `pulse ${pulseSpeed} infinite alternate`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative', transition: 'all 0.5s ease'
        }}>
        
        {!showQR ? (
          <>
            <h3 style={{ fontSize: '0.7rem', color: '#00ff41', letterSpacing: '4px' }}>TOTAL TM</h3>
            <h1 style={{ fontSize: '2.5rem', color: '#fff', margin: '10px 0' }}>{balances?.total}</h1>
            <div style={{ fontSize: '0.8rem', textAlign: 'center' }}>
              <p style={{ color: '#fbbf24' }}>IND-EUR: {balances?.stable}</p>
              <p style={{ color: '#00ff41' }}>ENPE: {balances?.enpe}</p>
              <p style={{ color: '#ff00ff' }}>LUV: {balances?.luv}</p>
            </div>
            <QrCode size={20} color="#00ff41" style={{ marginTop: '20px', opacity: 0.5 }} />
          </>
        ) : (
          <div style={{ padding: '20px' }}>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=INDIE-VERIFY-${balances?.total}`} alt="QR" />
          </div>
        )}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #00ff4133', paddingTop: '10px' }}>
        <p style={{ fontSize: '9px', color: '#00ff41', opacity: 0.5 }}>DIGITAL SIGNATURE</p>
        <h2 style={{ fontSize: '1.5rem', color: '#fff', fontStyle: 'italic' }}>INDIE-Founder</h2>
      </div>

      <style jsx>{`
        @keyframes pulse {
          from { transform: scale(0.98); box-shadow: 0 0 20px #00ff4122; }
          to { transform: scale(1.02); box-shadow: 0 0 60px #00ff4166; }
        }
      `}</style>
    </div>
  );
}
