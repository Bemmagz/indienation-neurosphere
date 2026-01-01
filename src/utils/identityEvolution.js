export const calculateAura = (creationDate) => {
  const monthsActive = (new Date() - new Date(creationDate)) / (1000 * 60 * 60 * 24 * 30.44);
  if (monthsActive >= 12) return 'Hyper-Realistic Avatar & Golden Aura';
  if (monthsActive >= 6) return 'Nebula Cyan Aura';
  return 'Base Hexagonal Pulse';
};
