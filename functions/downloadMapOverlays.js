import * as FileSystem from "expo-file-system";
import * as Network from 'expo-network';


export const downloadMapOverlays = async (urlList) => {
   //set server dependent on my location, i.e. if I am connected to my local network, use the render server else use the apache2 server
    let server="https://cmwebserver.ddns.net/metserver/png.php";
    try{
        const ipAddress=  await Network.getIpAddressAsync()
        console.log(ipAddress,"ip address in downloadMapOverlays");
        if(ipAddress.slice(0,3)==="192") server="https://met-api-proxy-server.onrender.com/png" // if at home use render server
    }
    catch(error){
        console.log(error,"error getting ip address");
        return Promise.reject(`${error} error getting ipaddress from downloadMapOverlays`);
    }



    // iterate over urlList object, download each image and save to file system

     const uriList = {};
     for(let layerName in urlList){
            uriList[layerName]={};
            for(let timestep in urlList[layerName].timesteps){
                try{
                    // again using proxy to get round the http problem
                    //encodeURIComponent ensures the incoming url with its own query string is not truncated
                    // console.log(urlList[layerName].timesteps[timestep],"url in downloadMapOverlays")
                    //old proxy server url = https://met-api-proxy-server.onrender.com/png
                const uri = await FileSystem.downloadAsync(`${server}?meturl=${encodeURIComponent(urlList[layerName].timesteps[timestep])}`,FileSystem.documentDirectory+`${layerName}_${timestep}.png`);
                uriList[layerName][timestep]=uri.uri;
                }
                catch(error){
                    console.log(error,"error in downloadMapOverlays");
                    return Promise.reject(`${error} error from downloadMapOverlays`);
                }
            }
        }
        return uriList;
        //downloads all the radar overlays.png and saves to local file system indexed by layer name and timestep, returns list of file system uris

}
