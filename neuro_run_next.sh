#!/bin/bash
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
BIN="$ROOT_DIR/bin/neuro"
STATE="$ROOT_DIR/state"

usage() {
    echo "NEUROSPHERE NEXT-GEN RUNNER"
    echo "USAGE: $0 {claim|claim_csv|balance}"
    exit 0
}

CMD="${1:-}"
case "$CMD" in
    claim)
        shift
        while (( "$#" )); do
            "$BIN" claim "$1" "$2" "$3" &
            shift 3
        done
        wait
        ;;
    balance)
        "$BIN" balance
        ;;
    *)
        usage
        ;;
esac
