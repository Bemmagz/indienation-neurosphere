import React, { useState } from 'react';
import SovereignCertificate from '../components/SovereignCertificate';

export default function Dashboard() {
  const [lang, setLang] = useState('ID');
  const languages = ['ID', 'ENG', 'AR'];

  const t = {
    ID: { status: "STATUS SISTEM", stats: "STATISTIK GLOBAL", logs: "LOG AI GUARD" },
    ENG: { status: "SYSTEM STATUS", stats: "GLOBAL STATISTICS", logs: "AI GUARD LOGS" },
    AR: { status: "حالة النظام", stats: "الإحصائيات العالمية", logs: "سجلات الحارس الذكي" }
  }[lang];

  const cycleLang = () => {
    setLang(languages[(languages.indexOf(lang) + 1) % 3]);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      
      {/* HEADER DENGAN BOLA DUNIA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #46FF2E', paddingBottom: '10px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '18px', margin: 0 }}>NEUROSPHERE ◈ CONTROL ROOM</h1>
        <div onClick={cycleLang} style={{ cursor: 'pointer', fontSize: '24px', border: '1px solid #46FF2E', padding: '5px 15px', borderRadius: '20px', background: '#111' }}>
          🌍 <span style={{ fontSize: '14px' }}>{lang}</span>
        </div>
      </div>

      {/* GRID SISTEM: 1 HALAMAN SEMUA ADA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        
        {/* KOLOM 1: SERTIFIKAT (Wujud Kedaulatan) */}
        <section>
          <SovereignCertificate data={{ alias: "Supreme Founder", identity: "0000000001", aura_score: 100 }} />
        </section>

        {/* KOLOM 2: STATISTIK EKOSISTEM */}
        <section style={{ border: '1px solid #46FF2E', padding: '20px', backgroundColor: '#050505', boxShadow: 'inset 0 0 10px #46FF2E' }}>
          <h3 style={{ color: '#FFD700' }}>◈ {t.stats}</h3>
          <div style={{ marginTop: '20px' }}>
            <p>Pioneer Target: 1.000.000</p>
            <div style={{ width: '100%', background: '#222', height: '10px', border: '1px solid #46FF2E' }}>
              <div style={{ width: '0.1%', background: '#46FF2E', height: '100%' }}></div>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <p>Donation Pool (15%): €15T (Ready) [cite: 2025-12-20]</p>
            <p>Circulating ENPE: 100 Trillion E-Coin</p>
            <p>Status: **Sovereign & Debt-Free**</p>
          </div>
        </section>

        {/* KOLOM 3: LOG REAL-TIME AI GUARD */}
        <section style={{ border: '1px solid #46FF2E', padding: '20px', backgroundColor: '#050505' }}>
          <h3 style={{ color: '#FFD700' }}>◈ {t.logs}</h3>
          <ul style={{ fontSize: '12px', listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li>[✓] AI GUARD: ONLINE</li>
            <li>[✓] LANGUAGE SYNC: {lang}</li>
            <li>[✓] AURA FILTER: ACTIVE</li>
            <li>[!] WAITING FOR FIRST CITIZEN...</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
