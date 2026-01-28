import React, { useState } from 'react';
import TMWallet from '../components/TMWallet';
import Certificate from './certificate';

export default function Dashboard() {
  const [view, setView] = useState('wallet'); // toggle: wallet | certificate
  
  const founderBalances = {
    total: "€ 100.000,00",
    stable: "3 IND-EUR",
    enpe: "20% Staked",
    luv: "1.000.000 LUV"
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <nav className="flex justify-center gap-10 p-5 border-b border-green-900 bg-black sticky top-0 z-50">
        <button onClick={() => setView('wallet')} className={view === 'wallet' ? 'text-green-400 font-bold' : 'text-gray-600'}>TM ORB WALLET</button>
        <button onClick={() => setView('certificate')} className={view === 'certificate' ? 'text-green-400 font-bold' : 'text-gray-600'}>SOVEREIGNTY CERTIFICATE</button>
      </nav>

      <main className="p-4">
        {view === 'wallet' ? (
          <TMWallet auraValue={100} balances={founderBalances} txHash="INDIE-F-GENESIS-2026" />
        ) : (
          <Certificate />
        )}
      </main>
    </div>
  );
}
