import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';



export  const Tomorrow = () => {
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