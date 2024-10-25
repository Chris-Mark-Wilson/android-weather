import React from "react";
import { View, StyleSheet} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import{API_KEY} from '@env'


export const LocationFinder = ({ setLocation }) => {
  function setNewLocation(details) {
    // on select from dropdown
    // console.log(JSON.stringify(details,null,"  "),"location details in locationFinder.js")

    setLocation({
      lat: details.geometry.location.lat,
      lon: details.geometry.location.lng,
      place: details.formatted_address,
    });
  }

  return (
    <>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="Search for a location"
          onPress={(data, details) => {
            setNewLocation(details);
          }}
          query={{
            key: API_KEY,
            language: "en",
            types: ["geocode"],
          }}
          onFail={(error) => console.log(error)}
          styles={{
     
            textInput: styles.textInput,
          }}
        />
      </View>
    </>
  );
};
// honestly dont mess with this unless you want pain and suffering
// it took me 2 days to get this to work
// i dont know why it works
// but it works
// dont touch it
// dont even look at it
// just dont
const styles = StyleSheet.create({
  container: {
    //keep on top or cant see results
    zIndex: 2,
    position: "absolute",
    top: 0,
    //needs flex 1 or cant see results
    flex: 1,
    // height: "10%",
    width: "100%",
    backgroundColor: "skyblue",
  },


  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    backgroundColor: "white",
  },
});