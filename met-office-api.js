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
        console.log(url,'url in getCapabilities')
        //use proxy server to get around http met url issue
     
        //old proxy server url = https://met-office-api-proxy.onrender.com/proxy
    const response = await axios.get(`https://cmwebserver.ddns.net/metserver.php/capabilities?meturl=${url}`);
    console.log(response,'response in getCapabilities')
    // alert(`${url},${JSON.stringify(response.data,null,1)}`)
    // console.log(JSON.stringify(response.data,null,1),"response data in weather map api")
    return response.data;
    }
    catch (error){
        if (error.request)console.log(error.request,"error response in weather map api");
        console.log(error,"error in weather map api");
        return Promise.reject(`${error} error from getCapabilities, key = ${key}`);
    }
}