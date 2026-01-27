import React from 'react';
import { Heart, Shield, Zap, ArrowLeft, Activity } from 'lucide-react';
import { useRouter } from 'next/router';
import AIGuard from '../components/AIGuard';

export default function Treasury() {
  const router = useRouter();

  const funds = [
    { name: "RESERVE & OPERATIONS (10%)", amount: "10,000,000,000,000 E", status: "OPEN - LIQUID", color: "#00ff41" },
    { name: "HUMANITY DONATION POOL (15%)", amount: "15,000,000,000,000 E", status: "READY FOR DISASTER", color: "#ff4141" },
    { name: "PIONEER REWARDS (LUV)", amount: "1,000,000,000,000 LUV", status: "LOCKED UNTIL 2027", color: "#ff00ff" }
  ];

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <AIGuard context="DASHBOARD" />
      
      <header style={{ textAlign: 'center', margin: '30px 0' }}>
        <Shield size={40} color="#00ff41" style={{ marginBottom: '10px' }} />
        <h2 style={{ letterSpacing: '4px' }}>◈ NEUROSPHERE TREASURY ◈</h2>
        <p style={{ fontSize: '0.6rem', color: '#888' }}>TRANSPARENT SOVEREIGN WEALTH</p>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        {funds.map((fund, idx) => (
          <div key={idx} style={{ border: '1px solid #222', background: '#050505', padding: '20px', borderRadius: '15px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: fund.color }}>● {fund.status}</span>
              <Activity size={14} color="#333" />
            </div>
            <h4 style={{ margin: '10px 0', fontSize: '0.9rem', color: '#888' }}>{fund.name}</h4>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '1.4rem' }}>{fund.amount}</h2>
          </div>
        ))}

        <div style={{ marginTop: '30px', padding: '20px', border: '1px dashed #444', borderRadius: '15px', textAlign: 'center' }}>
          <Heart size={30} color="#ff4141" style={{ marginBottom: '10px' }} />
          <p style={{ fontSize: '0.8rem', lineHeight: '1.6', color: '#ccc' }}>
            "Alokasi 15% Donation Pool didedikasikan untuk bantuan bencana alam dan aksi sosial global secara instan."
          </p>
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'none', border: '1px solid #444', color: '#444', padding: '12px 25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto' }}>
          <ArrowLeft size={16} /> RETURN TO CONTROL
        </button>
      </footer>
    </div>
  );
}
