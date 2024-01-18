import { createContext, useState } from "react";
import * as SVG from '../assets/weather-icons/SVG';
export const IconContext = createContext();
export const IconProvider = ({children}) => {

  //ensure these are exported from assets/SVG/index.js
// map over these using the weather code (string) from getWeatherDescription.js as the key
    const iconMap={
        'day_clear':SVG.day_clear,
        'angry_clouds':SVG.angry_clouds,
        'mist':SVG.mist,
        'thunder':SVG.thunder,
        'snow':SVG.snow,
        'fog':SVG.fog,
        'sleet':SVG.sleet,
        'rain':SVG.rain,
        'tornado':SVG.tornado,
        'overcast':SVG.overcast, 
        'night_half_moon_clear':SVG.night_half_moon_clear,
      }
    return (
        <IconContext.Provider value={{iconMap,SVG}}>
        {children}
        </IconContext.Provider>
    )
}

export const VariablesContext = createContext();
export const VariablesProvider = ({children}) => {
    const [variables,setVariables]=useState({
        time:null,
        interval:null,
        temperature_2m:null,
        relative_humidity_2m:null,
        apparent_temperature:null,
        is_day:null,
        precipitation:null,
        rain:null,
        showers:null,
        snowfall:null,
        weather_code:null,
        cloud_cover:null, 
        wind_speed_10m:null,
      });
    return (
        <VariablesContext.Provider value={{variables, setVariables}}>
        {children}
        </VariablesContext.Provider>
    )
}

export const sevenDaysContext = createContext();
export const SevenDaysProvider = ({children}) => {
    const [sevenDays,setSevenDays] = useState({})
    return (
        <sevenDaysContext.Provider value={{sevenDays, setSevenDays}}>
        {children}
        </sevenDaysContext.Provider>
    )
}