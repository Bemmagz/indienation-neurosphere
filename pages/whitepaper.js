import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Globe, Zap, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import AIGuard from '../components/AIGuard';

export default function Whitepaper() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('VISION');

  const content = {
    VISION: "NeuroSphere bukan sekadar teknologi, melainkan 'Digital Nation Operating System'. Kami mengganti hutang dengan kedaulatan, dan kelangkaan dengan distribusi nilai hidup (Living Value).",
    ECONOMY: "Technology Money (TM) terdiri dari 3 dialek: ENPE (Mesin Produksi), LUV (Reputasi Sosial), dan IND-EUR (Jangkar Nilai Stabil €100.000).",
    SECURITY: "Setiap warga negara dilindungi oleh AI Guard dan enkripsi Biometrik SHA-256. Identitas Anda adalah kunci kedaulatan Anda sendiri.",
    ROADMAP: "2026: Genesis & Distribution. 2027: Aura Rewards (LUV) Launch. 2029: 100% AI Guard Independence (Autonomy Mode)."
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'serif' }}>
      <AIGuard context="DASHBOARD" />
      
      <header style={{ textAlign: 'center', padding: '40px 0', borderBottom: '1px solid #111' }}>
        <BookOpen size={40} color="#00ff41" style={{ marginBottom: '15px' }} />
        <h1 style={{ letterSpacing: '5px', fontSize: '1.8rem' }}>THE NEUROSPHERE CONSTITUTION</h1>
        <p style={{ color: '#00ff41', fontSize: '0.7rem' }}>VERSI 1.0.1 - SOVEREIGN DOCUMENT</p>
      </header>

      <main style={{ maxWidth: '800px', margin: '30px auto' }}>
        {/* TAB NAVIGATION */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px', overflowX: 'auto', gap: '10px' }}>
          {Object.keys(content).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ background: 'none', border: 'none', color: activeTab === tab ? '#00ff41' : '#444', borderBottom: activeTab === tab ? '2px solid #00ff41' : 'none', padding: '10px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT DISPLAY */}
        <div style={{ background: '#000', padding: '30px', borderRadius: '15px', border: '1px solid #111', minHeight: '300px', lineHeight: '1.8' }}>
          <h2 style={{ color: '#00ff41', marginBottom: '20px' }}>◈ {activeTab}</h2>
          <p style={{ fontSize: '1.1rem', color: '#ccc' }}>{content[activeTab]}</p>
        </div>

        <div style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #222', textAlign: 'center' }}>
            <ShieldCheck size={30} style={{ marginBottom: '10px' }} />
            <p style={{ fontSize: '0.7rem' }}>IMMUTABLE LAW</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #222', textAlign: 'center' }}>
            <Globe size={30} style={{ marginBottom: '10px' }} />
            <p style={{ fontSize: '0.7rem' }}>GLOBAL JURISDICTION</p>
          </div>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px 0' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: '1px solid #444', color: '#444', padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto' }}>
          <ArrowLeft size={16} /> RETURN
        </button>
      </footer>
    </div>
  );
}
