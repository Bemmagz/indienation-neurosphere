import { useState } from 'react';
import SplashScreen from '../components/splash/SplashScreen';
import MainHub from '../components/dashboard/MainHub';

export default function Home() {
  const [active, setActive] = useState(false);
  return <>{!active ? <SplashScreen onComplete={() => setActive(true)} /> : <MainHub />}</>;
}
