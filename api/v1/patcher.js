const fs = require('fs');
const path = require('path');

async function patchIdentity(iid, realName) {
    try {
        const idNum = parseInt(iid.split('-').pop());
        const shardNum = Math.ceil(idNum / 20000);
        const filePath = path.resolve(__dirname, `../../../certificates/shard_${shardNum}/${iid}.svg`);
        
        if (!fs.existsSync(filePath)) return { status: 'error', message: 'IID Not Found' };

        let svgContent = fs.readFileSync(filePath, 'utf8');
        
        // Neuro-Patching: Ganti GENESIS HOLDER dengan Nama Asli
        let patchedSvg = svgContent.replace('GENESIS HOLDER', realName.toUpperCase());
        
        // Tambahkan Metadata Founder Signature (Digital Seal)
        const seal = ``;
        patchedSvg = patchedSvg.replace('</svg>', `${seal}</svg>`);

        return { status: 'success', svg: patchedSvg };
    } catch (err) {
        return { status: 'error', message: err.message };
    }
}

// CLI Execution Support
if (require.main === module) {
    const args = process.argv.slice(2);
    patchIdentity(args[0], args[1]).then(res => console.log(JSON.stringify(res)));
}
