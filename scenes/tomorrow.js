import React ,{useEffect,useContext}from 'react';
import {LocationContext} from '../contexts/locationContext';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { HourlyScroll } from './components/hourlyScroll';

export  const Tomorrow = () => {

  const { location } = useContext(LocationContext);

  
 


      const date=new Date().toISOString().slice(0,10);
      console.log(date,"date in tomorrow")
  



    return (
    
        <View style={styles.container}>
      
          <View style={styles.dailyWeather}>  
            <Text>Tomorrows Weather</Text>
          </View>
      
            <HourlyScroll location={location} date={date}/>
         
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