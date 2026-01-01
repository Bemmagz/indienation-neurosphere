import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <div className="w-64 h-64 rounded-full border-2 border-cyan-500/50 shadow-[0_0_60px_rgba(6,182,212,0.3)] overflow-hidden bg-gray-900 flex items-center justify-center">
          {/* Fallback jika gambar belum ada di public/assets */}
          <img 
            src="/assets/neurosphere-logo.jpg" 
            alt="Logo" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400/000000/00ffff?text=NeuroSphere";
            }}
          />
        </div>
        <div className="absolute -inset-4 border border-cyan-500/20 rounded-full animate-slow-spin" />
      </motion.div>

      <div className="mt-12 text-center z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-purple-600">
          NEUROSPHERE
        </h1>
        <p className="text-pink-500 font-bold text-lg mt-4 animate-pulse uppercase tracking-wider">
          Selamat Natal & Tahun Baru 2026
        </p>
        <p className="text-cyan-400/80 text-sm mt-2 tracking-widest font-mono">
          Claim 1 Million LovelyCoin (LUV) Now
        </p>
      </div>

      <button 
        onClick={onComplete}
        className="mt-16 px-12 py-4 bg-transparent border border-cyan-500/50 text-cyan-400 rounded-full hover:bg-cyan-500/10 transition-all font-bold tracking-widest text-xs z-10"
      >
        ACCESS SINGULARITY NEXUS
      </button>

      <div className="absolute bottom-10 opacity-20 text-[10px] tracking-[0.5em] text-white">
        POWERED BY 1001NDONESIA | CLOSE 2 U
      </div>
    </div>
  );
}
