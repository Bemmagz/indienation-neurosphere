export const getIdentityLevel = (balance) => {
  if (balance >= 100000) return { level: "Sovereign", color: "#00FFFF", aura: "Diamond" };
  if (balance >= 50000) return { level: "Sprout", color: "#32CD32", aura: "Emerald" };
  if (balance >= 10000) return { level: "Initiate", color: "#FFD700", aura: "Gold" };
  return { level: "Seed", color: "#C0C0C0", aura: "Silver" };
};
