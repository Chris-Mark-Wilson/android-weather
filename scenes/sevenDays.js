import React,{useEffect,useState,useContext} from 'react';
import { StyleSheet, Text, View, Button, StatusBar,FlatList } from 'react-native';
import { getSevenDayForecast } from '../open-meteo-api';
import { LocationContext } from '../contexts/locationContext';
import { IconContext } from "../contexts/iconContext";
import { getWeatherDescription } from '../functions/getWeatherDescription';

export  const SevenDays = () => {
  const [sevenDayForecast, setSevenDayForecast] = useState([]);
  const {location} = useContext(LocationContext);

  const { iconMap, SVG } = useContext(IconContext);

  useEffect(() => {
    if(location.place){
    getSevenDayForecast(location).then((response) => {
     
      const data=response.daily
      const maxTemp=[...data.apparent_temperature_max]
      const newSevenDayForecast = maxTemp.map((appTempMax,index) => {
        return {
          Icon:iconMap[
            getWeatherDescription(
              data.weather_code[index],
              true
            )[0]
          ],
          feelsMax:appTempMax,
          feelsMin:data.apparent_temperature_min[index],
          rain:data.precipitation_probability_max[index],
          actualMax:data.temperature_2m_max[index],
          actualMin:data.temperature_2m_min[index],
          date:data.time[index],
          weatherDescription:getWeatherDescription(data.weather_code[index],true)[0]
        }
      })
      setSevenDayForecast(()=>[...newSevenDayForecast])
//{"apparent_temperature_max": [7.4, 7.2, 8.4, 7.5, 6.3, 6.5, 6.8], "apparent_temperature_min": [-4.5, 0.8, -3.4, -1.3, 0.3, 0, 0.8], "precipitation_probability_max": [30, 42, 16, 13, 7, 39, 32], "temperature_2m_max": [10.6, 10.3, 11.5, 11.1, 10, 10.4, 10.5], "temperature_2m_min": [-1.6, 3.1, -1, 1.1, 3.3, 3, 3.7], "time": ["2024-03-04", "2024-03-05", "2024-03-06", "2024-03-07", "2024-03-08", "2024-03-09", "2024-03-10"], "weather_code": [45, 61, 45, 45, 3, 3, 3]} 

 
    })
  
    .catch((error) => {
      console.log(error);
    });
  }
    },[location]);
    return (
    
        <View style={styles.container}>
      
          <View style={styles.title}>  
            <Text style={styles.titleText}>7 Day Forecast</Text>
          </View>
        <FlatList
      
        
          data={sevenDayForecast}
          renderItem={({item}) => {
            return (
              <View style={styles.listItem}>
                <View style={styles.icon}>
                <item.Icon />
                </View>
                <Text style={styles.listText}>{new Date(item.date).toDateString().split(' ')[0]}</Text>
                <Text style={styles.listText}>Max temp: {item.actualMax} °C</Text>
                <Text style={styles.listText}>Min temp: {item.actualMin} °C</Text>
                {/* <Text>Feels like max: {item.feelsMax}</Text>
                <Text>Feels like min: {item.feelsMin}</Text> */}
                <Text style={styles.listText}>Chance of precipitation: {item.rain}%</Text>
                <Text style={{fontSize:20,position:'absolute',top:0,right:10}}>{item.weatherDescription}</Text>
              </View>
            )
          }}
          keyExtractor={(item) => item.date}
        />
        <StatusBar style="auto" />
        </View>
       
    );
    }
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          width:'100%',
          height:'100%',
          backgroundColor: '#fff',
     
        },
        title:{
          width:'100%',
         justifyContent:'center',
         alignItems:'center',
          borderWidth:1,

        },
        titleText:{
          fontSize:20,
          padding:5
        },
        listText:{
          fontSize:20
        },
   
        listItem: {
         flex:1,
          backgroundColor:"lightblue",
          alignItems: 'flexStart',
          justifyContent: 'center',
          width:"100%",
          borderWidth:1,
        },
        icon:{
          position:"absolute",
          top:30,
          right:100,
          width:"15%",
          height:"45%",
          backgroundColor:'blue',
          paddingBottom:10,
          marginLeft:-10,
          marginRight:"auto",
          borderWidth:1,
          borderColor:'black',
          borderRadius:50,
          overflow:'hidden'
        },
        details: {
          flex:0.25,
          backgroundColor:"green",
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%",

        },
      });