#!/bin/bash

clear

while true; do
  echo "================================================"
  echo "      NEUROSPHERE FOUNDER OPERATIONAL HUB        "
  echo "================================================"
  echo " 1. [CREATE]  Generate Property Voucher Draft"
  echo " 2. [SURVEY]  Finalize Property Data (at Location)"
  echo " 3. [DEPLOY]  Execute Transaction & Lock Asset"
  echo " 4. [AUDIT]   View All Vouchers / Assets"
  echo " 5. [EXIT]    Close Hub"
  echo "================================================"
  echo -n "Select Menu [1-5]: "
  read CHOICE
  echo

  case $CHOICE in
    1)
      echo "[HUB] CREATE Voucher Draft"
      ./create_voucher.sh
      ;;
    2)
      echo "[HUB] SURVEY & FINALIZE Voucher"
      ./survey_done.sh
      ;;
    3)
      echo "[HUB] DEPLOY & LOCK Asset"
      ./deploy_voucher.sh
      ;;
    4)
      echo "[HUB] AUDIT MODE"
      echo "------------------------------------------------"
      ls -lh ./vouchers
      echo "------------------------------------------------"
      for f in ./vouchers/*.json; do
        echo "FILE: $f"
        grep -E '"voucher_id"|"status"|"location"|"valuation_ind_eur"' "$f"
        echo "------------------------------------------------"
      done
      ;;
    5)
      echo "[EXIT] Closing Founder Hub."
      break
      ;;
    *)
      echo "[ERROR] Invalid selection. Choose 1–5."
      ;;
  esac

  echo
  read -p "Press ENTER to return to menu..." _
  clear
done

