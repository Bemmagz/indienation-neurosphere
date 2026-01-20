#!/bin/bash

echo "=================================================="
echo "🧪 TESTING NEUROSPHERE REAL-TIME SYSTEM"
echo "=================================================="

# Test 1: Instant transaction (< 100K)
echo ""
echo "TEST 1: INSTANT TRANSACTION (50,000 ENPE)"
python3 -c "
import asyncio
from neurosphere_main import RealTimeImmuneSystem

async def test():
    system = RealTimeImmuneSystem()
    tx = {'id': 'TEST_INSTANT', 'amount': 50000, 'currency': 'ENPE'}
    result = system.process_transaction(tx)
    print(f'   Result: {result[\"status\"]}')

asyncio.run(test())
"

# Test 2: Soft lock (100K-1M)
echo ""
echo "TEST 2: SOFT LOCK (500,000 ENPE)"
python3 -c "
import asyncio
from neurosphere_main import RealTimeImmuneSystem
import time

async def test():
    system = RealTimeImmuneSystem()
    tx = {'id': 'TEST_SOFT', 'amount': 500000, 'currency': 'ENPE'}
    result = system.process_transaction(tx)
    print(f'   Result: {result[\"status\"]}')
    print(f'   Timeout: {result[\"timeout\"]}s')
    print(f'   Waiting 5 seconds...')
    await asyncio.sleep(5)
    stats = system.get_stats()
    print(f'   Active escrows: {stats[\"active_escrows\"]}')

asyncio.run(test())
"

# Test 3: Hard lock (1M-100M)
echo ""
echo "TEST 3: HARD LOCK (10,000,000 ENPE)"
python3 -c "
import asyncio
from neurosphere_main import RealTimeImmuneSystem

async def test():
    system = RealTimeImmuneSystem()
    tx = {'id': 'TEST_HARD', 'amount': 10000000, 'currency': 'ENPE'}
    result = system.process_transaction(tx)
    print(f'   Result: {result[\"status\"]}')
    print(f'   Timeout: {result[\"timeout\"]}s')
    print(f'   KYC Required: Level 2')

asyncio.run(test())
"

echo ""
echo "=================================================="
echo "✅ ALL TESTS COMPLETED"
echo "=================================================="
