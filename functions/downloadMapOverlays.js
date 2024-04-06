import * as FileSystem from "expo-file-system";


export const downloadMapOverlays = async (urlList) => {

    // iterate over urlList object, download each image and save to file system

     const uriList = {};
     for(let layerName in urlList){
            uriList[layerName]={};
            for(let timestep in urlList[layerName].timesteps){
                try{
                    // again using proxy to get round the http problem
                    //encodeURIComponent ensures the incoming url with its own query string is not truncated
                    // console.log(urlList[layerName].timesteps[timestep],"url in downloadMapOverlays")
                    //old proxy server url = https://met-office-api-proxy.onrender.com/png
                const uri = await FileSystem.downloadAsync(`https://cmwebserver.ddns.net/metserver.php/png?meturl=${encodeURIComponent(urlList[layerName].timesteps[timestep])}`,FileSystem.documentDirectory+`${layerName}_${timestep}.png`);
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
