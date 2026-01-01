import { NEUROSPHERE_CORE } from '../../lib/tm-logic/config';

const sectors = ["Investment", "Music", "CSR", "Education", "Tourism", "Identity", "Privacy", "Health", "Services", "Property", "Gaming", "Social Media", "Marketplace", "Agriculture", "Energy", "Legal", "Logistics", "Science", "Art", "Space", "Governance", "Defense", "AI Labs", "Manufacturing", "Media", "Environment", "Fashion", "Food", "Insurance", "Telecommunication", "Religion", "Philanthropy", "Sports"];

export default function MainHub() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <img src="/assets/logo-neurosphere.jpg" className="w-12 h-12 rounded-full border border-cyan-500" />
          <div>
            <h2 className="text-lg font-bold uppercase tracking-tighter">Neuro Dashboard</h2>
            <p className="text-[10px] text-cyan-500 font-mono">ID: NFT-LIVING-VALUE-001</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-500 uppercase">Total TM Identity</p>
          <p className="text-xl font-mono text-cyan-400">₮ 1,000,000,000.00</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <p className="text-xs text-gray-400 uppercase">ENPE (E-Coin)</p>
          <p className="text-xl font-bold">100 Trillion</p>
          <p className="text-[10px] text-blue-400">20% Staking Active</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <p className="text-xs text-gray-400 uppercase">Lovely Coin (LUV)</p>
          <p className="text-xl font-bold">1,000,000 LUV</p>
          <p className="text-[10px] text-pink-400">Gift & Social Distro</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <p className="text-xs text-gray-400 uppercase">Donation Pool</p>
          <p className="text-xl font-bold">15% Unlocked</p>
          <p className="text-[10px] text-green-400">Ready for Disaster CSR</p>
        </div>
      </div>

      <h3 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-30 text-center">Neural Ecosystem (33 Sectors)</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-3">
        {sectors.map(s => (
          <div key={s} className="aspect-square bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-center p-2 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all cursor-pointer group">
            <span className="text-[8px] font-bold uppercase tracking-tighter group-hover:scale-110 transition-transform">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
