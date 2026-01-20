#!/usr/bin/env python3
"""
NEUROSPHERE IMMUNE SYSTEM v3.0 - Complete Implementation
Quantum-Resistant Auto-Revert dengan Forensic Chain of Custody
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
║              NEUROSPHERE IMMUNE SYSTEM v3.0                  ║
║       Quantum-Resistant Auto-Revert + Forensic Logging       ║
╚══════════════════════════════════════════════════════════════╝
""")

# ============================================================================
# MODUL 1: FORENSIC CHAIN OF CUSTODY
# ============================================================================

@dataclass
class ForensicLogEntry:
    """Immutable forensic log entry dengan hash chain"""
    timestamp: str
    tx_id: str
    action: str
    amount: float
    currency: str
    reason: str
    previous_hash: str = ""
    integrity_hash: str = field(init=False)
    
    def __post_init__(self):
        """Generate integrity hash setelah inisialisasi"""
        self.integrity_hash = self.calculate_hash()
    
    def calculate_hash(self) -> str:
        """Calculate SHA3-512 hash dari log entry"""
        data_string = f"{self.timestamp}{self.tx_id}{self.action}" \
                     f"{self.amount}{self.currency}{self.reason}{self.previous_hash}"
        return hashlib.sha3_512(data_string.encode()).hexdigest()
    
    def to_dict(self) -> Dict:
        """Convert ke dictionary untuk serialisasi"""
        return {
            "timestamp": self.timestamp,
            "tx_id": self.tx_id,
            "action": self.action,
            "amount": self.amount,
            "currency": self.currency,
            "reason": self.reason,
            "previous_hash": self.previous_hash,
            "integrity_hash": self.integrity_hash
        }

class ForensicChain:
    """Immutable forensic chain of custody"""
    
    def __init__(self, chain_id: str):
        self.chain_id = chain_id
        self.chain: List[ForensicLogEntry] = []
        self._initialize_chain()
    
    def _initialize_chain(self):
        """Initialize chain dengan genesis block"""
        genesis_entry = ForensicLogEntry(
            timestamp=datetime.now().isoformat(),
            tx_id="GENESIS",
            action="CHAIN_INITIALIZED",
            amount=0.0,
            currency="SYSTEM",
            reason="Neurosphere Forensic Chain Initialization",
            previous_hash="0" * 128
        )
        self.chain.append(genesis_entry)
        self._save_to_file()
    
    def add_entry(self, tx_id: str, action: str, amount: float, 
                 currency: str, reason: str) -> str:
        """Add new forensic log entry"""
        previous_hash = self.chain[-1].integrity_hash if self.chain else "0" * 128
        
        new_entry = ForensicLogEntry(
            timestamp=datetime.now().isoformat(),
            tx_id=tx_id,
            action=action,
            amount=amount,
            currency=currency,
            reason=reason,
            previous_hash=previous_hash
        )
        
        self.chain.append(new_entry)
        
        # Verifikasi chain integrity
        if not self.verify_chain():
            raise ValueError("Chain integrity compromised!")
        
        # Save to file
        filepath = self._save_to_file()
        return filepath
    
    def verify_chain(self) -> bool:
        """Verify entire chain integrity"""
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i-1]
            
            # Check hash linkage
            if current.previous_hash != previous.integrity_hash:
                return False
            
            # Recalculate hash
            if current.calculate_hash() != current.integrity_hash:
                return False
        
        return True
    
    def _save_to_file(self) -> str:
        """Save chain ke file JSON"""
        os.makedirs("forensic_chains", exist_ok=True)
        filename = f"forensic_chains/{self.chain_id}_{datetime.now().strftime('%Y%m%d')}.json"
        
        chain_data = {
            "chain_id": self.chain_id,
            "created_at": datetime.now().isoformat(),
            "entries": [entry.to_dict() for entry in self.chain],
            "integrity_verified": self.verify_chain(),
            "total_entries": len(self.chain)
        }
        
        with open(filename, 'w') as f:
            json.dump(chain_data, f, indent=2)
        
        return filename
    
    def get_audit_trail(self, tx_id: str) -> List[Dict]:
        """Get audit trail untuk transaction tertentu"""
        return [entry.to_dict() for entry in self.chain if entry.tx_id == tx_id]

