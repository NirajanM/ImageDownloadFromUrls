# ImageDownloaderFromJsonUrlArray

(first make sure you have node installed in your computer)  

to install necessary packages, open up your terminal and run command:  
```
npm i  
```
Put your url links to images in **imageUrls.json** file in the same order as I have in template, you can add any number of urls as you want,  
if you have node version prior to **version 18** then install node fetch as well with this command:  
```
npm i node-fetch 
``` 
then import it inside index.js:  
```
import fetch from "node-fetch";  
```
start up node server with command:  
```
node index.js   
```  

- Enter 1 to enable duplicate urls filter, or any number to disable duplicate urls filter.  
- Enter the width in pixels (aspect ratio for height will be maintained)  
- Choose the available formats for the output, engine will process the output  

Check your downloads folder for downloaded images, make sure to put already downloaded images in seperate folder to avoid overwriting   
(as files are downloaded in selected format with name as -> index of loop)

> This tool is cli based that will be helpful for web developers, combined with random image providing tools such as: picsum (as in imageUrls.json), this tool can be of great use to generate dummy images of specific format, such as next generation formats like webp that are lighter in size
