import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <motion.div 
        animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="w-56 h-56 rounded-full border-2 border-cyan-500/50 p-1 shadow-[0_0_50px_rgba(6,182,212,0.4)]"
      >
        <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full rounded-full object-cover" />
      </motion.div>
      <div className="mt-12 text-center px-6">
        <h1 className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">NEUROSPHERE</h1>
        <p className="text-pink-500 font-bold mt-4 animate-pulse uppercase">Selamat Natal & Tahun Baru 2026</p>
        <p className="text-white text-[10px] opacity-40 mt-2 tracking-widest uppercase">Claim 1 Million LovelyCoin Now</p>
      </div>
      <button onClick={onComplete} className="mt-16 px-10 py-3 border border-cyan-500/30 rounded-full hover:bg-cyan-500/10 text-cyan-400 text-xs font-bold transition-all">INITIALIZE HYPER-LINK</button>
      <div className="absolute bottom-10 text-[8px] text-gray-700 tracking-[0.4em]">1001NDONESIA | CLOSE 2 U</div>
    </div>
  );
}
