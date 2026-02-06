#!/bin/bash
# NeuroSphere Vault - Calibrated Path
BASE_DIR="$HOME/indienation-neurosphere"
FILE="$BASE_DIR/GENESIS_CERTIFICATE.txt"
VAULT="$BASE_DIR/GENESIS_CERTIFICATE.gpg"
PASS="NeuroSphere-Founder-2026"

encrypt_cert() {
    if [ -f "$FILE" ]; then
        echo "Mengunci Sertifikat Genesis..."
        gpg -c --batch --passphrase "$PASS" --yes -o "$VAULT" "$FILE"
        rm "$FILE"
        echo -e "\033[1;32m[SECURE] Terkunci dalam Vault GPG.\033[0m"
    else
        echo "Error: File .txt tidak ditemukan."
    fi
}

decrypt_cert() {
    if [ -f "$VAULT" ]; then
        echo "Membuka kunci Vault..."
        gpg -d --batch --passphrase "$PASS" --yes -o "$FILE" "$VAULT"
        echo -e "\033[1;33m[ACCESS] Sertifikat siap dibaca.\033[0m"
    else
        echo "Error: File .gpg tidak ditemukan."
    fi
}

case "$1" in
    lock) encrypt_cert ;;
    unlock) decrypt_cert ;;
    *) echo "Gunakan: neuro-vault.sh [lock|unlock]" ;;
esac
