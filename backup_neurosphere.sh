#!/bin/bash
BACKUP_DIR="backups"
mkdir -p $BACKUP_DIR
BACKUP_FILE="$BACKUP_DIR/neurosphere_$(date +%Y%m%d_%H%M%S).db.backup"
cp neurosphere.db "$BACKUP_FILE"
echo "✅ Backup created: $BACKUP_FILE"
