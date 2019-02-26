const fs = require('fs');
const path = require('path');
const unzip = require('unzip');

const rootPath = __dirname;
const compressDescFile = path.join(rootPath, 'www.zip');
const unlinkFile = path.join(rootPath, 'www');
try {
    fs.createReadStream(compressDescFile).pipe(unzip.Extract({path: rootPath}));
    fs.unlinkSync(unlinkFile)
} catch (e) {
    console.error(e);
}
