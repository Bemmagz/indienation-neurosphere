"use client";
import { useState } from 'react';
import SovereignCertificate from '../components/SovereignCertificate';

export default function CitizenDashboard() {
  const [citizenId, setCitizenId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const mockRegistry = {
    "0000000001": { alias: "FOUNDER", identity: "0000000001", tm_identity: { stable: "100.000", luv: "1.000.000", enpe: "1.000" } },
    "0000000002": { alias: "CITIZEN 02", identity: "0000000002", tm_identity: { stable: "100.000", luv: "1.000.000", enpe: "1.000" } }
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (mockRegistry[citizenId]) {
        setUserData(mockRegistry[citizenId]);
      } else {
        alert("Identity ID not found in AI Guard Registry.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#46FF2E', padding: '20px', fontFamily: 'monospace' }}>
      {!userData ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1>◈ NEUROSPHERE ACCESS ◈</h1>
          <input 
            type="text" 
            placeholder="ENTER IDENTITY ID" 
            value={citizenId}
            onChange={(e) => setCitizenId(e.target.value)}
            style={{ padding: '10px', background: '#111', border: '1px solid #46FF2E', color: '#46FF2E', textAlign: 'center' }}
          />
          <br /><br />
          <button onClick={handleLogin} style={{ padding: '10px 20px', background: '#46FF2E', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            {loading ? "VERIFYING..." : "ACCESS IDENTITY"}
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setUserData(null)} style={{ background: 'none', color: '#46FF2E', border: '1px solid #46FF2E', cursor: 'pointer' }}>← EXIT</button>
          <div style={{ marginTop: '20px' }}>
            <SovereignCertificate data={userData} />
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
            Aset TM (ENPE, LUV, STABLE) terkunci oleh AI Guard Protocol [cite: 2026-01-25]
          </p>
        </div>
      )}
    </div>
  );
}
