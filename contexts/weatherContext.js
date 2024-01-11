import { createContext, useState } from "react";
export const CurrentContext = createContext();
export const CurrentProvider = ({children}) => {
    const [current,setCurrent] = useState({})
    return (
        <CurrentContext.Provider value={{current, setCurrent}}>
        {children}
        </CurrentContext.Provider>
    )
}

export const tomorrowContext = createContext();
export const TomorrowProvider = ({children}) => {
    const [tomorrow,setTomorrow] = useState({})
    return (
        <tomorrowContext.Provider value={{tomorrow, setTomorrow}}>
        {children}
        </tomorrowContext.Provider>
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