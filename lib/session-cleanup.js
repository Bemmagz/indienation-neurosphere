export const cleanupExpiredSessions = async (supabase) => {
  const { error } = await supabase
    .from('claims')
    .update({ session_token: null })
    .lt('last_activity', new Date(Date.now() - 30 * 60 * 1000).toISOString());

  if (error) console.error("Cleanup Error:", error.message);
  else console.log("Expired sessions cleared successfully.");
};
