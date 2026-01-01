#!/data/data/com.termux/files/usr/bin/bash
# =====================================================
# NEUROSPHERE AI FORENSIC DISCOVERY SCRIPT
# TERMUX SAFE | NO IMAGINATION | SOURCE OF TRUTH
# =====================================================

PROJECT="$HOME/indienation-neurosphere"
OUT="$PROJECT/system_discovery.txt"
TMP="$PROJECT/.tmp_ai_discovery"

mkdir -p "$TMP"
cd "$PROJECT" || exit 1

echo "==========================================" > "$OUT"
echo " NEUROSPHERE — AI FORENSIC DISCOVERY" >> "$OUT"
echo " DATE: $(date)" >> "$OUT"
echo "==========================================" >> "$OUT"
echo "" >> "$OUT"

# -----------------------------------------------------
# [1] REAL DIRECTORY STRUCTURE
# -----------------------------------------------------
echo "=== [1] DIRECTORY STRUCTURE (REAL) ===" >> "$OUT"
tree -a -L 5 >> "$OUT" 2>/dev/null || find . -maxdepth 5 >> "$OUT"
echo "" >> "$OUT"

# -----------------------------------------------------
# [2] ENTRY POINT DETECTION
# -----------------------------------------------------
echo "=== [2] ENTRY POINTS ===" >> "$OUT"
ls index.* App.* main.* server.* 2>/dev/null >> "$OUT"
grep -RInE "createRoot|ReactDOM|new App|app.listen" . \
  --exclude="$OUT" --exclude-dir=.git >> "$OUT" 2>/dev/null
echo "" >> "$OUT"

# -----------------------------------------------------
# [3] ROUTES & PAGES
# -----------------------------------------------------
echo "=== [3] ROUTES & PAGES ===" >> "$OUT"
grep -RInE "route|page|/scan|/dashboard|/wallet|/media|/emedia" . \
  --exclude="$OUT" --exclude-dir=.git >> "$OUT" 2>/dev/null
echo "" >> "$OUT"

# -----------------------------------------------------
# [4] CORE ECONOMIC LOGIC
# -----------------------------------------------------
echo "=== [4] CORE ECONOMIC LOGIC ===" >> "$OUT"
grep -RInE "ENPE|LUV|TM|IND-EUR|wallet|balance|claim|airdrop|lock|audit" . \
  --exclude="$OUT" --exclude-dir=.git >> "$OUT" 2>/dev/null
echo "" >> "$OUT"

# -----------------------------------------------------
# [5] IDENTITY / NFT / QR
# -----------------------------------------------------
echo "=== [5] IDENTITY / NFT / QR ===" >> "$OUT"
grep -RInE "QR|scan|NFT|aura|hash|identity|forehead" . \
  --exclude="$OUT" --exclude-dir=.git >> "$OUT" 2>/dev/null
echo "" >> "$OUT"

# -----------------------------------------------------
# [6] AI / AUTOMATION
# -----------------------------------------------------
echo "=== [6] AI / AUTOMATION ===" >> "$OUT"
grep -RInE "ai_|model|prompt|neuro|agent" . \
  --exclude="$OUT" --exclude-dir=.git >> "$OUT" 2>/dev/null
echo "" >> "$OUT"

# -----------------------------------------------------
# [7] DATABASE / API
# -----------------------------------------------------
echo "=== [7] DATABASE / API ===" >> "$OUT"
grep -RInE "supabase|postgres|api/|fetch\(" . \
  --exclude="$OUT" --exclude-dir=.git >> "$OUT" 2>/dev/null
env | grep -i supabase >> "$OUT"
echo "" >> "$OUT"

# -----------------------------------------------------
# [8] DEPLOYMENT STATUS
# -----------------------------------------------------
echo "=== [8] DEPLOYMENT STATUS ===" >> "$OUT"
git remote -v >> "$OUT" 2>/dev/null
vercel --version >> "$OUT" 2>/dev/null
vercel env ls >> "$OUT" 2>/dev/null
echo "" >> "$OUT"

# -----------------------------------------------------
# [9] DEAD / UNUSED FILE DETECTION (TERMUX SAFE)
# -----------------------------------------------------
echo "=== [9] POSSIBLE DEAD FILES ===" >> "$OUT"

find . -type f \
  ! -path "./.git/*" \
  ! -path "./node_modules/*" \
  ! -name "$(basename "$OUT")" \
  > "$TMP/all_files.txt"

grep -RInE "import|require" . \
  --exclude-dir=.git \
  --exclude="$OUT" \
  | awk -F: '{print $1}' | sort -u > "$TMP/used_files.txt"

comm -23 "$TMP/all_files.txt" "$TMP/used_files.txt" >> "$OUT" 2>/dev/null
echo "" >> "$OUT"

rm -rf "$TMP"

# -----------------------------------------------------
# FINAL
# -----------------------------------------------------
echo "✅ REALITY DISCOVERY COMPLETE"
echo "📄 FILE GENERATED:"
echo "   $OUT"
echo "📌 THIS FILE IS THE ONLY SOURCE OF TRUTH"
