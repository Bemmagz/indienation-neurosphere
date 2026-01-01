#!/bin/bash
MESSAGE=$1
if [ -z "$MESSAGE" ]; then
  echo "Gunakan: ./emergency-alert.sh 'Pesan Anda'"
  exit 1
fi

# Mengganti seluruh konten index dengan mode Darurat
cat << 'EOT' > pages/index.js
import React from 'react';
export default function Emergency() {
  return (
    <div style={{height:'100vh', background:'#900', color:'#fff', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', padding:'20px', fontFamily:'monospace'}}>
      <h1 style={{border:'4px solid #fff', padding:'10px'}}>SOVEREIGN EMERGENCY ALERT</h1>
      <p style={{fontSize:'1.5rem', marginTop:'20px'}}>$MESSAGE</p>
      <div style={{marginTop:'40px', fontSize:'10px', opacity:0.7}}>NEUROSPHERE COMMAND CENTER</div>
    </div>
  );
}
EOT

echo "Pesan Darurat Disiapkan: $MESSAGE"
vercel --prod --yes --token="EiAhINMAmAK7IlGPROK1KhC7" --force
