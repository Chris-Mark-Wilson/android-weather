// const fs=require('fs').promises;
const axios = require('axios');
const MET_API='d67dc27c-0608-4355-8d84-e403bfc056bf';
const fs = require('fs');
const path = require('path');

const getCapabilities = async (location) => {
    const MET_URL="http://datapoint.metoffice.gov.uk/public/data/";
    const resource="layer/wxfcs/all/json/capabilities?key=";
    const key=MET_API;
    const url=`${MET_URL}${resource}${key}`;
    try{
    const response = await axios.get(url);
    return response.data;
    }
    catch (error){
        console.log(error,"error in weather map api");
        return Promise.reject(error);
    }
}
const getPic = async () => {
    const LayerName = "Precipitation_Rate";
    const ImageFormat = "png";
    // default time must be same as returned from capabilities
    const DefaultTime = "2024-01-26T03:00:00";
    const Timestep = "3";
    const url = `http://datapoint.metoffice.gov.uk/public/data/layer/wxfcs/${LayerName}/${ImageFormat}?RUN=${DefaultTime}Z&FORECAST=${Timestep}&key=${MET_API}`;
  
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    console.log(response.data,"response data")
    const buffer = Buffer.from(response.data, 'binary');
    fs.writeFileSync(path.resolve(__dirname, 'image.png'), buffer);
  };


// getCapabilities()
// .then((data) => {
//   console.log(JSON.stringify(data,null,1))

// fs.writeFile('./data.json',JSON.stringify(data,null,1))
// .then(()=>console.log("file written"))
    
// })
// .catch((err) => console.log(err));

getPic()
  .then(() => console.log('Image downloaded and saved as image.png'))
  .catch((error) => console.error(error));

