const sectors = ["Investment", "Music", "CSR", "Education", "Tourism", "Identity", "Privacy", "Health", "Services", "Property", "Gaming", "Social Media", "Marketplace", "Agriculture", "Energy", "Legal", "Logistics", "Science", "Art", "Space", "Governance", "Defense", "AI Labs", "Manufacturing", "Media", "Environment", "Fashion", "Food", "Insurance", "Telecommunication", "Religion", "Philanthropy", "Sports"];

export default function MainHub() {
  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-cyan-400">Total TM Identity</h2>
        <div className="text-right"><p className="text-2xl font-mono">₮ 1,250,000</p></div>
      </div>
      <div className="grid grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/5 rounded-xl border border-pink-500/30">
          <p className="text-[10px] text-pink-400">DONATION POOL (15%)</p>
          <p className="text-lg font-bold">READY / OPEN</p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-cyan-500/30">
          <p className="text-[10px] text-cyan-400">LUV REWARD</p>
          <p className="text-lg font-bold">1,000,000 LUV</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {sectors.map(s => (
          <div key={s} className="p-3 bg-white/5 rounded-lg border border-white/5 text-[8px] text-center font-bold uppercase hover:bg-cyan-500/20 transition-all">{s}</div>
        ))}
      </div>
    </div>
  );
}
