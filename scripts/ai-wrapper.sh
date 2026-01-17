#!/bin/bash
# AI Engineer: Wrapper untuk validasi input sebelum ke Gemini
PROMPT=$1
if [[ -z "$PROMPT" ]]; then
    echo "AI Engineer Error: Prompt kosong. Batalkan eksekusi."
    exit 1
fi
echo "AI Engineer: Prompt divalidasi. Mengirim ke Gemini-1.5-Flash..."
# Logic panggilan API diletakkan di sini
