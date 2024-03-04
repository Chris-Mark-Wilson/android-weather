import { MET_API } from "@env";

import { getCapabilities } from "../met-office-api.js";

export const getMapOverlayUrls = async () => {
  try {
    //get capability data from met office api
    const data = await getCapabilities();

    const urlList = {};
    const base_url = data.Layers.BaseUrl.$;
    const layers = data.Layers.Layer;

    //iterate through layers and timesteps to create url list
    layers.forEach((layer, layerIndex) => {
      //create

      layer.Service.Timesteps.Timestep.forEach((timestep, timeIndex) => {
        const url = base_url
          .replace("{LayerName}", layer.Service.LayerName)
          .replace("{ImageFormat}", layer.Service.ImageFormat)
          .replace("{DefaultTime}", layer.Service.Timesteps["@defaultTime"])
          .replace("{Timestep}", timestep)
          .replace("{key}", MET_API);

        //bracket notation used to access and create object property with special characters
        // bloody met office data
        //create object with layer name as key and object with timestep as key and url as value
        if (layer && layer["@displayName"]) {
          // if layer name not in url list create it, call it layer
          if (!urlList[layer["@displayName"]]) {
            urlList[layer["@displayName"]] = {};
          }
          // if timesteps not in layer create it
          if (!urlList[layer["@displayName"]].timesteps) {
            urlList[layer["@displayName"]].timesteps = {};
          }
          // add timestep url to layer
          urlList[layer["@displayName"]].timesteps[timestep] = url;
        }
      });
      // add default time to layer so we know where to start the sequence
      if (urlList[layer["@displayName"]]) {
        urlList[layer["@displayName"]].defaultTime =
          layer.Service.Timesteps["@defaultTime"];
      }
    });

    return urlList;
  } catch (err) {
    console.log(err, "error in getMapOverlayUris");
    return Promise.reject(`${err}, error in getMapOverlayUris`);
  }
};
