import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Details } from "./components/detailsGraph";
import { LocationFinder } from "./components/locationFinder";
import { CurrentMain } from "./components/current_main";
import { useContext,useEffect } from "react";
import { LocationContext } from "../contexts/locationContext";
import {getCurrentLocation} from "../functions/getCurrentLocation";
import { HourlyScroll } from "./components/hourlyScroll";

export const Current = () => {

  const {location,setLocation}=useContext(LocationContext);

useEffect(() => {
  console.log("getting location in current.js",location)
  if(!location.place){
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
  })
  .catch((error)=>{
    console.log(error,"error in get current location, locationFinder.js");
  })
}
},[location])

  return (
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
