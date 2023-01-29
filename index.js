const fs = require("fs");
const _ = require('lodash')
const imageUrls = require('./imageUrls.json');
const DOWNLOAD_FOLDER = 'downloads';

//check for downloads folder and create downloadeds folder incase, it doesn't exist
if (!fs.existsSync(DOWNLOAD_FOLDER)) {
    fs.mkdirSync(DOWNLOAD_FOLDER);
}

//returning path to downloads folder with index of element as a name of file and png as its type
function getIndexedFileName(i) {
    return ("./downloads/" + i + ".png");
}

//asynchronous function to download images from imageUrls.json file
async function downloadImages(imageUrls) {
    //loop that runs through whole array of images and return single url and it's index in array
    for (let [i, imageUrl] of imageUrls.entries()) {
        const fileNameWithPath = getIndexedFileName(i + 1);
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFileSync(fileNameWithPath, buffer);
        //by such way of changing response in buffer we can easily write it in output image file
    }
}

function start() {
    const uniqImageUrls = _.uniq(imageUrls);//removes duplicates
    downloadImages(uniqImageUrls);
}

start();