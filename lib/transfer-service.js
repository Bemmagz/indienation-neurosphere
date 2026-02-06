export const executeTransfer = async (supabase, senderIid, receiverIid, amount) => {
  // Memanggil fungsi atomic di database
  const { data, error } = await supabase.rpc('secure_transfer_check', {
    s_iid: senderIid,
    r_iid: receiverIid,
    amt: amount
  });

  if (error) throw error;
  if (data === 'LIMIT_REACHED') {
    return { 
      success: false, 
      message: "Batas frekuensi harian (3x) tercapai. Ini adalah mekanisme perlindungan identitas untuk menjaga stabilitas ekosistem NeuroSphere." 
    };
  }

  return { success: true, message: "Transfer berhasil dicatat dalam ledger identitas." };
};
