export const getIdentityLevel = (balance, joinDate, trustScore = 1.0) => {
  const daysActive = Math.floor((new Date() - new Date(joinDate)) / (1000 * 60 * 60 * 24));
  
  // Jika trustScore rendah (indikasi bot/abuse), level Sovereign tidak bisa dicapai
  if (balance >= 100000 && daysActive >= 365 && trustScore >= 0.8) 
    return { level: "Sovereign", color: "#00FFFF", aura: "Diamond" };
    
  if (balance >= 50000 && daysActive >= 180) 
    return { level: "Sprout", color: "#32CD32", aura: "Emerald" };
    
  if (balance >= 10000 && daysActive >= 30) 
    return { level: "Initiate", color: "#FFD700", aura: "Gold" };
    
  return { level: "Seed", color: "#C0C0C0", aura: "Silver" };
};
