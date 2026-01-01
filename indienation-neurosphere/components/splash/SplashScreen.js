import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden font-sans">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative"
      >
        {/* Placeholder untuk Logo 1001129425.jpg */}
        <div className="w-64 h-64 rounded-full border-4 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.6)] overflow-hidden">
          <img src="/assets/logo-neurosphere.jpg" alt="NeuroSphere Logo" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-300 animate-spin-slow"></div>
      </motion.div>

      <div className="mt-10 text-center z-10">
        <h1 className="text-5xl font-black tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          NEUROSPHERE
        </h1>
        <p className="text-white opacity-50 tracking-widest text-xs mt-2">THE SINGULARITY NEXUS</p>
        
        <div className="mt-8">
          <p className="text-pink-500 font-bold text-xl animate-pulse">Selamat Natal & Tahun Baru 2026</p>
          <p className="text-cyan-300 text-sm italic">Claim 1 Million LovelyCoin Now</p>
        </div>
      </div>

      <button 
        onClick={onComplete}
        className="absolute bottom-20 px-10 py-3 border border-cyan-500/50 rounded-full hover:bg-cyan-500/20 text-cyan-400 transition-all uppercase tracking-widest text-xs"
      >
        Initialize Neural Link
      </button>

      <div className="absolute bottom-5 text-[8px] text-gray-600 uppercase tracking-widest">
        Powered by 1001NDONESIA | CLOSE 2 U
      </div>
    </div>
  );
}
