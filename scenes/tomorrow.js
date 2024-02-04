import React ,{useEffect,useContext}from 'react';
import {LocationContext} from '../contexts/locationContext';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { HourlyScroll } from './components/hourlyScroll';

export  const Tomorrow = () => {

  const { location } = useContext(LocationContext);

  
 

  //set date for 24hours after todays date
      const date=new Date()
      date.setDate(date.getDate() + 1);
  
      const tomorrow=date.toISOString().slice(0,10);
      console.log(tomorrow,"date in tomorrow")
  



    return (
    
        <View style={styles.container}>
          <View style={styles.date}>
          <Text style={styles.dateText}>{new Date(tomorrow).toDateString()}</Text>
          </View>
            <HourlyScroll location={location} date={tomorrow}/>
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
        dateText:{
    
    padding:0,
    margin:0,
          height:40,
          fontSize:20,
          fontWeight:"bold",
paddingTop:5,
paddingBottom:"auto",
          width:"100%",
 
        textAlign:"center",
        alignContent:"center",
          backgroundColor:"lightblue",
          justifyContent:"center",
          alignItems:"center",
          borderWidth:1,
          borderColor:"blue",
        },  
     

      });