const fs = require('fs');
const registry = JSON.parse(fs.readFileSync('genesis-registry.json', 'utf8'));
const iids = Object.keys(registry);
const chunkSize = 20000;

for (let i = 0; i < iids.length; i += chunkSize) {
    const chunk = {};
    const slice = iids.slice(i, i + chunkSize);
    slice.forEach(id => chunk[id] = registry[id]);
    
    const shardNum = (i / chunkSize) + 1;
    fs.writeFileSync(`public_registry_shard_${shardNum}.json`, JSON.stringify(chunk, null, 2));
    console.log(`✔ Shard ${shardNum} created.`);
}
