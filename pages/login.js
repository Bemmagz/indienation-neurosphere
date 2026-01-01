import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function SovereignLogin() {
  const [key, setKey] = useState('');
  const router = useRouter();
  const ADMIN_HASH = "ebab565ff9003de413ddd6a2cb2a740bb93bda090e98d208acbbd28d269b0784";

  const handleLogin = () => {
    if (key === ADMIN_HASH) {
      router.push('/admin');
    } else {
      alert("IDENTITY REJECTED: INVALID SOVEREIGN KEY");
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff00', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      <h2>[ SOVEREIGN ID GATE ]</h2>
      <input 
        type="password" 
        placeholder="ENTER IDENTITY HASH" 
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ background: '#111', border: '1px solid #00ff00', color: '#00ff00', padding: '10px', width: '300px', marginBottom: '10px' }}
      />
      <button onClick={handleLogin} style={{ background: '#00ff00', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
        VALIDATE IDENTITY
      </button>
      <p style={{ marginTop: '20px', fontSize: '10px', opacity: 0.5 }}>IDENTITAS ANDA ADALAH KUNCI: NO CENTRAL DATABASE</p>
    </div>
  );
}