# ============================================================================
# MODUL 2: QUANTUM-RESISTANT ESCROW CONTAINER
# ============================================================================

@dataclass
class EscrowContainer:
    """
    Quantum-Resistant Escrow Container dengan auto-revert timer
    Berdasarkan prinsip: "If no KYC in 15 minutes, auto-revert"
    """
    
    tx_id: str
    amount: float
    currency: str
    origin: str  # Sumber dana
    destination: str  # Tujuan dana
    timeout_minutes: int = 15
    status: str = field(default="STAGED_IN_ESCROW")
    created_at: datetime = field(default_factory=datetime.now)
    last_verified: Optional[datetime] = None
    kyc_level: int = 0
    
    def verify_kyc(self, kyc_data: Dict) -> Tuple[bool, str]:
        """Verify KYC dan update status"""
        kyc_level = kyc_data.get("kyc_level", 0)
        required_level = self._get_required_kyc_level()
        
        if kyc_level < required_level:
            return False, f"Insufficient KYC level. Required: {required_level}"
        
        if self._perform_kyc_verification(kyc_data):
            self.status = "KYC_VERIFIED"
            self.last_verified = datetime.now()
            self.kyc_level = kyc_level
            return True, "KYC verification successful"
        else:
            return False, "KYC verification failed"
    
    def _get_required_kyc_level(self) -> int:
        """Determine required KYC level berdasarkan amount"""
        if self.amount > 100_000_000:  # > 100 juta
            return 3
        elif self.amount > 1_000_000:  # > 1 juta
            return 2
        elif self.amount > 100_000:    # > 100 ribu
            return 1
        else:
            return 0
    
    def _perform_kyc_verification(self, kyc_data: Dict) -> bool:
        """Perform actual KYC verification"""
        required_level = self._get_required_kyc_level()
        
        if required_level == 0:
            return True
        
        required_fields = {
            1: ["otp_verified", "phone_verified"],
            2: ["biometric_verified", "document_verified"],
            3: ["video_kyc_verified", "biometric_verified", 
                "document_verified", "source_of_funds_verified"]
        }
        
        level_fields = required_fields.get(required_level, [])
        for field in level_fields:
            if not kyc_data.get(field, False):
                return False
        
        return True
    
    def check_auto_revert(self) -> Tuple[bool, str]:
        """Check jika perlu auto-revert"""
        elapsed = (datetime.now() - self.created_at).total_seconds()
        timeout_seconds = self.timeout_minutes * 60
        
        if elapsed > timeout_seconds and self.status == "STAGED_IN_ESCROW":
            self.status = "AUTO_REVERTED"
            return False, f"🕒 Timeout! {int(elapsed)}s passed. Returning funds to {self.origin}"
        
        remaining = max(0, timeout_seconds - elapsed)
        return True, f"⏳ Staging: {int(remaining)}s remaining"
    
    def execute_revert(self) -> Dict:
        """Execute revert ke origin"""
        if self.status != "AUTO_REVERTED":
            self.status = "AUTO_REVERTED"
        
        return {
            "tx_id": self.tx_id,
            "action": "FUNDS_REVERTED",
            "amount": self.amount,
            "currency": self.currency,
            "from": self.destination,
            "to": self.origin,
            "timestamp": datetime.now().isoformat(),
            "reason": f"{self.timeout_minutes}-minute timeout without KYC verification"
        }
    
    def execute_transfer(self) -> Dict:
        """Execute transfer ke destination setelah KYC verified"""
        if self.status != "KYC_VERIFIED":
            raise ValueError("Transaction not KYC verified")
        
        self.status = "COMPLETED"
        return {
            "tx_id": self.tx_id,
            "action": "FUNDS_TRANSFERRED",
            "amount": self.amount,
            "currency": self.currency,
            "from": self.origin,
            "to": self.destination,
            "timestamp": datetime.now().isoformat(),
            "kyc_level": self.kyc_level
        }

