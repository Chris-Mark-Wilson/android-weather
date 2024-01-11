import React, { useContext, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import{API_KEY} from '@env'
import { LocationContext } from "../../contexts/locationContext.js";


export const LocationFinder = ({ setTravelType }) => { 

const {location,setLocation}=useContext(LocationContext);

  function setNewLocation(details){
  // on select from dropdown
  
    setLocation({
      lat:details.geometry.location.lat,
      lon:details.geometry.location.lng
    })
  }
  

  return (
    <>
    <View style={styles.container}>
      <GooglePlacesAutocomplete
      fetchDetails = {true}
        placeholder="Search for a destination"
        onPress={(data, details) => {
            console.log(details,data)
          setNewLocation(details)
        }}
        query={{
          key: API_KEY , 
          language: "en", 
          types:[ "cities"]
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
    zIndex: 2,
    position: "absolute",
    top:0,
    flex: 1,
    width: "100%",
   
  },
  textInput: {
    // height: 50,
    // width: 60,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    // marginTop: 10,
    // marginLeft: 10,
    // marginRight: 10,
    // padding: 10,
  }
})