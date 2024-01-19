import React, { useContext, useEffect } from "react";
import { View, StyleSheet} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import{API_KEY} from '@env'
import { LocationContext } from "../../contexts/locationContext.js";
import { getCurrentLocation } from "../../functions/getCurrentLocation.js";

export const LocationFinder = () => { 

const {location,setLocation}=useContext(LocationContext);
useEffect(() => {
  console.log("getting location in locationFinder.js",location)
  if(!location){
  getCurrentLocation()
  .then((location)=>{
    console.log(location," got location in locationFinder.js")
    setLocation(()=> {
      return{
      lat:location.coords.latitude,
      lon:location.coords.longitude,
      place:"Current location"
      }
    })
  })
  .catch((error)=>{
    console.log(error,"error in get current location, locationFinder.js");
  })
}
},[location])

  function setNewLocation(details){
  // on select from dropdown
  // console.log(JSON.stringify(details,null,"  "),"location details in locationFinder.js")
    setLocation({
      lat:details.geometry.location.lat,
      lon:details.geometry.location.lng,
      place:details.formatted_address
    })
  }
  

  return (
    <>
    <View style={styles.container}>
      <GooglePlacesAutocomplete
      fetchDetails = {true}
        placeholder="Search for a location"
        onPress={(data, details) => {
        
          setNewLocation(details)
        }}
        query={{
          key: API_KEY , 
          language: "en", 
          types:[ "geocode"]
        }}
        onFail={(error)=>console.log(error)}
        styles={{
          textInput: styles.textInput,
        }}
      />

    </View>
      </>
  );
  
};

const styles = StyleSheet.create({
  container: {
    //keep on top or cant see results
    zIndex: 2,
    position: "absolute",
    top:0,
    flex: 0.06,
    // height: "100%",
    width: "100%",
    backgroundColor: "skyblue",
   
  },
  textInput: {
    flex:1,
    // height: 65,
    // width: 60,
    // borderWidth: 1,
    // borderColor: "red",
    // borderRadius: 10,
    // marginTop: 10,
    // marginLeft: 10,
    // marginRight: 10,
    // padding: 10,
  }
})