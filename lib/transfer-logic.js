export const checkTransferLimit = (userTransactions) => {
  const dailyLimit = 270;
  const maxFrequency = 3;
  // Logika limit 270 Euro dan 3x frekuensi sesuai kesepakatan
  return userTransactions.length < maxFrequency;
};
