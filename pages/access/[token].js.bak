import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Mengambil URL dan Key dari Environment Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AccessPage() {
    const router = useRouter();
    const { token } = router.query;
    const [citizen, setCitizen] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) fetchCitizenData();
    }, [token]);

    async function fetchCitizenData() {
        const { data, error } = await supabase
            .from('iid_inventory')
            .select('*')
            .eq('access_token', token)
            .single();
        
        if (data) setCitizen(data);
        setLoading(false);
    }

    if (loading) return <div style={{backgroundColor: '#000', color: '#0f0', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace'}}>📡 AI Guard: Memvalidasi Kunci...</div>;
    if (!citizen) return <div style={{textAlign: 'center', marginTop: '50px'}}>❌ Token Tidak Valid atau Kadaluwarsa.</div>;

    return (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <div style={{ border: '2px solid #0f0', padding: '20px', borderRadius: '15px', display: 'inline-block' }}>
                <h2 style={{color: '#0f0'}}>IDENTITY VERIFIED</h2>
                <hr style={{borderColor: '#333'}} />
                <h1>🆔 {citizen.iid}</h1>
                <h2 style={{fontSize: '2.5rem'}}>€ {citizen.balance?.toLocaleString()}</h2>
                <p style={{color: '#888'}}>Digital Sovereign Identity | 2026</p>
                <div style={{marginTop: '20px', padding: '10px', backgroundColor: '#111', borderRadius: '8px'}}>
                    <small>Wallet Address: {citizen.wallet_address || '0x...'}</small>
                </div>
            </div>
        </div>
    );
}
