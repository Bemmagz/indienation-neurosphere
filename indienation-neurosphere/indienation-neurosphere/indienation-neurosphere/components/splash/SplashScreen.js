import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <motion.div 
        animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-48 h-48 rounded-full border-2 border-cyan-500 p-1 shadow-[0_0_40px_rgba(6,182,212,0.5)]"
      >
        <img src="/assets/logo.jpg" alt="NeuroSphere" className="w-full h-full rounded-full object-cover" 
             onError={(e) => e.target.src='https://via.placeholder.com/200/00ffff/000000?text=TM'} />
      </motion.div>
      <div className="mt-10 text-center">
        <h1 className="text-4xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 cyber-glow">NEUROSPHERE</h1>
        <p className="text-pink-500 font-bold mt-4 animate-pulse uppercase">Selamat Natal & Tahun Baru 2026</p>
        <p className="text-white text-xs opacity-50 mt-2">Claim 1 Million LovelyCoin Now</p>
      </div>
      <button onClick={onComplete} className="mt-12 px-8 py-2 border border-cyan-500/50 rounded-full hover:bg-cyan-500/20 text-cyan-300 text-xs tracking-tighter transition-all">INITIALIZE NEURAL LINK</button>
    </div>
  );
}
