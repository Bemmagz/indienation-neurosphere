import { useEffect,useState } from "react";
export default function Dashboard(){
  const [status,setStatus]=useState({});
  const [byteProgress,setByteProgress]=useState(0);

  useEffect(()=>{
    const fetchStatus=async()=>{setStatus(await (await fetch("/api/sync-status")).json());};
    fetchStatus();
    const interval=setInterval(fetchStatus,3000);
    return ()=>clearInterval(interval);
  },[]);

  useEffect(()=>{
    let p=0;
    const interval=setInterval(()=>{
      p=p<100?p+1:100;
      setByteProgress(p);
    },200);
    return ()=>clearInterval(interval);
  },[]);

  return (
    <div className="cyberpunk-dashboard">
      <h1>🛰️ NeuroSphere OSI Cyberpunk Monitor</h1>
      <p>ENPE Supply: {status.enpe}</p>
      <p>LUV Status: {status.luv}</p>
      <p>Sync Status: {status.status}</p>
      <p>Guardian: {status.guardian}</p>
      <p>Last Commit: {status.last_commit}</p>
      <p>Total Posts: {status.total_posts}</p>
      <div className="byte-progress">
        <div className="bar" style={{width:`${byteProgress}%`}}></div>
      </div>
      <p>Progress Byte: {byteProgress}%</p>
    </div>
  );
}
