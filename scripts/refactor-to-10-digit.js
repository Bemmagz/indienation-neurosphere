const fs = require('fs');
const to10Digit = (n) => String(n).padStart(10, '0');
const registryPath = 'genesis-registry.json';

if (!fs.existsSync(registryPath)) {
    console.error("❌ Error: genesis-registry.json tidak ditemukan!");
    process.exit(1);
}

let registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
let updatedRegistry = {};

Object.keys(registry).forEach(key => {
    let numPart = key.replace('IID-2026-', '');
    let newNum = to10Digit(parseInt(numPart));
    updatedRegistry[newNum] = registry[key];
});

fs.writeFileSync(registryPath, JSON.stringify(updatedRegistry, null, 2));
console.log("✔ SUCCESS: Registry upgraded to 10-digit format.");