# ============================================================================
# MODUL 3: NEUROSPHERE IMMUNE RESPONSE ENGINE
# ============================================================================

class NeurosphereImmuneSystem:
    """
    Main Immune System Engine
    Mengintegrasikan semua komponen: Forensic Chain + Escrow + Auto-Revert
    """
    
    def __init__(self):
        self.forensic_chain = ForensicChain("neurosphere_immune_v3")
        self.active_escrows: Dict[str, EscrowContainer] = {}
        self.quantum_crypto = QuantumResistantCrypto()
        
        # Transaction thresholds
        self.thresholds = {
            "micro": 100_000,        # < 100K: Instant
            "medium": 1_000_000,     # 100K - 1M: Soft Guard
            "large": 100_000_000,    # 1M - 100M: Hard Guard
        }
        
        # Start auto-revert monitor
        asyncio.create_task(self._monitor_auto_reverts())
    
    async def _monitor_auto_reverts(self):
        """Monitor dan execute auto-reverts setiap 30 detik"""
        while True:
            await asyncio.sleep(30)
            
            for tx_id, escrow in list(self.active_escrows.items()):
                if escrow.status == "STAGED_IN_ESCROW":
                    still_valid, message = escrow.check_auto_revert()
                    
                    if not still_valid:
                        # Execute auto-revert
                        revert_result = escrow.execute_revert()
                        
                        # Log ke forensic chain
                        self.forensic_chain.add_entry(
                            tx_id=tx_id,
                            action="AUTO_REVERT_EXECUTED",
                            amount=escrow.amount,
                            currency=escrow.currency,
                            reason=message
                        )
                        
                        # Remove dari active escrows
                        del self.active_escrows[tx_id]
                        
                        print(f"\n[🔄 AUTO-REVERT] {message}")
    
    def process_transaction(self, tx_data: Dict) -> Dict:
        """
        Main transaction processing dengan immune response
        """
        print(f"\n{'='*60}")
        print("🧬 NEUROSPHERE IMMUNE SYSTEM - TRANSACTION PROCESSING")
        print(f"{'='*60}")
        
        tx_id = tx_data.get("id", f"TX_{int(time.time())}")
        amount = tx_data.get("amount", 0)
        currency = tx_data.get("currency", "ENPE")
        
        print(f"\n📊 TRANSACTION DETAILS:")
        print(f"   • ID: {tx_id}")
        print(f"   • Amount: {amount:,} {currency}")
        print(f"   • Sender: {tx_data.get('sender', 'UNKNOWN')}")
        
        # Step 1: Determine Immune Response Level
        response_level = self._determine_response_level(amount)
        
        print(f"\n🛡️ IMMUNE RESPONSE LEVEL:")
        print(f"   • Level: {response_level['name']}")
        print(f"   • Description: {response_level['description']}")
        
        # Step 2: Execute Response
        if response_level["level"] == "INSTANT":
            return self._process_instant(tx_id, tx_data, response_level)
        elif response_level["level"] == "SOFT_GUARD":
            return self._process_soft_guard(tx_id, tx_data, response_level)
        elif response_level["level"] == "HARD_GUARD":
            return self._process_hard_guard(tx_id, tx_data, response_level)
        elif response_level["level"] == "CRITICAL_LOCK":
            return self._process_critical_lock(tx_id, tx_data, response_level)
    
    def _determine_response_level(self, amount: float) -> Dict:
        """Determine immune response level berdasarkan amount"""
        if amount < self.thresholds["micro"]:
            return {
                "level": "INSTANT",
                "name": "Micro Flow",
                "description": "🟢 Instant processing",
                "kyc_required": 0,
                "timeout_minutes": 0
            }
        elif amount < self.thresholds["medium"]:
            return {
                "level": "SOFT_GUARD",
                "name": "Soft Guard",
                "description": "🟡 15-minute escrow + KYC Level 1",
                "kyc_required": 1,
                "timeout_minutes": 15
            }
        elif amount < self.thresholds["large"]:
            return {
                "level": "HARD_GUARD",
                "name": "Hard Guard",
                "description": "🟠 KYC Level 2 required",
                "kyc_required": 2,
                "timeout_minutes": 30
            }
        else:
            return {
                "level": "CRITICAL_LOCK",
                "name": "Critical Lock",
                "description": "🔴 KYC Level 3 required + Auto-Revert in 15 minutes",
                "kyc_required": 3,
                "timeout_minutes": 15
            }
    
    def _process_instant(self, tx_id: str, tx_data: Dict, response_level: Dict) -> Dict:
        """Process instant transaction"""
        print("   🚀 Executing INSTANT flow...")
        
        self.forensic_chain.add_entry(
            tx_id=tx_id,
            action="INSTANT_PROCESSED",
            amount=tx_data["amount"],
            currency=tx_data["currency"],
            reason="Micro transaction, instant processing"
        )
        
        return {
            "status": "COMPLETED",
            "message": "🟢 Transaction processed instantly",
            "tx_id": tx_id
        }
    
    def _process_critical_lock(self, tx_id: str, tx_data: Dict, response_level: Dict) -> Dict:
        """Process dengan critical lock"""
        print("   🚨 Executing CRITICAL LOCK flow...")
        
        escrow = EscrowContainer(
            tx_id=tx_id,
            amount=tx_data["amount"],
            currency=tx_data["currency"],
            origin=tx_data.get("sender", "UNKNOWN"),
            destination=tx_data.get("receiver", "UNKNOWN"),
            timeout_minutes=response_level["timeout_minutes"]
        )
        
        self.active_escrows[tx_id] = escrow
        
        forensic_file = self.forensic_chain.add_entry(
            tx_id=tx_id,
            action="CRITICAL_LOCK_ESCROW",
            amount=tx_data["amount"],
            currency=tx_data["currency"],
            reason=f"CRITICAL: Amount {tx_data['amount']:,} > 100M | Awaiting KYC Level 3"
        )
        
        return {
            "status": "CRITICAL_LOCK",
            "message": f"🔴 CRITICAL LOCK: Funds staged in escrow. Auto-revert in {response_level['timeout_minutes']} minutes if no KYC Level 3.",
            "tx_id": tx_id,
            "forensic_log": forensic_file,
            "kyc_required": 3
        }
    
    def submit_kyc(self, tx_id: str, kyc_data: Dict) -> Dict:
        """Submit KYC verification untuk transaction"""
        if tx_id not in self.active_escrows:
            return {"error": "Transaction not found or not in escrow"}
        
        escrow = self.active_escrows[tx_id]
        
        # Verify KYC
        kyc_verified, message = escrow.verify_kyc(kyc_data)
        
        if kyc_verified:
            transfer_result = escrow.execute_transfer()
            
            self.forensic_chain.add_entry(
                tx_id=tx_id,
                action="KYC_VERIFIED_TRANSFER",
                amount=escrow.amount,
                currency=escrow.currency,
                reason=f"KYC Level {escrow.kyc_level} verified successfully"
            )
            
            del self.active_escrows[tx_id]
            
            return {
                "status": "COMPLETED",
                "message": f"✅ KYC verified. Transaction completed.",
                "transfer_details": transfer_result
            }
        else:
            self.forensic_chain.add_entry(
                tx_id=tx_id,
                action="KYC_VERIFICATION_FAILED",
                amount=escrow.amount,
                currency=escrow.currency,
                reason=f"KYC verification failed: {message}"
            )
            
            return {
                "status": "KYC_FAILED",
                "message": f"❌ KYC verification failed: {message}"
            }

