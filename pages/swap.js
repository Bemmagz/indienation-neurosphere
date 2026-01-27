import React, { useState, useEffect } from 'react';
import { ArrowDownUp, RefreshCw, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/router';
import AIGuard from '../components/AIGuard';

export default function Swap() {
  const router = useRouter();
  const [fromAsset, setFromAsset] = useState('ENPE');
  const [toAsset, setToAsset] = useState('IND-EUR');
  const [amount, setAmount] = useState('');
  const [receive, setReceive] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);

  // Simulasi Kurs (Sesuai Tokenomics NeuroSphere)
  const rates = {
    'ENPE': 0.085, // in USDT
    'LUV': 1.25,   // in USDT
    'IND-EUR': 1.09 // Fixed Anchor Simulation
  };

  useEffect(() => {
    if (amount) {
      const val = (amount * rates[fromAsset]) / rates[toAsset];
      setReceive(val.toFixed(4));
    } else {
      setReceive(0);
    }
  }, [amount, fromAsset, toAsset]);

  const handleSwap = () => {
    setIsSwapping(true);
    const msg = new SpeechSynthesisUtterance(`Confirming swap of ${amount} ${fromAsset} to ${toAsset}. Auditing transaction hash.`);
    window.speechSynthesis.speak(msg);

    setTimeout(() => {
      alert(`SWAP SUCCESSFUL!\nHash: 0x${Math.random().toString(16).slice(2, 18)}...`);
      setIsSwapping(false);
      router.push('/dashboard');
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <AIGuard context="DASHBOARD" />
      
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ letterSpacing: '3px' }}>◈ TM SWAP ENGINE ◈</h2>
        <p style={{ fontSize: '0.6rem', color: '#888' }}>INSTANT VALUE CONVERSION</p>
      </header>

      <main style={{ maxWidth: '450px', margin: '0 auto', border: '1px solid #222', borderRadius: '20px', padding: '20px', background: '#050505' }}>
        {/* FROM ASSET */}
        <div style={{ background: '#000', padding: '15px', borderRadius: '15px', marginBottom: '10px' }}>
          <label style={{ fontSize: '0.7rem', color: '#888' }}>FROM</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', outline: 'none', width: '60%' }} 
            />
            <select value={fromAsset} onChange={(e) => setFromAsset(e.target.value)} style={{ background: '#222', color: '#00ff41', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
              <option>ENPE</option>
              <option>LUV</option>
              <option>IND-EUR</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '-15px 0' }}>
          <div style={{ background: '#00ff41', color: '#000', borderRadius: '50%', padding: '8px', zIndex: 2 }}>
            <ArrowDownUp size={20} />
          </div>
        </div>

        {/* TO ASSET */}
        <div style={{ background: '#000', padding: '15px', borderRadius: '15px', marginTop: '10px' }}>
          <label style={{ fontSize: '0.7rem', color: '#888' }}>TO (ESTIMATED)</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
            <h2 style={{ margin: 0, color: '#fff' }}>{receive}</h2>
            <select value={toAsset} onChange={(e) => setToAsset(e.target.value)} style={{ background: '#222', color: '#00ff41', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
              <option>IND-EUR</option>
              <option>ENPE</option>
              <option>LUV</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '10px', fontSize: '0.7rem', color: '#888', borderTop: '1px solid #111' }}>
          <p>Slippage: 0.1%</p>
          <p>Network Fee: Free (Subsidized by NeuroSphere)</p>
        </div>

        <button 
          onClick={handleSwap}
          disabled={!amount || isSwapping}
          style={{ width: '100%', marginTop: '20px', padding: '18px', background: isSwapping ? '#222' : '#00ff41', color: '#000', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
        >
          {isSwapping ? <RefreshCw className="animate-spin" /> : 'EXECUTE SWAP'}
        </button>
      </main>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={() => router.back()} style={{ color: '#444', background: 'none', border: 'none' }}>CANCEL TRANSACTION</button>
      </div>

      <style jsx>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
