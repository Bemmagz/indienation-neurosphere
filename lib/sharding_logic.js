// INDIENATION SHARDING DISPATCHER v1.0
// Mendistribusikan 8,2 Miliar Citizen ke 1.000 Shards

export const getShardNode = (iid) => {
  // Ambil angka terakhir dari IID (misal: INDIE-000000000001 -> 1)
  const idNumber = parseInt(iid.replace(/[^0-9]/g, ''));
  
  // Tentukan Shard (1 - 1000)
  const shardIndex = idNumber % 1000;
  
  // Return URL Database yang sesuai
  return `https://db-shard-${shardIndex}.indienation-neurosphere.io`;
};

export const vaultConfig = {
  max_per_shard: 8200000, // 8,2 Juta orang per database
  total_target: 8200000000,
  encryption: "AES-256-GCM"
};
