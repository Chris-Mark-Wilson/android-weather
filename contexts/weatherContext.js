import { createContext, useState } from "react";



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