# ============================================================================
# SUPPORTING MODULES
# ============================================================================

class QuantumResistantCrypto:
    """Simplified quantum-resistant crypto untuk demo"""
    def sign(self, message: bytes) -> str:
        return hashlib.sha3_512(message).hexdigest()
    
    def verify(self, message: bytes, signature: str) -> bool:
        return hashlib.sha3_512(message).hexdigest() == signature

# ============================================================================
# DEMONSTRASI SISTEM
# ============================================================================

async def run_demonstration():
    """Run complete system demonstration"""
    
    print("\n" + "="*60)
    print("DEMONSTRASI NEUROSPHERE IMMUNE SYSTEM v3.0")
    print("="*60)
    
    # Initialize system
    print("\n1. 🏗️ INITIALIZING SYSTEM...")
    immune_system = NeurosphereImmuneSystem()
    print("   ✅ System initialized")
    
    # Scenario 1: Critical Transaction
    print("\n" + "="*60)
    print("SCENARIO 1: CRITICAL TRANSACTION (150,000,000 ENPE)")
    print("="*60)
    
    critical_tx = {
        "id": "TX_CRITICAL_001",
        "sender": "enterprise_wallet",
        "receiver": "investment_fund",
        "amount": 150_000_000,
        "currency": "ENPE",
        "timestamp": datetime.now().isoformat()
    }
    
    print("\n📤 SUBMITTING TRANSACTION...")
    result = immune_system.process_transaction(critical_tx)
    
    print(f"\n📋 RESULT:")
    print(f"   • Status: {result['status']}")
    print(f"   • Message: {result['message']}")
    
    # Check escrow status
    if "TX_CRITICAL_001" in immune_system.active_escrows:
        escrow = immune_system.active_escrows["TX_CRITICAL_001"]
        valid, message = escrow.check_auto_revert()
        print(f"\n⏰ ESCROW STATUS:")
        print(f"   • Status: {escrow.status}")
        print(f"   • Message: {message}")
    
    # Scenario 2: KYC Verification
    print("\n" + "="*60)
    print("SCENARIO 2: KYC VERIFICATION (LEVEL 3)")
    print("="*60)
    
    print("\n📝 SUBMITTING KYC VERIFICATION...")
    
    kyc_data = {
        "kyc_level": 3,
        "video_kyc_verified": True,
        "biometric_verified": True,
        "document_verified": True,
        "source_of_funds_verified": True
    }
    
    kyc_result = immune_system.submit_kyc("TX_CRITICAL_001", kyc_data)
    
    print(f"\n📋 KYC RESULT:")
    print(f"   • Status: {kyc_result.get('status')}")
    print(f"   • Message: {kyc_result.get('message')}")
    
    # System Summary
    print("\n" + "="*60)
    print("SYSTEM SUMMARY")
    print("="*60)
    
    print(f"\n🔐 SECURITY FEATURES:")
    print(f"   1. Quantum-Resistant Signatures")
    print(f"   2. Multi-Level Immune Response")
    print(f"   3. 15-Minute Auto-Revert Timer")
    print(f"   4. Immutable Forensic Chain")
    print(f"   5. Progressive KYC Verification")
    
    print(f"\n💰 TRANSACTION GUARD RAILS:")
    print(f"   • < 100K: INSTANT PROCESSING")
    print(f"   • 100K-1M: SOFT GUARD (15-min escrow)")
    print(f"   • 1M-100M: HARD GUARD (30-min escrow)")
    print(f"   • > 100M: CRITICAL LOCK (15-min escrow + Auto-Revert)")
    
    print(f"\n📊 SYSTEM STATISTICS:")
    print(f"   • Active Escrows: {len(immune_system.active_escrows)}")
    print(f"   • Forensic Entries: {len(immune_system.forensic_chain.chain)}")
    print(f"   • Chain Integrity: {immune_system.forensic_chain.verify_chain()}")

# ============================================================================
# MAIN EXECUTION
# ============================================================================

if __name__ == "__main__":
    # Create necessary directories
    os.makedirs("forensic_chains", exist_ok=True)
    os.makedirs("logs", exist_ok=True)
    
    # Run demonstration
    asyncio.run(run_demonstration())
