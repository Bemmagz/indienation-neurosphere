#!/bin/bash
LEDGER="$(dirname "$0")/../state/ledger.json"
mkdir -p "$(dirname "$LEDGER")"
touch "$LEDGER"
if [[ "$1" == "balance" ]]; then
    cat "$LEDGER"
fi
