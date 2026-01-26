const fs = require('fs');
const registry = JSON.parse(fs.readFileSync('genesis-registry.json', 'utf8'));
const citizenId = "0000000002";

if (registry[citizenId]) {
    const data = registry[citizenId];
    console.log(`
=========================================
      ◈ NEUROSPHERE CITIZEN CARD ◈
=========================================
 IDENTITY ID : ${citizenId}
 STATUS      : ACTIVE (First Pulse)
 TIMESTAMP   : ${data.ts}
-----------------------------------------
 [ BALANCE ]
 ENPE (Engine Power) : ${data.tm_identity.enpe}
 LUV (Social Rep)    : ${data.tm_identity.luv}
 STABLE (Living Val) : €${data.tm_identity.stable}
-----------------------------------------
 HASH VALIDATION:
 ${data.h}
=========================================
    "Welcome to the New Civilization"
    `);
}
