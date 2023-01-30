const fs = require("fs");
const _ = require('lodash')
const imageUrls = require('./imageUrls.json');
const DOWNLOAD_FOLDER = 'downloads';
const sharp = require('sharp');
const prompts = require('prompts');

let width;
let format = "";

//check for downloads folder and create downloadeds folder incase, it doesn't exist
if (!fs.existsSync(DOWNLOAD_FOLDER)) {
    fs.mkdirSync(DOWNLOAD_FOLDER);
}

//returning path to downloads folder with index of element as a name of file and png as its type
function getIndexedFileName(i) {
    return ("./downloads/" + i + "." + format);
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
        await sharp(buffer).resize(width).toFile(fileNameWithPath, function (err) {
            if (err) { console.log(err) };
        });
        // await fs.writeFileSync(fileNameWithPath, buffer);
        //by such way of changing response in buffer we can easily write it in output image file
    }
}

async function start() {
    const uniqImageUrls = _.uniq(imageUrls);//removes duplicates

    //asking user for width and saving it in width variable
    const userInputWidth = await prompts({
        name: 'value',
        type: 'number',
        message: 'enter width of image you want to download:\n',
    });
    width = userInputWidth.value;

    //making user choose format from list then starting download process
    const userInputFormat = await prompts({
        name: 'value',
        type: 'select',
        message: 'choose image format from the list below:\n',
        choices: [
            { title: 'JPEG', value: 'jpeg' },
            { title: 'PNG', value: 'png' },
            { title: 'WEBP', value: 'webp' },
            { title: 'AVIF', value: 'avif' },
            { title: 'TIFF', value: 'tiff' },
            { title: 'GIF', value: 'gif' },
            { title: 'DZI', value: 'dzi' }
        ]
    });
    format = userInputFormat.value;

    downloadImages(uniqImageUrls);

    console.log('Download complete!');
}

start();