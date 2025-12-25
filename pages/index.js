import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [counter, setCounter] = useState(100000000000119);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="neurosphere-root">
      <Head>
        <title>NEUROSPHERE OSI | Sovereign Hub</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      
      <main>
        <div className="grid-overlay"></div>
        <header>
          <h1 className="glitch-text">NEUROSPHERE</h1>
          <p className="status-bar">STATUS: SOVEREIGN | SYNC: ACTIVE</p>
        </header>

        <section className="ledger-box">
          <h2>GLOBAL LEDGER (ENPE)</h2>
          <div className="counter">{counter.toLocaleString()}</div>
        </section>

        <section className="neural-grid">
          {/* Placeholder untuk Diagram Grafis Futuristik */}
          <div className="pulse-circle"></div>
          <p>Scanning Neural Nodes... Verified</p>
        </section>

        <div className="identity-qr">
          <canvas id="canvas-qr"></canvas>
        </div>
      </main>

      <script src="/app.js"></script>
    </div>
  );
}
