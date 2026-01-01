import React, { useState } from 'react';
import Head from 'next/head';
import SplashScreen from '../components/splash/SplashScreen';

export default function Home() {
  const [active, setActive] = useState(false);

  return (
    <>
      <Head>
        <title>NeuroSphere | The Singularity Nexus</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {!active ? (
        <SplashScreen onComplete={() => setActive(true)} />
      ) : (
        <div className="p-10 text-center">
          <h1 className="text-3xl text-cyan-400">Dashboard Synchronized</h1>
          <p className="mt-4 opacity-50 font-mono text-xs">Identity: NFT-WALKING-WALLET-ACTIVE</p>
          {/* Logic 33 Sektor akan merender di sini */}
        </div>
      )}
    </>
  );
}
