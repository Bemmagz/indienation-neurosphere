import { useState } from 'react';
import SplashScreen from '../components/splash/SplashScreen';
import MainHub from '../components/dashboard/MainHub';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <main className="bg-black min-h-screen">
      {showSplash ? <SplashScreen onComplete={() => setShowSplash(false)} /> : <MainHub />}
    </main>
  );
}
