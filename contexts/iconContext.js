import { Asset, useAssets } from "expo-asset";
import { createContext, useEffect, useState } from "react";

export const IconContext = createContext();

export const IconProvider = ({ children }) => {
  const [iconMap, setIconMap] = useState({});
  const [assets, error] = useAssets([
    require('../assets/weather-icons/PNG/128/day_clear.png'),
    require('../assets/weather-icons/PNG/128/angry_clouds.png'),
    require('../assets/weather-icons/PNG/128/mist.png'),
    require('../assets/weather-icons/PNG/128/thunder.png'),
    require('../assets/weather-icons/PNG/128/snow.png'),
    require('../assets/weather-icons/PNG/128/fog.png'),
    require('../assets/weather-icons/PNG/128/sleet.png'),
    require('../assets/weather-icons/PNG/128/rain.png'),
    require('../assets/weather-icons/PNG/128/tornado.png'),
    require('../assets/weather-icons/PNG/128/overcast.png'),
    require('../assets/weather-icons/PNG/128/night_half_moon_clear.png'),
    require('../assets/weather-icons/PNG/128/snow_thunder.png'),
    require('../assets/weather-icons/PNG/128/rain_thunder.png'),
  ]);

  useEffect(() => {
    if (assets) {
      const loadedIcons = {
        day_clear: assets[0],
        angry_clouds: assets[1],
        mist: assets[2],
        thunder: assets[3],
        snow: assets[4],
        fog: assets[5],
        sleet: assets[6],
        rain: assets[7],
        tornado: assets[8],
        overcast: assets[9],
        night_half_moon_clear: assets[10],
        snow_thunder: assets[11],
        rain_thunder: assets[12],
      };

      setIconMap(loadedIcons);
    }
  }, [assets]);

  if (error) {
    console.error('Error loading assets:', error);
  }

  return (
    <IconContext.Provider value={{ iconMap }}>
      {children}
    </IconContext.Provider>
  );
};