#!/bin/bash

# Ambil IID tersedia dari Gatekeeper
NEXT_IID=$(./scripts/gatekeeper.sh | grep "NEXT PUBLIC IID" | awk '{print $5}')
CERT_FILE="vault/certificates/CERT_$NEXT_IID.txt"

# Logika Pencetakan Sertifikat Otomatis
cat <<CERT > $CERT_FILE
==================================================
       NEUROSPHERE CITIZEN CERTIFICATE
==================================================
IID          : $NEXT_IID
OWNER NAME   : [OPEN FOR REGISTRATION]
STATUS       : PUBLIC_OPEN
GRANT VALUE  : €100,000 (Maturity Stage)
DAILY FLOW   : €270/Day
JOIN DATE    : $(date +%Y-%m-%d)
--------------------------------------------------
REGISTRATION HASH: $(echo $NEXT_IID | sha256sum | head -c 16)
--------------------------------------------------
VALIDATED BY AI GUARD: ACTIVE
==================================================
CERT

echo "BERHASIL: Sertifikat untuk $NEXT_IID telah diterbitkan."
echo "Lokasi: $CERT_FILE"
