#!/bin/bash
# ===============================
# NEUROSPHERE :: GitHub SSH Auto-Setup & Push
# ===============================

GITHUB_USER="Bemmagz"
REPO_NAME="indienation-neurosphere"
BRANCH="main"
SSH_KEY_PATH="$HOME/.ssh/id_ed25519"

echo "========================================"
echo "[INFO] Memulai proses setup SSH & GitHub"
echo "========================================"

if [ ! -f "$SSH_KEY_PATH" ]; then
    echo "[INFO] SSH Key tidak ditemukan, membuat baru..."
    ssh-keygen -t ed25519 -C "$GITHUB_USER@github.com" -f "$SSH_KEY_PATH" -N ""
else
    echo "[INFO] SSH Key sudah ada, menggunakan yang tersedia."
fi

echo "[INFO] Memulai SSH agent..."
eval "$(ssh-agent -s)"
ssh-add "$SSH_KEY_PATH"
echo "[INFO] SSH Key ditambahkan ke agent."

echo "----------------------------------------"
echo "[INFO] Copy public key berikut ke GitHub > Settings > SSH and GPG keys"
cat "$SSH_KEY_PATH.pub"
echo "----------------------------------------"

echo "[INFO] Menambahkan GitHub ke daftar host dikenal..."
ssh-keyscan -t ed25519 github.com >> ~/.ssh/known_hosts

echo "[INFO] Mengubah remote URL ke SSH..."
git remote remove origin 2>/dev/null
git remote add origin git@github.com:$GITHUB_USER/$REPO_NAME.git
git remote -v

echo "[INFO] Tes koneksi SSH ke GitHub..."
ssh -T git@github.com || echo "[NOTE] Pastikan public key sudah di-add di GitHub!"

echo "[INFO] Menambahkan perubahan dan commit..."
git add .
git commit -m "NEUROSPHERE :: Sovereign System Sync $(date '+%Y-%m-%d %H:%M:%S')" \
    || echo "[INFO] Tidak ada perubahan untuk di-commit"

echo "[INFO] Push ke GitHub dimulai..."
git push origin $BRANCH || echo "[WARNING] Push gagal. Pastikan public key sudah ditambahkan di GitHub."

echo "========================================"
echo "[SUCCESS] Setup SSH & GitHub selesai."
echo "Gunakan URL SSH untuk repo:"
echo "git@github.com:$GITHUB_USER/$REPO_NAME.git"
echo "========================================"
