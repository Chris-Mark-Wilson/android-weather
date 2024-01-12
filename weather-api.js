import axios from 'axios';

const BASE_URL='https://api.open-meteo.com/v1/forecast?'

export const getCurrentWeather = async (location) => {  
    try{
    const response = await axios.get(`${BASE_URL}latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&wind_speed_unit=mph`);
    return response.data;
    } 
    catch (error){
        console.log(error,"error in api");
        return Promise.reject(error);
    }
}

