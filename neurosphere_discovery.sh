#!/data/data/com.termux/files/usr/bin/bash

set -e

BASE_DIR="$PWD"
OUT="system_discovery.txt"
TMP=".discovery_tmp"

echo "🧠 NEUROSPHERE AI FORENSIC DISCOVERY" > "$OUT"
echo "DATE: $(date)" >> "$OUT"
echo "==========================================" >> "$OUT"
echo "" >> "$OUT"

mkdir -p "$TMP"

echo "=== [1] DIRECTORY STRUCTURE (REAL) ===" >> "$OUT"
find . -maxdepth 5 \
  ! -path "./.git/*" >> "$OUT"

echo "" >> "$OUT"
echo "=== [2] SCRIPT FILES CONTENT (HEAD) ===" >> "$OUT"
find . -type f \( -name "*.sh" -o -name "*.js" -o -name "*.py" \) \
  ! -path "./.git/*" | while read f; do
    echo "---- FILE: $f ----" >> "$OUT"
    sed -n '1,200p' "$f" >> "$OUT" 2>/dev/null || true
    echo "" >> "$OUT"
done

echo "" >> "$OUT"
echo "=== [3] DEAD FILE DETECTION ===" >> "$OUT"

find . -type f \
  ! -path "./.git/*" > "$TMP/all_files.txt"

grep -RInE "import|require|source" . \
  --exclude-dir=.git | awk -F: '{print $1}' | sort -u > "$TMP/used_files.txt"

comm -23 <(sort "$TMP/all_files.txt") <(sort "$TMP/used_files.txt") >> "$OUT"

rm -rf "$TMP"

echo "" >> "$OUT"
echo "✅ REALITY DISCOVERY COMPLETE" >> "$OUT"

echo "📦 SPLITTING OUTPUT..." >> "$OUT"
split -l 200 "$OUT" discovery_part_

echo "DONE."
