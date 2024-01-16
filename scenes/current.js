import React, { useContext, useEffect,useState } from 'react';
import { StyleSheet, Text, View, StatusBar,Image } from 'react-native';
import { Details } from './components/detailsGraph';
import { LocationFinder } from './components/locationFinder';
import { LocationContext } from '../contexts/locationContext';
import { getCurrentWeather } from '../weather-api';
import { getWeatherDescription } from '../functions/getWeatherDescription';
//get all svg icons
import * as SVG from '../assets/weather-icons/SVG';
import { LinearGradient } from 'expo-linear-gradient';




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
    'night_half_moon_clear':SVG.night_half_moon_clear,
  
    
  }
  const {location}=useContext(LocationContext);
  const [placeName,setPlaceName]=useState(location.place);  
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
  const [time,setTime]=useState("");
  const [timer,setTimer]=useState(0);



useEffect(() => {
  if(location.place){
    //load current weather using location
    getCurrentWeather(location)
    .then((data)=>{
      SetVariables(data.current)
      setPlaceName(location.place)
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
useEffect(()=>{
setTimeout(() => {
  setTimer(timer+1)
  setTime(new Date().toLocaleTimeString('en-US'))
},1000);
},[timer])



    return (
    
        <View style={styles.container}>
       
          <LocationFinder/>
         
          <LinearGradient 
          style={styles.currentWeather}
          colors={variables.is_day?['blue','skyblue']:['black','grey']}> 

          {description&&
          <>
          
            <WeatherIcon style={{opacity:0.8,position:"absolute",width: "100%", height:"100%"}} />


            {/* cloud cover */}
            {weatherCode==="day_clear" || weatherCode==="night_half_moon_clear"&&
            SVG.overcast({style:{opacity:1,position:"absolute",width: `${variables.cloud_cover*5}px`, height:"100%"}})}
            
            <Text style={styles.title}>{time}</Text>
            <Text style={styles.placename}>{placeName}</Text>
            <Text style={styles.temp}>{variables.temperature_2m}
            °C</Text>
            <Text style={styles.humidity}><SVG.water_drop style={{height:20, width:20}}/>  {variables.relative_humidity_2m}%</Text>
            <Text style={styles.realFeel}>{variables.apparent_temperature}°C</Text>
            <Text style={styles.rain}><SVG.rain_icon style={{fill:"white",height:20,width:20}}/> {variables.rain}mm</Text>
            <Text style={styles.cloud}><SVG.cloud_icon style={{hieght:0,width:20}}/>  {variables.cloud_cover}%</Text>
            <Text style={styles.windSpeed}><SVG.wind_icon style={{height:20,width:20}}/> {variables.wind_speed_10m}mph</Text>
        
           
            <Text style={styles.description}>{description}</Text>
            </>
        
          }
          </LinearGradient>
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
        title:{
          position:"absolute",
          top:0,
          fontSize:30,
          fontWeight:"bold",
          color:"white",
      
          opacity:1,
          padding:5},

        placename:{
          position:"absolute",
          top:30,
          fontSize:20,
          fontWeight:"bold",
          color:"white",
     
          opacity:1,
          padding:5
        },
        temp:{
          position:"absolute",
          top:60,
          right:0,
          fontSize:80,
          fontWeight:"bold",
          color:"white",
       
          opacity:1,
          padding:5
        },
        realFeel:{
          position:"absolute",
          top:160,
          right:0,
          fontSize:40,
          fontWeight:"bold",
          color:"white",
          opacity:1,
          padding:5
        
        },
        
        humidity:{
          position:"absolute",
          top:100,
          left:20,
          fontSize:20,
          fontWeight:"bold",
          color:"white",

          opacity:1,
          padding:5
        
        },
       
        
        rain:{
          position:"absolute",
          top:140,
          left:20,
          fontSize:20,
          fontWeight:"bold",
          color:"white",
          opacity:1,
          padding:5,
         
          
        },
        cloud:{
          position:"absolute",
          top:180,
          left:20,
          fontSize:20,
          fontWeight:"bold",
          color:"white",
          opacity:1,
          padding:5
        },
        windSpeed:{
          position:"absolute",
          top:220,
          left:20,
          fontSize:20,
          fontWeight:"bold",
          color:"white",
          opacity:1,
          padding:5
        },
        
       
     
        description:{
          
          position:"absolute",
          top:320,
          
          

          fontSize:20,
          fontWeight:"bold",
          color:"white",
          opacity:1,
          padding:5
        },
      });