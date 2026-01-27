import React, { useState, useEffect } from 'react';
import { Eye, Terminal, Activity, Server, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/router';
import AIGuard from '../components/AIGuard';

export default function AdminPanel() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ users: 1240, txs: 5820, volume: 852900 });

  // Simulasi Live Traffic Feed
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ["NEW_CITIZEN_CLAIM", "VALUE_SWAP_ENPE", "LUV_REWARD_DIST", "BIOMETRIC_AUTH"];
      const newLog = {
        id: Math.random().toString(16).slice(2, 8).toUpperCase(),
        action: actions[Math.floor(Math.random() * actions.length)],
        timestamp: new Date().toLocaleTimeString()
      };
      setLogs(prev => [newLog, ...prev.slice(0, 5)]);
      setStats(prev => ({
        ...prev,
        users: prev.users + (Math.random() > 0.7 ? 1 : 0),
        txs: prev.txs + 1
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <AIGuard context="DASHBOARD" />
      
      <header style={{ borderBottom: '1px solid #00ff41', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, letterSpacing: '4px' }}>◈ NEURO-COMMAND-CENTER</h2>
          <p style={{ fontSize: '0.6rem', color: '#888' }}>FOUNDER ACCESS ONLY | ENCRYPTED SESSION</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Server size={24} />
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '30px' }}>
        <div style={{ border: '1px solid #222', padding: '15px', borderRadius: '10px' }}>
          <p style={{ fontSize: '0.6rem', color: '#888' }}>TOTAL CITIZENS</p>
          <h2 style={{ margin: 0 }}>{stats.users.toLocaleString()}</h2>
        </div>
        <div style={{ border: '1px solid #222', padding: '15px', borderRadius: '10px' }}>
          <p style={{ fontSize: '0.6rem', color: '#888' }}>LIVE TRANSACTIONS</p>
          <h2 style={{ margin: 0 }}>{stats.txs.toLocaleString()}</h2>
        </div>
        <div style={{ border: '1px solid #222', padding: '15px', borderRadius: '10px' }}>
          <p style={{ fontSize: '0.6rem', color: '#888' }}>SYSTEM UPTIME</p>
          <h2 style={{ margin: 0 }}>99.99%</h2>
        </div>
      </main>

      <section style={{ border: '1px solid #222', background: '#050505', padding: '20px', borderRadius: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <Activity size={16} />
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>LIVE TRANSACTION FEED</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {logs.map(log => (
            <div key={log.id} style={{ fontSize: '0.7rem', borderLeft: '2px solid #00ff41', paddingLeft: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <span>[{log.timestamp}] <span style={{ color: '#fff' }}>ID:{log.id}</span> - {log.action}</span>
              <span style={{ color: '#888' }}>SUCCESS</span>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '40px', textAlign: 'center' }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: '#00ff41', color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>
          EXIT ADMIN MODE
        </button>
      </footer>
    </div>
  );
}
