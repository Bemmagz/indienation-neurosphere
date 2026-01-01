export const checkInheritanceStatus = (lastActivityDate, inactivityLimitMonths = 24) => {
  const lastActive = new Date(lastActivityDate);
  const now = new Date();
  const diffMonths = (now - lastActive) / (1000 * 60 * 60 * 24 * 30.44);

  if (diffMonths >= inactivityLimitMonths) {
    return { status: 'TRIGGERED', message: 'Value Inheritance Process Initiated' };
  }
  return { status: 'SECURE', message: 'Identity Active' };
};

export const generateInheritanceHash = (heirSovereignID) => {
  // Menghasilkan hash enkripsi untuk kunci pewarisan
  return btoa(`HEIR:${heirSovereignID}`);
};
