import React from 'react';
import { motion } from 'framer-motion';

export default function AuraWallet({ luvBalance }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0' }}>
      <motion.div 
        animate={{ boxShadow: ["0 0 20px #ff00ff", "0 0 60px #ff00ff", "0 0 20px #ff00ff"] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ width: '150px', height: '150px', borderRadius: '50%', border: '2px solid #ff00ff', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, rgba(255,0,255,0.1) 0%, transparent 70%)' }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.6rem', color: '#888', margin: 0 }}>LUV AURA</p>
          <h2 style={{ color: '#fff', margin: 0 }}>{luvBalance}M</h2>
        </div>
      </motion.div>
      <p style={{ fontSize: '0.7rem', color: '#ff00ff', marginTop: '15px' }}>REPUTATION LAYER ACTIVE</p>
    </div>
  );
}
