import React, { useEffect, useRef } from 'react';
import { Globe, Users, Zap, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import AIGuard from '../components/AIGuard';

export default function NodeMap() {
  const router = useRouter();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Inisialisasi 200 titik cahaya representatif
    const nodes = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random()
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';

      nodes.forEach(node => {
        ctx.globalAlpha = node.opacity;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Animasi bernapas (pulsing)
        node.opacity += node.speed * 0.02;
        if (node.opacity > 1 || node.opacity < 0.1) node.speed *= -1;
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', padding: '20px', fontFamily: 'monospace', overflow: 'hidden' }}>
      <AIGuard context="DASHBOARD" />
      
      <header style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2 style={{ letterSpacing: '5px' }}>◈ GLOBAL PIONEER NETWORK ◈</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.6rem', color: '#888' }}>ACTIVE NODES</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>1,000,000</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.6rem', color: '#888' }}>TOTAL LUV DISTRIBUTED</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>1T LUV</p>
          </div>
        </div>
      </header>

      <main style={{ position: 'relative', height: '60vh', marginTop: '20px', border: '1px solid #111', borderRadius: '20px', background: 'radial-gradient(circle, #050505 0%, #000 100%)' }}>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={600} 
          style={{ width: '100%', height: '100%', opacity: 0.8 }}
        />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
           <Globe size={150} color="rgba(0, 255, 65, 0.1)" strokeWidth={1} />
        </div>
        
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(0,0,0,0.8)', padding: '15px', borderRadius: '10px', border: '1px solid #222' }}>
           <p style={{ fontSize: '0.7rem', color: '#fff' }}>
             <Zap size={10} style={{ marginRight: '5px' }} /> 
             LIVE UPDATE: Pioneer from <span style={{ color: '#00ff41' }}>Indonesia</span> has just claimed 1M LUV.
           </p>
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'none', border: '1px solid #444', color: '#444', padding: '12px 25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto' }}>
          <ArrowLeft size={16} /> EXIT MAP
        </button>
      </footer>
    </div>
  );
}
