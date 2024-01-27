import { View, Text, StyleSheet} from "react-native"
import { useWindowDimensions } from "react-native"
import { getMapOverlayUris } from "../../functions/getMapOverlayUris"
import {useEffect,useState} from "react"









 export const WeatherMap=({location})=>{

  const [isUK,setIsUK]=useState(false);
 
    useEffect(() => {
      if (location.lat && location.lon) { 
        // console.log(location.lat,"location lat in weather map")
        if (location.lat > 48 && location.lat < 61 && location.lon > -12 && location.lon < 5) {
          setIsUK(true);
        }
        else {
          setIsUK(false);
        } 
      }
    }, [location]);

    useEffect(() => {
      if (isUK) {
        getMapOverlayUris().then((urlList) => {
            //urlList structure is {layerName:timesteps:{timestep:url},defaultTime:time in iso format} timestep is the FORECAST time/element of the url
            // represented as a number in 3 hourly intervals 0 - 36 hours ahead from RUN query (DefaultTime)
            //layerNames are usually (or should be) :
            // Rainfall
            // Cloud
            // CloudAndRain
            // Temperature 
            // Pressure
            // Pressure layer is structured differently, 
            // 0 - 72 hours in 12 hour intervals from RUN query (DefaultTime)
            // defaultTime is the start time of the sequence in iso format
            console.log(JSON.stringify(urlList,null,1),"uris in weather map")
          })
          .catch((err) => console.log(err));
      }
    }, [isUK]);



    const layout = useWindowDimensions();
    // console.log(layout.height,"layout height in weather map")

    return (
        <View style={{...styles.container,height:+`${layout.height}`}}>
            <Text>Weather Map</Text>

            {isUK?<Text>{location.lat},{location.lon}{isUK}</Text>:<Text>Not in uk no radar data available</Text>}

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
       height:"200",
        width:"100%",
        backgroundColor:"lightblue"
    }
})