const sectors = ["Investment", "Music", "CSR", "Education", "Tourism", "Identity", "Privacy", "Health", "Services", "Property", "Gaming", "Social Media", "Marketplace", "Agriculture", "Energy", "Legal", "Logistics", "Science", "Art", "Space", "Governance", "Defense", "AI Labs", "Manufacturing", "Media", "Environment", "Fashion", "Food", "Insurance", "Telecommunication", "Religion", "Philanthropy", "Sports"];

export default function MainHub() {
  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
        <div>
          <h2 className="text-xs text-cyan-400 font-mono">Living Value Identity</h2>
          <p className="text-2xl font-bold tracking-tighter">Total TM: ₮ 1,250,000</p>
        </div>
        <img src="/assets/logo.jpg" className="w-12 h-12 rounded-full border border-cyan-500" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 p-4 rounded-2xl border border-pink-500/20">
          <p className="text-[10px] text-pink-400 uppercase">Donation Pool (15%)</p>
          <p className="font-bold">STATUS: OPEN</p>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-cyan-500/20">
          <p className="text-[10px] text-cyan-400 uppercase">LUV Distribution</p>
          <p className="font-bold">1M People Active</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {sectors.map(s => (
          <div key={s} className="p-3 bg-white/5 border border-white/5 rounded-xl text-[8px] text-center font-bold uppercase hover:bg-cyan-500/10 transition-all">{s}</div>
        ))}
      </div>
    </div>
  );
}
