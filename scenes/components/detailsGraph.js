import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
export const Details=()=> {
  const [hourlyData,setHourlyData] = useState([

    {
      time: "12:00 AM",
      temp: 65,
      precip: 0.1,
      humidity: 0.7,
      wind: 5,
      icon: "cloudy",
    },
    {
      time: "1:00 AM",
      temp: 65,
      precip: 0.1,
      humidity: 0.7,
      wind: 5,
      icon: "cloudy",
    },
    {
      time: "2:00 AM",
      temp: 65,
      precip: 0.1,
      humidity: 0.7,
      wind: 5,
      icon: "cloudy",
    },
    {
      time: "3:00 AM",
      temp: 65,
      precip: 0.1,
      humidity: 0.7,
      wind: 5,
      icon: "cloudy",
    },
    {
      time: "4:00 AM",
      temp: 65,
      precip: 0.1,
      humidity: 0.7,
      wind: 5,
      icon: "cloudy",
    },
    {
      time: "5:00 AM",
      temp: 65,
      precip: 0.1,
      humidity: 0.7,
      wind: 5,
      icon: "cloudy",
    },
    {
      time: "6:00 AM",
      temp: 65,
      precip: 0.1,
      humidity: 0.7,
      wind: 5,
      icon: "cloudy",
    },
  ]);
  useEffect(() => {
    //get data from api
    },[]);

    return (
      <View style={styles.container}>
        <FlatList
        horizontal={true}
          data={hourlyData}
          renderItem={({ item }) => (
            <View style={{borderColor:"black",borderWidth:2,width:100,margin:12, alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:"black"}}>{item.time}</Text>
              <Text>Temp:{item.temp}</Text>
              <Text>Rain:{item.precip}</Text>
              <Text>%RH:{item.humidity}</Text>
              <Text>Wind:{item.wind}</Text>
              <Text>Icon:{item.icon}</Text>
            </View>
          )}
          keyExtractor={(item) => item.time}
          />
        
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:"row",
      borderRadius: 10,

    },
  });