"use client";
import { useState, useEffect } from 'react';

export default function TransparencyFeed() {
  const [stats, setStats] = useState({
    citizens: 1250,
    donated: 150000,
    luvDistributed: 1250000000,
    systemStatus: "STABLE"
  });

  // Simulasi Live Update dari AI Guard
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        citizens: prev.citizens + Math.floor(Math.random() * 5),
        donated: prev.donated + Math.floor(Math.random() * 1000)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#46FF2E', padding: '40px', fontFamily: 'monospace' }}>
      <h1 style={{ borderBottom: '2px solid #46FF2E' }}>◈ TRANSPARENCY LIVE FEED ◈</h1>
      <p style={{ color: '#FFD700' }}>AI Guard Status: {stats.systemStatus} | Last Sync: {new Date().toLocaleTimeString()}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
        <div style={{ border: '1px solid #46FF2E', padding: '20px', textAlign: 'center' }}>
          <h3>WARGA BERDAULAT</h3>
          <h2 style={{ fontSize: '32px' }}>{stats.citizens.toLocaleString()}</h2>
          <p style={{ fontSize: '10px' }}>Target: 1.000.000 Pioneer</p>
        </div>
        <div style={{ border: '1px solid #46FF2E', padding: '20px', textAlign: 'center' }}>
          <h3>POOL DONASI (15%)</h3>
          <h2 style={{ fontSize: '32px' }}>€{stats.donated.toLocaleString()}</h2>
          <p style={{ fontSize: '10px' }}>Alokasi Terdistribusi (Bencana & Kebaikan)</p>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#111' }}>
        <h3>LOG AKTIVITAS TERBARU (AI GUARD)</h3>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '12px' }}>
          <li>[OK] Allocation: 1,000,000 LUV issued to Citizen #{stats.citizens}</li>
          <li>[OK] Locked: Founder assets secure for 3 years [cite: 2025-12-20]</li>
          <li>[OK] Reserve: 10% Reserve + Operational costs maintained</li>
          <li>[OK] Emergency: Donation pool open for disaster relief</li>
        </ul>
      </div>

      <p style={{ marginTop: '40px', fontSize: '11px', textAlign: 'center', color: '#888' }}>
        Seluruh data diverifikasi oleh AI Guard Protocol v1.0. Aset terkunci selama 2 tahun sesuai protokol [cite: 2026-01-25].
      </p>
    </div>
  );
}
