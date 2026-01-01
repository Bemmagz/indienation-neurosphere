#!/bin/bash
# Bypass deteksi platform & arsitektur
export NEXT_PRIVATE_SKIP_SWC_CHECK=1
export NODE_ENV=production
# Menjalankan build tanpa menggunakan thread worker yang sering crash di Termux
npx next build --debug
