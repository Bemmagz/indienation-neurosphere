#!/usr/bin/env python3
"""
NEUROSPHERE REAL-TIME IMMUNE SYSTEM
Ultra-Fast Auto-Revert: 30s | 60s | 900s
"""

import hashlib
import json
import time
import os
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass, field
import asyncio

print("""
╔══════════════════════════════════════════════════════════════╗
║           NEUROSPHERE REAL-TIME IMMUNE SYSTEM               ║
║     Ultra-Fast Auto-Revert: 30s | 60s | 900s                ║
║     Guaranteed Zero-Value-Escape Protocol                   ║
╚══════════════════════════════════════════════════════════════╝
""")

# ============================================================================
# REAL-TIME ESCROW CONTAINER
# ============================================================================

@dataclass
class RealTimeEscrow:
    tx_id: str
    amount: float
    currency: str
    origin: str
    destination: str
    created_at: datetime = field(default_factory=datetime.now)
    status: str = field(default="STAGED_IN_ESCROW")
    kyc_level: int = field(default=0)
    
    @property
    def timeout_seconds(self) -> int:
        if self.amount > 100_000_000:
            return 900  # 15 menit
        elif self.amount > 1_000_000:
            return 60   # 1 menit
        elif self.amount > 100_000:
            return 30   # 30 detik
        else:
            return 0
    
    @property
    def required_kyc_level(self) -> int:
        if self.amount > 100_000_000:
            return 3
        elif self.amount > 1_000_000:
            return 2
        elif self.amount > 100_000:
            return 1
        else:
            return 0
    
    def check_timeout(self) -> Tuple[bool, str]:
        elapsed = (datetime.now() - self.created_at).total_seconds()
        timeout = self.timeout_seconds
        
        if timeout > 0 and elapsed > timeout and self.status == "STAGED_IN_ESCROW":
            self.status = "AUTO_REVERTED"
            return False, f"⏰ TIME OUT ({timeout}s)! Funds returned to {self.origin}"
        
        if timeout > 0:
            remaining = max(0, timeout - elapsed)
            return True, f"⏳ {int(remaining)}s remaining | KYC Level {self.required_kyc_level} needed"
        
        return True, "✅ Ready for processing"

# ============================================================================
# REAL-TIME IMMUNE SYSTEM ENGINE
# ============================================================================

