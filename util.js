const crypto = require('crypto');
const moment = require("moment");
const fs = require("fs");

const initFile = async () => {
    const path = `./__daily_news/${moment().format("YYYY_MM_DD")}.json`
    try {
        await fs.accessSync(path);
    } catch (err) {
        await fs.writeFileSync(path, "[]"); //empty array
    }
    return path
}


function hash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

module.exports = { initFile, hash }