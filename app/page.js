"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const iid = searchParams.get('iid');
  const key = searchParams.get('key');

  useEffect(() => {
    if (iid && key) {
      fetch(`/api/v1/verify?iid=${iid}&key=${key}`)
        .then(res => res.json())
        .then(json => setData(json));
    }
  }, [iid, key]);

  if (!data || data.status !== "ACCESS_GRANTED") {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{ color: '#FF2E2E' }}>◈ ACCESS DENIED ◈</h1>
        <p>Protokol Living Value Identity memerlukan identitas valid.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', border: '1px solid #46FF2E', padding: '20px', borderRadius: '15px', backgroundColor: '#0a0a0a' }}>
      <h2 style={{ textAlign: 'center', borderBottom: '1px solid #46FF2E', pb: '10px' }}>IDENTITY CARD</h2>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Alias:</strong> {data.alias}</p>
        <p><strong>ID:</strong> {data.identity}</p>
        <p><strong>Role:</strong> {data.role}</p>
      </div>
      <div style={{ backgroundColor: '#111', padding: '15px', borderRadius: '10px' }}>
        <h3 style={{ fontSize: '14px', margin: '0 0 10px 0' }}>TOTAL TM ASSETS</h3>
        <p style={{ margin: '5px 0' }}>◈ ENPE: {data.tm_identity.enpe}</p>
        <p style={{ margin: '5px 0' }}>◈ LUV: {data.tm_identity.luv}</p>
        <p style={{ margin: '5px 0', color: '#FFD700' }}>◈ STABLE: €{data.tm_identity.stable}</p>
      </div>
      <footer style={{ marginTop: '20px', fontSize: '10px', textAlign: 'center', color: '#888' }}>
        ACTIVATE ON: 01-02-2026 | SECURED BY NEURO GUARD
      </footer>
    </div>
  );
}
