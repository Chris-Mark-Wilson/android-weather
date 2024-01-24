import * as SVG from '../assets/weather-icons/SVG';
import { createContext } from "react";
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
        'snow_thunder':SVG.snow_thunder,
        'rain_thunder':SVG.rain_thunder,
      }
    return (
        <IconContext.Provider value={{iconMap,SVG}}>
        {children}
        </IconContext.Provider>
    )
}