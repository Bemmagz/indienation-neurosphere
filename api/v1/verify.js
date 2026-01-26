const fs = require('fs');
const registry = JSON.parse(fs.readFileSync('../../genesis-registry.json', 'utf8'));

export default function handler(req, res) {
    const { iid } = req.query;
    if (registry[iid]) {
        res.status(200).json({ status: "VERIFIED", data: registry[iid] });
    } else {
        res.status(404).json({ status: "NOT_FOUND", message: "Invalid Identity" });
    }
}
