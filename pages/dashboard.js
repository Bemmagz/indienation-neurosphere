import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, ShieldCheck, LogOut } from 'lucide-react';
import AIGuard from '../components/AIGuard';

export default function Dashboard() {
  const [prices, setPrices] = useState({ enpe: 0.082, luv: 1.25, indeur: 42050 });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = {
        enpe: (0.08 + Math.random() * 0.01).toFixed(4),
        luv: (1.20 + Math.random() * 0.1).toFixed(2),
        indeur: (42000 + Math.random() * 500).toFixed(0)
      };
      setPrices(newPrice);
      setHistory(prev => [...prev.slice(-15), { time: Date.now(), val: parseFloat(newPrice.enpe) }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', fontFamily: 'monospace', padding: '20px' }}>
      <AIGuard context="DASHBOARD" />
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <ShieldCheck size={30} />
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.6rem', color: '#888' }}>SOVEREIGN ID</p>
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>FOUNDER-001</p>
        </div>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <div style={{ border: '1px solid #222', padding: '15px', borderRadius: '10px', background: '#050505' }}>
          <p style={{ fontSize: '0.6rem', color: '#888' }}>ENPE / USDT</p>
          <h3 style={{ color: '#fff' }}>${prices.enpe}</h3>
        </div>
        <div style={{ border: '1px solid #222', padding: '15px', borderRadius: '10px', background: '#050505' }}>
          <p style={{ fontSize: '0.6rem', color: '#888' }}>LUV / USDT</p>
          <h3 style={{ color: '#ff00ff' }}>${prices.luv}</h3>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 0', border: '2px double #00ff41' }}>
        <p style={{ color: '#888' }}>TOTAL LIVING VALUE IDENTITY</p>
        <h1 style={{ fontSize: '2.5rem', color: '#fff' }}>€ 100.000</h1>
      </div>

      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#050505', display: 'flex', justifyContent: 'space-around', padding: '20px', borderTop: '1px solid #222' }}>
        <TrendingUp size={24} />
        <Wallet size={24} onClick={() => window.location.href='/enroll'} />
        <LogOut size={24} onClick={() => window.location.href='/'} />
      </nav>
    </div>
  );
}
