export const getAuraStatus = () => {
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  const diff = tomorrow - now;
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Aura berubah menjadi emas jika sisa waktu < 1 jam
  const isUrgent = hours < 1;
  const auraColor = isUrgent ? "#FFD700" : "#FFFFFF"; 
  const text = `${hours}j ${minutes}m ${seconds}d lagi menuju €270`;

  return { text, auraColor, isUrgent };
};
