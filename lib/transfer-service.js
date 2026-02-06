export const executeTransfer = async (supabase, senderIid, receiverIid, amount) => {
  // 1. Cek limit dulu
  const { data: logs } = await supabase
    .from('transfer_logs')
    .select('id')
    .eq('sender_iid', senderIid)
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  if (logs && logs.length >= 3) {
    throw new Error("Batas 3x transfer harian tercapai.");
  }

  // 2. Jika lolos, catat ke log dan proses (Logika saldo dilakukan di DB)
  const { error } = await supabase
    .from('transfer_logs')
    .insert([{ sender_iid: senderIid, receiver_iid: receiverIid, amount: amount }]);

  return { success: !error, error };
};
