SELECT wallet_id, tx_type, created_at 
FROM ledger_transactions 
WHERE created_at = '2026-01-31 04:46:58.925695+00'
ORDER BY wallet_id ASC
LIMIT 10;
