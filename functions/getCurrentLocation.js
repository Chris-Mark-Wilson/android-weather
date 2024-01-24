


import * as Location from 'expo-location';

export const getCurrentLocation= async()=> {

// console.log("in getcurrentlocation")
  

    try{
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
console.log("permission not granted" )
        return Promise.reject('Permission to access location was denied');
      }

      console.log("permission granted awaiting location");
      let location = await Location.getCurrentPositionAsync();
      // console.log("location recieved in getCurrentLocation",location);  
      return location;
    }
    catch (error){
      console.log(error,"error in get current location");
      return Promise.reject(error);
    }
   
  }

  
