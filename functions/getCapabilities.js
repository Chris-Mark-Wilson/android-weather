import axios from 'axios';
import {MET_API} from '@env';   
import * as Network from 'expo-network';

export const getCapabilities = async () => {

    //wxfcs = forecast data
    //wxobs = observation data
    const MET_URL="http://datapoint.metoffice.gov.uk/public/data/";
    const resource="layer/wxfcs/all/json/capabilities?key=";
    const key=MET_API;
    const url=`${MET_URL}${resource}${key}`;
   
     //set server dependent on my location, i.e. if I am connected to my local network, use the render server else use the apache2 server
    let server="https://cmwebserver.ddns.net/metserver/capabilities.php";
    try{
        const ipAddress=  await Network.getIpAddressAsync()
        console.log(ipAddress,"ip address in getCapabilities");
        console.log(ipAddress.slice(0,3),"ip address in getCapabilities")
        if (ipAddress.slice(0,3)==="192") server="https://met-api-proxy-server.onrender.com/proxy" // if at home use render server
    }
    catch (error){
        console.log(error,"error getting ip address");
        return Promise.reject(`${error} error getting ipaddress from getCapabilities, key = ${key}`);
    }


            try{
        console.log(url,'url in getCapabilities')
        //use proxy server to get around http met url issue
     
        //old proxy server url = https://met-office-api-proxy.onrender.com/proxy
    const response = await axios.get(`${server}?meturl=${url}`);
    console.log(response,'response in getCapabilities')
    // alert(`${url},${JSON.stringify(response.data,null,1)}`)
    // console.log(JSON.stringify(response.data,null,1),"response data in weather map api")
    return response.data;
    }
    catch (error){
        if (error.request)console.log(error.request,"error response in weather map api");
        console.log(error,"error in weather map api");
        return Promise.reject(`${error} from getCapabilities, key = ${key}, server = ${server} `);
    }
}