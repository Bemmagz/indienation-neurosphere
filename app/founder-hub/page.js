"use client";
import { useState } from 'react';

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
    
    const newCitizen = { id: newId, alias: newName, key: newKey };
    setCitizens([...citizens, newCitizen]);
    setNewName("");
    setStatus(`CITIZEN ${newId} REGISTERED. LUV ALLOCATED.`);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#000', minHeight: '100vh', color: '#46FF2E', fontFamily: 'monospace' }}>
      <h1 style={{ borderBottom: '2px solid #46FF2E', paddingBottom: '10px' }}>◈ NEUROSPHERE FOUNDER HUB ◈</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
        {/* FORM REGISTRASI */}
        <div style={{ border: '1px solid #46FF2E', padding: '20px', borderRadius: '15px', background: 'rgba(70, 255, 46, 0.05)' }}>
          <h3>REGISTER NEW CITIZEN</h3>
          <p style={{ fontSize: '12px', color: '#888' }}>Allocation: 1M LUV & €100,000 Stable</p>
          <input 
            type="text" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter Citizen Name..."
            style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#111', border: '1px solid #46FF2E', color: '#fff' }}
          />
          <button onClick={addCitizen} style={{ width: '100%', padding: '10px', backgroundColor: '#46FF2E', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>
            GENERATE IDENTITY
          </button>
        </div>

        {/* STATISTIK DARURAT */}
        <div style={{ border: '1px solid #FF2E2E', padding: '20px', borderRadius: '15px' }}>
          <h3 style={{ color: '#FF2E2E' }}>EMERGENCY PROTOCOL (15%)</h3>
          <p style={{ fontSize: '12px' }}>Donation Pool status: OPEN & READY</p>
          <button style={{ width: '100%', padding: '15px', backgroundColor: '#FF2E2E', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            ACTIVATE DISASTER RELIEF
          </button>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>ACTIVE REGISTRY (RECENT)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #46FF2E', textAlign: 'left' }}>
              <th>ID</th>
              <th>ALIAS</th>
              <th>SECRET KEY</th>
              <th>LINK</th>
            </tr>
          </thead>
          <tbody>
            {citizens.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #222' }}>
                <td style={{ padding: '10px 0' }}>{c.id}</td>
                <td>{c.alias}</td>
                <td>{c.key}</td>
                <td><a href={`/?iid=${c.id}&key=${c.key}`} style={{ color: '#46FF2E', fontSize: '10px' }}>VIEW CARD</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '30px', fontSize: '12px', color: '#888' }}>
        STATUS: <span style={{ color: '#46FF2E' }}>{status}</span>
      </div>
    </div>
  );
}
