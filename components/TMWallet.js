import React, { useState, useEffect } from 'react';
import { QrCode, ShieldCheck } from 'lucide-react';

export default function TMWallet({ auraValue = 50, balances }) {
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
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      
      {/* LEDGER HEADER */}
      <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '20px', letterSpacing: '2px' }}>
        LEDGER_HASH: INDIE-F-{Math.random().toString(16).slice(2, 15)}
      </div>

      {/* THE ORB - DYNAMIC AURA */}
      <div 
        onClick={() => setShowQR(!showQR)}
        style={{
          width: '320px', height: '320px', borderRadius: '50%',
          background: showQR ? '#fff' : 'radial-gradient(circle, #0b3d0b 0%, #000 85%)',
          border: '2px solid #00ff41',
          boxShadow: '0 0 50px #00ff4144',
          animation: `pulse ${pulseSpeed} infinite alternate`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.5s ease', position: 'relative'
        }}>
        
        {!showQR ? (
          <>
            <h3 style={{ fontSize: '0.7rem', letterSpacing: '4px' }}>TOTAL TM</h3>
            <h1 style={{ fontSize: '2.5rem', color: '#fff', margin: '10px 0' }}>{balances?.total || "€ 0.00"}</h1>
            <div style={{ fontSize: '0.8rem', textAlign: 'center' }}>
              <p style={{ color: '#fbbf24' }}>IND-EUR: {balances?.stable || "0.00"}</p>
              <p style={{ color: '#00ff41' }}>ENPE: {balances?.enpe || "0"}</p>
              <p style={{ color: '#ff00ff' }}>LUV: {balances?.luv || "0"}</p>
            </div>
            <div style={{ position: 'absolute', bottom: '40px', fontSize: '10px', opacity: 0.6 }}>
              {timestamp}
            </div>
            <QrCode size={20} style={{ position: 'absolute', bottom: '15px' }} />
          </>
        ) : (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=INDIENATION-VAL:${balances?.total}-FOUNDER`} 
              alt="QR TM" 
            />
            <p style={{ color: '#000', fontSize: '10px', marginTop: '10px', fontWeight: 'bold' }}>SCAN TO VERIFY SOVEREIGNTY</p>
          </div>
        )}
      </div>

      {/* FOUNDER SIGNATURE */}
      <div style={{ marginTop: '40px', borderTop: '1px solid #00ff41', paddingTop: '10px', textAlign: 'center' }}>
        <p style={{ fontSize: '9px', opacity: 0.5 }}>DIGITAL SIGNATURE VERIFIED</p>
        <h2 style={{ fontSize: '1.5rem', color: '#fff', fontStyle: 'italic', letterSpacing: '5px' }}>INDIE-Founder</h2>
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
