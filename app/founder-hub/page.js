"use client";
import { useState } from 'react';

export default function FounderHub() {
  const [status, setStatus] = useState("SYSTEM STANDBY");
  const [stats, setStats] = useState({
    citizens: 3,
    totalStable: "€300,000",
    donationPool: "15% READY"
  });

  const triggerDisasterRelief = () => {
    if(confirm("AKTIFKAN DISTRIBUSI DARURAT DARI DONATION POOL?")) {
      setStatus("DISPATCHING AID... PROTOCOL 15% ACTIVE");
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#000', minHeight: '100vh', color: '#46FF2E', fontFamily: 'monospace' }}>
      <h1 style={{ borderBottom: '2px solid #46FF2E', paddingBottom: '10px' }}>◈ NEUROSPHERE FOUNDER HUB ◈</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '30px' }}>
        <div style={{ border: '1px solid #46FF2E', padding: '20px', borderRadius: '10px' }}>
          <h3>TOTAL CITIZENS</h3>
          <p style={{ fontSize: '24px' }}>{stats.citizens} / 1,000,000</p>
        </div>
        <div style={{ border: '1px solid #46FF2E', padding: '20px', borderRadius: '10px' }}>
          <h3>LIVING VALUE DISTRIBUTED</h3>
          <p style={{ fontSize: '24px' }}>{stats.totalStable}</p>
        </div>
        <div style={{ border: '1px solid #FFD700', padding: '20px', borderRadius: '10px', color: '#FFD700' }}>
          <h3>DONATION POOL (15%)</h3>
          <p style={{ fontSize: '24px' }}>{stats.donationPool}</p>
        </div>
      </div>

      <div style={{ marginTop: '50px', padding: '20px', border: '1px dashed #FF2E2E', borderRadius: '10px' }}>
        <h2 style={{ color: '#FF2E2E' }}>EMERGENCY PROTOCOL</h2>
        <p>Akses cepat distribusi dana bencana dari alokasi Team & Developer (15%).</p>
        <button 
          onClick={triggerDisasterRelief}
          style={{ backgroundColor: '#FF2E2E', color: '#fff', border: 'none', padding: '15px 30px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ACTIVATE DISASTER RELIEF
        </button>
      </div>

      <div style={{ marginTop: '30px', color: '#888' }}>
        SYSTEM STATUS: <span style={{ color: '#46FF2E' }}>{status}</span>
      </div>
    </div>
  );
}
