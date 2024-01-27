import React ,{useEffect,useContext}from 'react';
import {LocationContext} from '../contexts/locationContext';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import { getTomorrowsWeather } from '../open-meteo-api';

export  const Tomorrow = () => {

  const { location } = useContext(LocationContext);

  useEffect(() => {
 
  //   if(location.lat){
  //   getTomorrowsWeather(location)
  //   .then((data) => {
  //     console.log(JSON.stringify(data, null, 2),"tomorrow");
  //   })
  //   .catch((error) => {
  //     console.log(error, "error in tomorrow.js");
  //   });
  // }
    },[location]);


    return (
    
        <View style={styles.container}>
      
          <View style={styles.dailyWeather}>  
            <Text>Tomorrows Weather</Text>
          </View>
          <View style={styles.details}> 
            <Text>Details</Text>
          </View>
        <StatusBar style="auto" />
        </View>
       
    );
    }
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
     
        dailyWeather: {
          flex:0.75,
          backgroundColor:'lightblue',
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%",

        },
        details: {
          flex:0.25,
          backgroundColor:"orange",
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%",

        },
      });