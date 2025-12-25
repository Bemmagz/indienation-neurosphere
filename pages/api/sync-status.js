export default function handler(req,res){
  res.status(200).json({
    enpe: "100,000,000,000,119",
    luv: "Distributed",
    status: "SYNC_ACTIVE",
    guardian: "Astraea Online",
    last_commit: "OSI-FINAL-2025",
    total_posts: Math.floor(Math.random()*1000) // simulasi
  });
}
