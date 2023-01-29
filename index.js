const fs = require("fs");
const _ = require('lodash')
const imageUrls = require('./imageUrls.json');
const DOWNLOAD_FOLDER = 'downloads';


if (!fs.existsSync(DOWNLOAD_FOLDER)) {
    fs.mkdirSync(DOWNLOAD_FOLDER);
}

//returning last slug from url as string to use as filename
function getIndexedFileName(i) {
    return ("./downloads/" + i + ".png");
}

async function downloadImages(imageUrls) {
    for (let [i, imageUrl] of imageUrls.entries()) {
        const fileNameWithPath = getIndexedFileName(i + 1);
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFileSync(fileNameWithPath, buffer);
    }

}

function start() {
    const uniqImageUrls = _.uniq(imageUrls);//removes duplicates
    downloadImages(uniqImageUrls);
}

start();