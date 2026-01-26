"use client";

export default function Transparency() {
  const stats = {
    totalCitizens: 3,
    donationPool: "15%",
    founderLock: "Locked until 2029",
    livingValueBase: "€100,000 per Citizen"
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#000', minHeight: '100vh', color: '#46FF2E', fontFamily: 'monospace', textAlign: 'center' }}>
      <h1 style={{ letterSpacing: '5px', textShadow: '0 0 10px #46FF2E' }}>◈ NEUROSPHERE TRANSPARENCY ◈</h1>
      <p style={{ color: '#888', marginBottom: '40px' }}>Real-time Governance & Sovereign Wealth Status</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1000px', margin: 'auto' }}>
        <div style={{ border: '1px solid #46FF2E', padding: '30px', borderRadius: '20px', background: 'rgba(70, 255, 46, 0.05)' }}>
          <h3 style={{ color: '#888', fontSize: '12px' }}>DONATION POOL (RESERVE)</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.donationPool}</div>
          <p style={{ fontSize: '10px', marginTop: '10px' }}>Allocated for Emergency & Disaster Relief</p>
        </div>

        <div style={{ border: '1px solid #FFD700', padding: '30px', borderRadius: '20px', background: 'rgba(255, 215, 0, 0.05)' }}>
          <h3 style={{ color: '#888', fontSize: '12px' }}>FOUNDER STATUS</h3>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFD700' }}>{stats.founderLock}</div>
          <p style={{ fontSize: '10px', marginTop: '10px' }}>Integrity Lock for Ecosystem Stability</p>
        </div>

        <div style={{ border: '1px solid #46FF2E', padding: '30px', borderRadius: '20px' }}>
          <h3 style={{ color: '#888', fontSize: '12px' }}>LIVING VALUE ANCHOR</h3>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{stats.livingValueBase}</div>
          <p style={{ fontSize: '10px', marginTop: '10px' }}>Guaranteed Stable Coin Allocation</p>
        </div>
      </div>

      <div style={{ marginTop: '50px', fontSize: '12px', color: '#555' }}>
        <p>Verified by AI Guard Protocol v1.0</p>
        <p>© 2026 INDIENATION NEUROSPHERE</p>
      </div>
    </div>
  );
}
