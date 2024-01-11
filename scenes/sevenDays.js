import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';



export  const SevenDays = () => {
    return (
    
        <View style={styles.container}>
      
          <View style={styles.currentWeather}>  
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
          backgroundColor:"blue",
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%",

        },
        details: {
          flex:0.25,
          backgroundColor:"green",
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%",

        },
      });