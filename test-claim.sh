#!/bin/bash
echo "Testing Identity Patch for IID-2026-0000001..."
read -p "Enter Citizen Name: " CITIZEN_NAME
RESULT=$(node api/v1/patcher.js "IID-2026-0000001" "$CITIZEN_NAME")
echo $RESULT > test-result.json
echo "✔ Test Complete. Result saved to test-result.json"
