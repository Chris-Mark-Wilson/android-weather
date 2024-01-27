import * as FileSystem from "expo-file-system";


export const downloadMapOverlays = async (urlList) => {

    // iterate over urlList object, download each image and save to file system

     const uriList = {};
     for(let layerName in urlList){
            uriList[layerName]={};
            for(let timestep in urlList[layerName].timesteps){
                const uri = await FileSystem.downloadAsync(urlList[layerName].timesteps[timestep],FileSystem.documentDirectory+`${layerName}_${timestep}.png`);
                uriList[layerName][timestep]=uri.uri;
            }
        }
        return uriList;

}
