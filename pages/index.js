import { useEffect, useState } from "react";
export default function Dashboard() {
  const [status, setStatus] = useState({});
  const [byteProgress, setByteProgress] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch("/api/sync-status");
      const data = await res.json();
      setStatus(data);
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress = progress < 100 ? progress + 1 : 100;
      setByteProgress(progress);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyberpunk-dashboard">
      <h1>NeuroSphere OSI v3</h1>
      <p>ENPE Supply: {status.enpe}</p>
      <p>LUV Status: {status.luv}</p>
      <p>Sync Status: {status.status}</p>
      <p>Guardian: {status.guardian}</p>
      <p>Last Commit: {status.last_commit}</p>
      <div className="byte-progress">
        <div className="bar" style={{ width: `${byteProgress}%` }} />
      </div>
    </div>
  );
}
