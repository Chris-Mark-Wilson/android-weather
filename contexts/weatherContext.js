import { createContext, useState } from "react";
import * as SVG from '../assets/weather-icons/SVG';
export const IconContext = createContext();
export const IconProvider = ({children}) => {

  //ensure these are exported from assets/SVG/index.js

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
        time:0,
        interval:0,
        temperature_2m:0,
        relative_humidity_2m:0,
        apparent_temperature:0,
        is_day:0,
        precipitation:0,
        rain:0,
        showers:0,
        snowfall:0,
        weather_code:0,
        cloud_cover:0, 
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