#!/bin/bash

echo "📜 Testing Sovereign Certificate System"
echo "======================================"

DOMAIN="indienation-neurosphere.vercel.app"

echo "1. Testing Founder Certificate API:"
curl -s "https://$DOMAIN/api/v1/certificate?id=0000000001&key=FOUNDER_KEY_2026" | grep -o '"alias":"[^"]*"'

echo -e "\n2. Testing Citizen 02 API:"
curl -s "https://$DOMAIN/api/v1/certificate?id=0000000002&key=NEURO-FIRST-2026" | grep -o '"status":"[^"]*"'

echo -e "\n3. Testing Invalid Access (Security Check):"
curl -s "https://$DOMAIN/api/v1/certificate?id=0000000001&key=WRONG_KEY" | grep -o '"status":"[^"]*"'

echo -e "\n✅ Test Complete!"
