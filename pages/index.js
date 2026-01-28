import React, { useState, useEffect } from 'react';

export default function LandingPage() {
  const [citizenCount, setCitizenCount] = useState(1250);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target Kickoff: 1 Februari 2026
    const targetDate = new Date("February 1, 2026 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
      
      if (distance < 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const shareToWhatsApp = () => {
    const text = "Saya baru saja mengklaim hak kedaulatan saya di NeuroSphere. Distribusi €100.000 dimulai 1 Februari! Scan & Klaim milikmu: https://indienation-neurosphere.vercel.app";
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'monospace', textAlign: 'center', padding: '20px' }}>
      <h2 style={{ color: '#39ff14', fontSize: '0.8rem', letterSpacing: '5px' }}>NEUROSPHERE GENESIS</h2>
      <h1 style={{ fontSize: '2.5rem', margin: '20px 0', fontWeight: 'bold' }}>INDIE-NATION</h1>
      
      <div style={{ margin: '30px 0', border: '1px solid #333', padding: '20px', borderRadius: '15px' }}>
        <p style={{ fontSize: '0.7rem', color: '#39ff14', marginBottom: '10px' }}>DISTRIBUSI €100.000 DIMULAI DALAM:</p>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>
          {timeLeft.days}H : {timeLeft.hours}J : {timeLeft.minutes}M : {timeLeft.seconds}D
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '0.7rem', color: '#39ff14' }}>CITIZENS JOINED:</p>
        <div style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>{citizenCount.toLocaleString()}</div>
      </div>

      <button onClick={() => window.location.href='/dashboard'} style={{ backgroundColor: '#39ff14', color: '#000', border: 'none', padding: '18px 35px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer', marginBottom: '20px', width: '280px' }}>
        KLAIM HAK SAYA
      </button>

      <button onClick={shareToWhatsApp} style={{ backgroundColor: 'transparent', color: '#25D366', border: '2px solid #25D366', padding: '15px 30px', fontSize: '0.9rem', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer', width: '280px' }}>
        BAGIKAN (1 KE 100)
      </button>
    </div>
  );
}
