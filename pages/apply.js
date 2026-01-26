import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/enroll');
  }, [router]);

  return (
    <div style={{ backgroundColor: '#000', color: '#46FF2E', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <p>MENGALIHKAN KE GERBANG KEDAULATAN...</p>
    </div>
  );
}
