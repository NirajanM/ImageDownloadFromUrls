# ImageDownloaderFromJsonUrlArray

(first make sure you have node installed in your computer)  
then run command:  
npm i  
to install necessary packages  
Put your Url to images in imageUrls.json file in the same order as I have in template, you can add any number of urls as you want,  
then run :  

node index.js   

command in your terminal  
then enter the width in pixels (aspect ratio for height will be maintained)  
then choose the available formats for the output, engine will process the output  
check your downloads folder for downloaded images, make sure to put already downloaded images in seperate folder to avoid overwriting   
(as files are downloaded in selected format with name as -> index of loop)
