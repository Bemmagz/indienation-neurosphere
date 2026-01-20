#!/bin/bash
echo "=== VERIFYING DEPLOYMENT ==="
echo "Domain: indienation-neurosphere.vercel.app"
echo "Time: $(date)"
echo ""

# Check site
echo -n "Main site: "
SITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://indienation-neurosphere.vercel.app" --max-time 10 2>/dev/null || echo "FAIL")
[ "$SITE_STATUS" = "200" ] && echo "✅ HTTP 200" || echo "❌ HTTP $SITE_STATUS"

# Check APIs
echo ""
echo "API Endpoints:"

APIS=(
  "Health:/api/health"
  "Identity:/api/identity" 
  "AI:/api/ai"
)

for api in "${APIS[@]}"; do
  name="${api%:*}"
  endpoint="${api#*:}"
  
  echo -n "  $name: "
  RESPONSE=$(curl -s "https://indienation-neurosphere.vercel.app$endpoint" --max-time 5 2>/dev/null || echo "ERROR")
  
  if echo "$RESPONSE" | grep -q '"status"\|"user_id"'; then
    echo "✅ WORKING"
  elif [ "$RESPONSE" = "ERROR" ]; then
    echo "❌ TIMEOUT"
  else
    echo "⚠️  UNEXPECTED"
  fi
done

echo ""
echo "📊 Vercel Dashboard:"
echo "https://vercel.com/Bemmagz/indienation-neurosphere"
echo ""
echo "🔧 If APIs fail, check:"
echo "1. Wait 2 more minutes for rebuild"
echo "2. Check Vercel build logs"
echo "3. Ensure runtime='edge' in API routes"