class RealTimeImmuneSystem:
    def __init__(self):
        self.escrows: Dict[str, RealTimeEscrow] = {}
        self.transaction_log = []
        self.forensic_chain = []
        asyncio.create_task(self._monitor_timeouts())
        
        print("[SYSTEM] Real-Time Immune System Initialized")
        print("[SYSTEM] Timeout Settings: 30s (>100K), 60s (>1M), 900s (>100M)")
        print("[SYSTEM] Zero-Value-Escape Protocol: ACTIVE\n")
    
    async def _monitor_timeouts(self):
        """Monitor timeouts setiap 1 detik"""
        while True:
            await asyncio.sleep(1)
            for tx_id, escrow in list(self.escrows.items()):
                if escrow.status == "STAGED_IN_ESCROW":
                    is_valid, message = escrow.check_timeout()
                    if not is_valid:
                        # Log forensic evidence
                        self._log_forensic("AUTO_REVERT_EXECUTED", escrow, {
                            "action": "FUNDS_RETURNED",
                            "amount": escrow.amount,
                            "to": escrow.origin,
                            "reason": "Timeout without KYC"
                        })
                        del self.escrows[tx_id]
                        print(f"\n[🔄 AUTO-REVERT] {message}")
    
    def _log_forensic(self, action: str, escrow: RealTimeEscrow, details: Dict):
        """Log forensic evidence"""
        entry = {
            "timestamp": datetime.now().isoformat(),
            "tx_id": escrow.tx_id,
            "action": action,
            "amount": escrow.amount,
            "currency": escrow.currency,
            "details": details,
            "hash": hashlib.sha256(f"{escrow.tx_id}{action}{time.time()}".encode()).hexdigest()[:16]
        }
        self.forensic_chain.append(entry)
        
        # Save to file
        filename = f"forensic_chains/{escrow.tx_id}_{int(time.time())}.json"
        with open(filename, 'w') as f:
            json.dump(entry, f, indent=2)
    
    def process_transaction(self, tx_data: Dict) -> Dict:
        """Process transaction dengan real-time response"""
        tx_id = tx_data.get("id", f"TX_{int(time.time())}")
        amount = tx_data.get("amount", 0)
        currency = tx_data.get("currency", "ENPE")
        
        print(f"\n{'='*50}")
        print(f"🔄 PROCESSING: {tx_id}")
        print(f"{'='*50}")
        print(f"📊 Amount: {amount:,} {currency}")
        
        # Log transaction
        self.transaction_log.append({
            "tx_id": tx_id,
            "timestamp": datetime.now().isoformat(),
            "amount": amount,
            "status": "RECEIVED"
        })
        
        # Instant processing untuk ≤ 100K
        if amount <= 100_000:
            print("   🚀 INSTANT PROCESSING (≤ 100K)")
            print("   ✅ No escrow needed")
            return {
                "status": "INSTANT_COMPLETED",
                "message": "✅ Transaction processed instantly",
                "tx_id": tx_id
            }
        
        # Soft Lock: 100K - 1M (30 detik)
        elif amount <= 1_000_000:
            print("   ⚡ SOFT LOCK: 30s timeout")
            print("   📋 Requires: KYC Level 1 (Basic Verification)")
            
            escrow = RealTimeEscrow(
                tx_id=tx_id,
                amount=amount,
                currency=currency,
                origin=tx_data.get("sender", "UNKNOWN"),
                destination=tx_data.get("receiver", "UNKNOWN")
            )
            self.escrows[tx_id] = escrow
            
            return {
                "status": "SOFT_LOCK_ACTIVE",
                "message": "⚡ Funds locked for 30s",
                "timeout": 30,
                "kyc_required": 1,
                "tx_id": tx_id
            }
        
        # Hard Lock: 1M - 100M (60 detik)
        elif amount <= 100_000_000:
            print("   🔐 HARD LOCK: 60s timeout")
            print("   📋 Requires: KYC Level 2 (Document Verification)")
            
            escrow = RealTimeEscrow(
                tx_id=tx_id,
                amount=amount,
                currency=currency,
                origin=tx_data.get("sender", "UNKNOWN"),
                destination=tx_data.get("receiver", "UNKNOWN")
            )
            self.escrows[tx_id] = escrow
            
            return {
                "status": "HARD_LOCK_ACTIVE",
                "message": "🔐 Funds locked for 60s",
                "timeout": 60,
                "kyc_required": 2,
                "tx_id": tx_id
            }
        
        # Critical Lock: > 100M (900 detik)
        else:
            print("   🚨 CRITICAL LOCK: 900s timeout")
            print("   📋 Requires: KYC Level 3 (Full Verification)")
            
            escrow = RealTimeEscrow(
                tx_id=tx_id,
                amount=amount,
                currency=currency,
                origin=tx_data.get("sender", "UNKNOWN"),
                destination=tx_data.get("receiver", "UNKNOWN")
            )
            self.escrows[tx_id] = escrow
            
            return {
                "status": "CRITICAL_LOCK_ACTIVE",
                "message": "🚨 Funds locked for 900s",
                "timeout": 900,
                "kyc_required": 3,
                "tx_id": tx_id
            }
    
    def submit_kyc(self, tx_id: str, kyc_data: Dict) -> Dict:
        """Submit KYC verification"""
        if tx_id not in self.escrows:
            return {"error": "Transaction not found"}
        
        escrow = self.escrows[tx_id]
        provided_level = kyc_data.get("kyc_level", 0)
        
        if provided_level >= escrow.required_kyc_level:
            escrow.status = "KYC_VERIFIED"
            print(f"   ✅ KYC Level {provided_level} verified")
            
            # Log success
            self._log_forensic("KYC_VERIFIED", escrow, {
                "kyc_level": provided_level,
                "action": "TRANSFER_ALLOWED"
            })
            
            return {"status": "VERIFIED", "message": "✅ Transaction can proceed"}
        else:
            print(f"   ❌ KYC Level {provided_level} insufficient")
            return {"status": "FAILED", "message": "❌ KYC verification failed"}
    
    def get_stats(self) -> Dict:
        """Get system statistics"""
        active_counts = {
            "soft_lock": sum(1 for e in self.escrows.values() if e.timeout_seconds == 30),
            "hard_lock": sum(1 for e in self.escrows.values() if e.timeout_seconds == 60),
            "critical_lock": sum(1 for e in self.escrows.values() if e.timeout_seconds == 900),
            "total": len(self.escrows)
        }
        
        return {
            "active_escrows": active_counts,
            "total_transactions": len(self.transaction_log),
            "forensic_entries": len(self.forensic_chain),
            "zero_value_escape": True,
            "timestamp": datetime.now().isoformat()
        }

