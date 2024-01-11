import { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({children}) => {
    const [location,setLocation] = useState({
  lat:0,
  long:0
    }
)

    return (
        <LocationContext.Provider value={{location, setLocation}}>
        {children}
        </LocationContext.Provider>
    )
}