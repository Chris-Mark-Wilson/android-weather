import { StyleSheet, Text, View, StatusBar,ActivityIndicator } from "react-native";
import { Details } from "./components/detailsGraph";
import { LocationFinder } from "./components/locationFinder";
import { CurrentMain } from "./components/current_main";
import { useContext,useEffect,useState } from "react";
import { LocationContext } from "../contexts/locationContext";
import {getCurrentLocation} from "../functions/getCurrentLocation";
import { HourlyScroll } from "./components/hourlyScroll";
import * as Network from 'expo-network';

export const Current = () => {

  const {location,setLocation}=useContext(LocationContext);
  const [isLoading,setIsLoading]=useState(true)
  
  useEffect(()=>{
    const getIpAddress=async()=>{
    const ipAddress=  await Network.getIpAddressAsync()
    alert(ipAddress)
    }
    getIpAddress()
  },[])

useEffect(() => {

  

  if(!location.place){
    setIsLoading(true)
  getCurrentLocation()
  .then((location)=>{

    setLocation((old)=>{
      const newLoc={...old}
      newLoc.lat=location.coords.latitude,
     newLoc.lon=location.coords.longitude,
      newLoc.place="Current location"
      return newLoc;
    
  }
    )
    setTimeout(()=>{setIsLoading(false)},2000)
  })
  .catch((error)=>{
    console.log(error,"error in get current location, locationFinder.js");
  })
}
else { setTimeout(()=>{setIsLoading(false)},1000)}
},[location])

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
