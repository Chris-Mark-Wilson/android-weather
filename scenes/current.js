import React, { useContext, useEffect,useState } from 'react';
import { StyleSheet, Text, View, StatusBar,Image } from 'react-native';
import { Details } from './components/detailsGraph';
import { LocationFinder } from './components/locationFinder';
import { LocationContext } from '../contexts/locationContext';
import { getCurrentWeather } from '../weather-api';
import { getWeatherDescription } from '../functions/getWeatherDescription';
//get all svg icons
import * as SVG from '../assets/weather-icons/SVG';



export  const Current = () => {
//ensure these are exported from assets/SVG/index.js
  const iconMap={
    'day_clear':SVG.day_clear,
    'angry_clouds':SVG.angry_clouds,
    'mist':SVG.mist,
    'thunder':SVG.thunder,
    'snow':SVG.snow,
    'fog':SVG.fog,
    'sleet':SVG.sleet,
    'rain':SVG.rain,
    'tornado':SVG.tornado,
    'overcast':SVG.overcast, 

  }
 //weathercode used to map to sgv component
  const [weatherCode, setWeatherCode] = useState('');
  //WeatherIcon used as background
  const WeatherIcon = iconMap[weatherCode];

  const [description,setDescription]=useState("");

  const [variables,SetVariables]=useState({
    time:0,
    interval:0,
    temperature_2m:0,
    relative_humidity_2m:0,
    apparent_temperature:0,
    is_day:0,
    precipitation:0,
    rain:0,
    showers:0,
    snowfall:0,
    weather_code:0,
    cloud_cover:0, 
  });

const {location}=useContext(LocationContext);

useEffect(() => {
  if(location.long!=0 && location.lat!=0){
    //load current weather
    getCurrentWeather(location)
    .then((data)=>{
      
      SetVariables(data.current)
    })
    .catch((error)=>{
      console.log(error,"error in current.js")
    })

  }  
}, [location]);

useEffect(()=>{
  if(variables.weather_code!=0){
    //gets icon and wmo description based on weathercode
const weatherDescription=getWeatherDescription(variables.weather_code,variables.is_day);
//weather code comes back as icon description/iconMap keyname
setWeatherCode(weatherDescription[0]);
setDescription(weatherDescription[1]);
  }
},[variables])



    return (
    
        <View style={styles.container}>
       
          <LocationFinder/>
         
          <View style={styles.currentWeather}> 
          {description&&
          <>
          
            <WeatherIcon style={{opacity:1,position:"absolute",width: "100%", height: "100%"}} />
            {/* <SVG.rain style={{position:"absolute",width: "100%", height: "100%"}} /> */}
            <Text>Current Weather</Text>
            <Text>Temperature: {variables.temperature_2m}</Text>
            <Text>Humidity: {variables.relative_humidity_2m}</Text>
            <Text>Real feel: {variables.apparent_temperature}</Text>
            <Text>Rain: {variables.rain}</Text>
            <Text>Cloud cover: {variables.cloud_cover}</Text>
            <Text>Wind speed: {variables.wind_speed_10m}</Text>
            <Text>Wind direction: {variables.wind_direction_10m}</Text>
            <Text>Weather code: {variables.weather_code}</Text>
            <Text>Description: {description}</Text>
            </>
        
          }
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
          flex:0.6,
          backgroundColor:"skyblue",
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