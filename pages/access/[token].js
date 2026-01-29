import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AccessPage() {
    const router = useRouter();
    const { token } = router.query;
    const [citizen, setCitizen] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) validateSession();
    }, [token]);

    async function validateSession() {
        try {
            const res = await fetch('/api/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            const data = await res.json();
            
            if (res.ok) {
                setCitizen(data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('System Connection Error');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div style={{backgroundColor: '#000', color: '#0f0', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace'}}>📡 AI Guard: Validasi Kunci...</div>;
    if (error) return <div style={{textAlign: 'center', marginTop: '50px', color: '#fff'}}>❌ {error}</div>;

    return (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <div style={{ border: '2px solid #0f0', padding: '20px', borderRadius: '15px', display: 'inline-block', boxShadow: '0 0 15px #0f0' }}>
                <h2 style={{color: '#0f0'}}>IDENTITY VERIFIED</h2>
                <hr style={{borderColor: '#333'}} />
                <h1>🆔 {citizen.iid}</h1>
                <h2 style={{fontSize: '2.5rem'}}>€ {citizen.balance?.toLocaleString()}</h2>
                <p style={{color: '#888'}}>Digital Sovereign Identity | 2026</p>
            </div>
        </div>
    );
}
