"use client";
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function FounderHub() {
  const [citizens, setCitizens] = useState([
    { id: "0000000002", alias: "Citizen 02", key: "NEURO-FIRST-2026" },
    { id: "0000000003", alias: "Citizen 03", key: "NEURO-EXPAND-2026" }
  ]);
  const [newName, setNewName] = useState("");
  const [status, setStatus] = useState("SYSTEM READY");

  const addCitizen = () => {
    if (!newName) return;
    const newId = String(citizens.length + 2).padStart(10, '0');
    const newKey = `NEURO-${newName.toUpperCase().replace(/\s+/g, '-')}-2026`;
    setCitizens([...citizens, { id: newId, alias: newName, key: newKey }]);
    setNewName("");
    setStatus(`QR GENERATED FOR ${newId}. WALKING WALLET READY.`);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#000', minHeight: '100vh', color: '#46FF2E', fontFamily: 'monospace' }}>
      <h1 style={{ borderBottom: '2px solid #46FF2E', paddingBottom: '10px' }}>◈ NEUROSPHERE FOUNDER HUB (QR COMMAND) ◈</h1>
      
      <div style={{ border: '1px solid #46FF2E', padding: '20px', borderRadius: '15px', background: 'rgba(70, 255, 46, 0.05)', marginBottom: '30px' }}>
        <h3>GENERATE WALKING WALLET</h3>
        <input 
          type="text" value={newName} onChange={(e) => setNewName(e.target.value)}
          placeholder="Citizen Name..."
          style={{ width: '70%', padding: '10px', background: '#111', border: '1px solid #46FF2E', color: '#fff' }}
        />
        <button onClick={addCitizen} style={{ width: '28%', marginLeft: '2%', padding: '10px', backgroundColor: '#46FF2E', color: '#000', fontWeight: 'bold' }}>
          ACTIVATE QR
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {citizens.map((c) => {
          const accessUrl = `https://indienation-neurosphere.vercel.app/?iid=${c.id}&key=${c.key}`;
          return (
            <div key={c.id} style={{ border: '1px solid #333', padding: '20px', borderRadius: '15px', textAlign: 'center', background: '#0a0a0a' }}>
              <div style={{ background: '#fff', padding: '10px', display: 'inline-block', borderRadius: '10px', marginBottom: '10px' }}>
                <QRCodeSVG value={accessUrl} size={120} />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{c.alias}</div>
              <div style={{ fontSize: '10px', color: '#888' }}>ID: {c.id}</div>
              <a href={accessUrl} style={{ color: '#46FF2E', fontSize: '10px', display: 'block', marginTop: '10px' }}>ACCESS DASHBOARD</a>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '30px', fontSize: '12px', color: '#888' }}>
        STATUS: <span style={{ color: '#46FF2E' }}>{status}</span>
      </div>
    </div>
  );
}
