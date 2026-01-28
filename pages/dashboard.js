import React, { useState } from 'react';
import TMWallet from '../components/TMWallet';

export default function Dashboard() {
  const [view, setView] = useState('wallet');
  
  const founderBalances = {
    total: "€ 100.000,00",
    stable: "3 IND-EUR",
    enpe: "100T E-Coin",
    luv: "1.000.000 LUV"
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '20px', borderBottom: '1px solid #1a1a1a' }}>
        <button onClick={() => setView('wallet')} style={{ background: 'none', border: 'none', color: view === 'wallet' ? '#00ff41' : '#444', cursor: 'pointer', fontWeight: 'bold' }}>TM ORB WALLET</button>
        <button style={{ background: 'none', border: 'none', color: '#444', cursor: 'not-allowed' }}>CERTIFICATE (SECURE)</button>
      </nav>

      <main style={{ padding: '40px 20px' }}>
        <TMWallet auraValue={100} balances={founderBalances} txHash="INDIE-F-GENESIS-2026" />
      </main>
    </div>
  );
}