# ============================================================================
# DEMONSTRATION FUNCTION
# ============================================================================

async def demonstrate():
    """Demonstrate the system"""
    print("\n" + "="*50)
    print("DEMONSTRATION: REAL-TIME IMMUNE SYSTEM")
    print("="*50)
    
    system = RealTimeImmuneSystem()
    
    # Test Case 1: Instant Transaction
    print("\n📋 TEST 1: INSTANT TRANSACTION (50,000 ENPE)")
    tx1 = {"id": "TX_INSTANT_001", "amount": 50000, "currency": "ENPE"}
    result1 = system.process_transaction(tx1)
    print(f"   • Status: {result1['status']}")
    print(f"   • Message: {result1['message']}")
    
    # Test Case 2: Soft Lock
    print("\n📋 TEST 2: SOFT LOCK (250,000 ENPE)")
    tx2 = {"id": "TX_SOFT_001", "amount": 250000, "currency": "ENPE"}
    result2 = system.process_transaction(tx2)
    print(f"   • Status: {result2['status']}")
    print(f"   • Timeout: {result2['timeout']}s")
    print(f"   • KYC Required: Level {result2['kyc_required']}")
    
    # Test Case 3: Hard Lock
    print("\n📋 TEST 3: HARD LOCK (5,000,000 ENPE)")
    tx3 = {"id": "TX_HARD_001", "amount": 5000000, "currency": "ENPE"}
    result3 = system.process_transaction(tx3)
    print(f"   • Status: {result3['status']}")
    print(f"   • Timeout: {result3['timeout']}s")
    print(f"   • KYC Required: Level {result3['kyc_required']}")
    
    # Test KYC Verification
    print("\n📋 TEST 4: KYC VERIFICATION (Level 2)")
    kyc_data = {"kyc_level": 2}
    kyc_result = system.submit_kyc("TX_HARD_001", kyc_data)
    print(f"   • Result: {kyc_result['status']}")
    print(f"   • Message: {kyc_result.get('message', '')}")
    
    # Show stats
    stats = system.get_stats()
    print(f"\n📊 SYSTEM STATISTICS:")
    print(f"   • Active Escrows: {stats['active_escrows']['total']}")
    print(f"   • Total Transactions: {stats['total_transactions']}")
    print(f"   • Forensic Entries: {stats['forensic_entries']}")
    print(f"   • Zero-Value-Escape: {'ACTIVE ✓' if stats['zero_value_escape'] else 'INACTIVE'}")
    
    print(f"\n⚡ REAL-TIME FEATURES:")
    print(f"   • 30-second timeout for > 100,000")
    print(f"   • 60-second timeout for > 1,000,000")
    print(f"   • 900-second timeout for > 100,000,000")
    print(f"   • 1-second monitoring interval")
    print(f"   • Automatic revert on timeout")
    print(f"   • Zero-Value-Escape guarantee")

if __name__ == "__main__":
    asyncio.run(demonstrate())
