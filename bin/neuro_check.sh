#!/bin/bash
echo -e "\033[1;36m┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\033[0m"
echo -e "\033[1;36m┃          NEUROSPHERE ASSET AUDIT (TM)              ┃\033[0m"
echo -e "\033[1;36m┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫\033[0m"

# Query data dari database lokal neurosphere
psql -d neurosphere -t -c "
SELECT 
    '┃ ID     : ' || wallet_id,
    '┃ OWNER  : ' || owner_name,
    '┃ STATUS : ' || CASE WHEN locked_until > now() THEN 'LOCKED (AI GUARD ACTIVE)' ELSE 'UNLOCKED' END,
    '┃ UNTIL  : ' || locked_until
FROM wallets WHERE wallet_id = 'NS-QR-GREEN-001';"

echo -e "\033[1;36m┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫\033[0m"
echo -e "\033[1;33m┃ TOTAL TM (Technology Money) Manifestation:         ┃\033[0m"

psql -d neurosphere -t -c "
SELECT 
    '┃ - IND-EUR : ' || balance_ind_eur || ' (Stable Anchor)',
    '┃ - LUV     : ' || balance_luv || ' (Social Rep)',
    '┃ - ENPE    : ' || balance_enpe || ' (Sovereign Wealth)'
FROM wallets WHERE wallet_id = 'NS-QR-GREEN-001';"

echo -e "\033[1;36m┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\033[0m"
