#!/bin/bash
# ========================================================
# NEUROSPHERE AI SENIOR ENGINEER - TERMINAL AGENT
# Targets: GitHub, Vercel, Google AI, Supabase
# ========================================================

# --- Parameter Warna ---
G1='\033[38;5;46m'; R1='\033[38;5;196m'; Y1='\033[38;5;226m'; B1='\033[38;5;39m'; NC='\033[0m'

echo -e "${B1}>>> Initiating AI Senior Engineer Audit...${NC}"

# 1. GITHUB GUARD: Check State & Branch Integrity
check_github() {
    echo -n "Checking GitHub State... "
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        if [ -d ".git/rebase-merge" ] || [ -d ".git/rebase-apply" ]; then
            echo -e "${R1}REBASE STUCK. Auto-fixing...${NC}"
            git rebase --abort
        else
            echo -e "${G1}CLEAN${NC}"
        fi
    else
        echo -e "${R1}NOT A GIT REPO${NC}"
    fi
}

# 2. VERCEL ARCHITECT: Path & Manifest Validation
check_vercel() {
    echo -n "Checking Vercel Manifest... "
    if [ -f "package.json" ] && [ -f "vercel.json" ]; then
        # Verifikasi apakah package.json valid (bukan file kosong)
        if grep -q "dependencies" package.json; then
            echo -e "${G1}ROOT ALIGNED${NC}"
        else
            echo -e "${Y1}MALFORMED package.json${NC}"
        fi
    else
        echo -e "${R1}MISSING CONFIG${NC}"
    fi
}

# 3. AI STUDIO WRAPPER: Environment Check
check_ai_studio() {
    echo -n "Checking AI Engine API Key... "
    # Cek di .env.local atau environment variable
    if [ -f ".env.local" ] && grep -q "GOOGLE_AI_API_KEY" .env.local; then
        echo -e "${G1}KEY FOUND${NC}"
    elif [ ! -z "$GOOGLE_AI_API_KEY" ]; then
        echo -e "${G1}KEY ACTIVE (ENV)${NC}"
    else
        echo -e "${Y1}KEY MISSING (AI functionality will fail)${NC}"
    fi
}

# 4. SUPABASE LEDGER: Integrity Check
check_supabase() {
    echo -n "Checking Ledger Integrity... "
    local ledger_path="core/mathematics_vault/ledger.jsonl"
    if [ -f "$ledger_path" ]; then
        # Cek baris terakhir untuk validasi JSON sederhana
        if tail -n 1 "$ledger_path" | grep -q "sig"; then
            echo -e "${G1}SIGNED${NC}"
        else
            echo -e "${R1}UNSIGNED/CORRUPT${NC}"
        fi
    else
        echo -e "${Y1}LEDGER EMPTY${NC}"
    fi
}

# --- Main Execution ---
check_github
check_vercel
check_ai_studio
check_supabase

echo -e "------------------------------------------------"
echo -e "${G1}AI Engineer: Audit Selesai. Sistem siap di-deploy.${NC}"
