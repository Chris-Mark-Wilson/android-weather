import { StyleSheet, Text, View, StatusBar,ActivityIndicator } from "react-native";

import { LocationFinder } from "./components/locationFinder";

import { useContext,useEffect,useState } from "react";
import { LocationContext } from "../contexts/locationContext";
import {getCurrentLocation} from "../functions/getCurrentLocation";
import { HourlyScroll } from "./components/hourlyScroll";


export const Current = () => {

  const {location,setLocation}=useContext(LocationContext);
  const [isLoading,setIsLoading]=useState(true)
//display ip address for test purposes  
  // useEffect(()=>{
  //   const getIpAddress=async()=>{
  //   const ipAddress=  await Network.getIpAddressAsync()
  //   alert(ipAddress)
  //   }
  //   getIpAddress()
  // },[])

  useEffect(() => {
    //setInterval introduced to 'kick server till it bloody works' - 1 second interval
    let intervalId;
  
    if (!location.place) {
      setIsLoading(true);
      const getLocation = async () => {
        try {
          const location = await getCurrentLocation();
          setLocation((old) => {
            const newLoc = { ...old };
            newLoc.lat = location.coords.latitude;
            newLoc.lon = location.coords.longitude;
            newLoc.place = "Current location";
            return newLoc;
          });
          setIsLoading(false);
          clearInterval(intervalId); // Clear the interval once location is obtained
        } catch (error) {
          console.log('error getting location', error);
        }
      };
  
      intervalId = setInterval(getLocation, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [location.place]);

  return isLoading?
  <View style={styles.container}>
  <ActivityIndicator size="large" color={"green"}/>
  <Text>{'Getting current location'}</Text>
  </View>

  :(
    <View style={styles.container}>
      <LocationFinder location={location} setLocation={setLocation}/>
    <View style={styles.hourlyScrollContainer}>
      <HourlyScroll location={location} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
hourlyScrollContainer:{
     //dont mess with this
     position:"absolute",
     top:"10%",
     height:"90%",
     width: "100%",
     padding: 0,
     margin: 0,
}

 
});
