import axios from 'axios';

const BASE_URL='https://api.open-meteo.com/v1/forecast?'

export const getCurrentWeather = async (location) => {  
    try{
    const response = await axios.get(`${BASE_URL}latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&wind_speed_unit=mph`);
    return response.data;
    } 
    catch (error){
        console.log(error,"error in current api");
        return Promise.reject(error);
    }
}



export const getHourlyWeather = async (location,date=new Date().toISOString().slice(0,10)) => {   
   date=new Date(date).toISOString().slice(0,10)

    try{
    const response = await axios.get(`${BASE_URL}latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,snowfall,weather_code,wind_speed_10m,cloud_cover,is_day&wind_speed_unit=mph&start_date=${date}&end_date=${date}`);
    return response.data;
    } 
    catch (error){
        console.log(error,"error in hourly api");
        return Promise.reject(error);
    }
}

export const getSevenDayForecast = async (location) => {
    try{
        const response = await axios.get(`${BASE_URL}latitude=${location.lat}&longitude=${location.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max`)
               return response.data;
    }
    catch (error){
        console.log(error,"error in seven day api");
        return Promise.reject(error);
    }
}



