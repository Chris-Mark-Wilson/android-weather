


import * as Location from 'expo-location';

export const getCurrentLocation= async()=> {


  

    try{
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {

        return Promise.reject('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      return location;
    }
    catch (error){
      console.log(error,"error in get current location");
      return Promise.reject(error);
    }
   
  }

  
