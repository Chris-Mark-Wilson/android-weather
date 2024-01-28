import axios from 'axios';
import {MET_API} from '@env';   

export const getCapabilities = async () => {

    //wxfcs = forecast data
    //wxobs = observation data
    const MET_URL="http://datapoint.metoffice.gov.uk/public/data/";
    const resource="layer/wxfcs/all/json/capabilities?key=";
    const key=MET_API;
    const url=`${MET_URL}${resource}${key}`;
    try{
    const response = await axios.get(url);
    console.log(JSON.stringify(response.data,null,1),"response data in weather map api")
    return response.data;
    }
    catch (error){
        console.log(error,"error in weather map api");
        return Promise.reject(error);
    }
}