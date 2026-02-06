export const detectCollision = (userPatternA, userPatternB) => {
  // Sederhananya: Jika pola perilaku 90% identik, tandai sebagai tabrakan identitas
  const similarity = calculateSimilarity(userPatternA, userPatternB); 
  if (similarity > 0.9) {
    return { collision: true, action: "IDENTITY_MERGE_REQUIRED" };
  }
  return { collision: false };
};
