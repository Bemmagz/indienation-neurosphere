#!/bin/bash
VAULT="$(dirname "$0")/../identity_vault.json"
SEQ_ID="$1"
ASSET="$2"
if [[ -z "$SEQ_ID" || -z "$ASSET" ]]; then
    echo "Usage: validator.sh <SEQ_ID> <ASSET>"
    exit 1
fi
if [[ ! -f "$VAULT" ]]; then
    echo "VAULT_NOT_FOUND"
    exit 3
fi
current_id=$(jq -r '.identity.sequence_id' "$VAULT")
available_assets=$(jq -r '.assets | keys | .[]' "$VAULT")
if [[ "$SEQ_ID" != "$current_id" ]]; then
    echo "VALIDATION_FAILED: ID '$SEQ_ID' tidak cocok"
    exit 2
fi
if ! echo "$available_assets" | grep -qw "$ASSET"; then
    echo "DIALECT_ERROR: Aset '$ASSET' tidak tersedia"
    exit 4
fi
exit 0
