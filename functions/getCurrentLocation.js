


import * as Location from 'expo-location';

export const getCurrentLocation= async()=> {

console.log("in getcurrentlocation")
  

    try{
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {

        return Promise.reject('Permission to access location was denied');
      }
console.log('getting location')
    
      let location = await Location.getCurrentPositionAsync();
 console.log('got location',location)
      return location;
    }
    catch (error){

      return Promise.reject(error);
    }
   
  }

  
