import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { Details } from './components/detailsGraph';
import { LocationFinder } from './components/locationFinder';



export  const Current = () => {
    return (
    
        <View style={styles.container}>
       
          <LocationFinder/>
         
          <View style={styles.currentWeather}>  
            <Text>Current Weather</Text>
          </View>
          <View style={styles.details}>
      <Details/>
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
        locationHeader: {
          flex:0.5,
          zIndex:2,
          flexDirection:"row",
          backgroundColor:"magenta",
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding:0,
          margin:0,
          width:"100%",
          borderRadius: 10,
        },
        currentWeather: {
          flex:0.65,
          backgroundColor:"cyan",
         alignItems: 'center',
          justifyContent: 'center',
          width:"100%",
          borderRadius: 10,

        },
        details: {
          flex:0.25,
          backgroundColor:"green",
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%",
          borderRadius: 10,
          paddingLeft:10,
          paddingRight:10,
        },
      });