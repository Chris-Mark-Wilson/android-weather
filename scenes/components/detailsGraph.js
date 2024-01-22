import React, { useEffect,useState,useContext,useRef } from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import { LocationContext } from '../../contexts/locationContext';
import { IconContext } from '../../contexts/weatherContext';
import { getHourlyWeather } from '../../weather-api';
import { getWeatherDescription } from '../../functions/getWeatherDescription';
import { LinearGradient } from 'expo-linear-gradient';
import {Canvas, Path} from "@shopify/react-native-skia";
export const Details=({location})=> {

  const [hourlyData,setHourlyData] = useState([]);
  const { iconMap,SVG } = useContext(IconContext);
  const flatListRef = useRef(null);
const [tempRange,setTempRange]=useState([]); 
const [precipRange,setPrecipRange]=useState([]);
const [snowRange,setSnowRange]=useState([]);
const [windRange,setWindRange]=useState([]);



  
 

useEffect(()=>{
if(location!=null){
  getHourlyWeather(location)
  .then((data)=>{
   
    //24 hours of data, 1 hour intervals
    //create ranges max-min for each data point

    let range=[0,0]
    
     range=[Math.min(...data.hourly.apparent_temperature),Math.max(...data.hourly.apparent_temperature)];
     if(!tempRange===range) setTempRange(()=>range);
    const tempMultiplier=70/((Math.round(range[1]-range[0]))+1);
    console.log(tempMultiplier," -temp multiplier")

    range = [Math.min(...data.hourly.precipitation_probability),Math.max(...data.hourly.precipitation_probability)];
    if(!precipRange===range) setPrecipRange(()=>range);
    const precipMultiplier=80/((Math.round(range[1]-range[0]))+1);
    console.log(precipMultiplier," -precip multiplier")

    range = [Math.min(...data.hourly.snowfall),Math.max(...data.hourly.snowfall)];
    if(!snowRange===range) setSnowRange(()=>range);
    const snowMultiplier=75/((Math.round(range[1]-range[0]))+1);
    console.log(snowMultiplier," -snow multiplier")
    
    range = [Math.min(...data.hourly.wind_speed_10m),Math.max(...data.hourly.wind_speed_10m)];
    if(!windRange===range) setWindRange(()=>range);
    const windMultiplier=60/((Math.round(range[1]-range[0]))+1);
    console.log(windMultiplier," -wind multiplier")
 
    console.log(tempRange,precipRange,snowRange,windRange," -temp,precip,snow,wind ranges")
    //map each data point to a range of 0-100
   const newData = data.hourly.time.map((time,index)=>{
    return {
      time: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric'}),
      
      //  work out line paths for each data point 

      temp: {path:`M 0 ${80+((tempRange[0]-data.hourly.apparent_temperature[index])*tempMultiplier)} L 80 ${
      80+((tempRange[0]-data.hourly.apparent_temperature[index+1])*tempMultiplier)} `},

      precip:{path:`M 0 ${90+((precipRange[0]-data.hourly.precipitation_probability[index])*precipMultiplier)} L 80 ${90+((precipRange[0]-data.hourly.precipitation_probability[index+1])*precipMultiplier)} Z`},

      snow:{path:`M 0 ${85+((snowRange[0]-data.hourly.snowfall[index])*snowMultiplier)} L 80 ${85+((snowRange[0]-data.hourly.snowfall[index+1])*snowMultiplier)} Z`},

      wind:{path:`M 0 ${70+((windRange[0]-data.hourly.wind_speed_10m[index])*windMultiplier)} L 80 ${70+((windRange[0]-data.hourly.wind_speed_10m[index+1])*windMultiplier)} Z`},

      icon:iconMap[getWeatherDescription(data.hourly.weather_code[index],data.hourly.is_day[index])[0]],

      isDay:data.hourly.is_day[index],
      weatherCode:getWeatherDescription(data.hourly.weather_code[index],data.hourly.is_day[index])[0],
      cloudCover:data.hourly.cloud_cover[index],
 
    };
    
  })
  setHourlyData(newData);
  })

  .catch((error)=>{
    console.log(error,"error in hourly weather");
  })
}
},[location,tempRange,precipRange,snowRange,windRange])

useEffect(()=>{
  //get time now that matches time in hourlyData
  //scroll to that index
  if(hourlyData.length>0){
    const index = hourlyData.findIndex((item)=>{
      return item.time === new Date().toLocaleTimeString('en-US', { hour: 'numeric'})
    })
    flatListRef.current.scrollToIndex({animated: true, index});
  }
},[hourlyData])


    return (
      <View style={styles.details}>
        <View style={styles.key}>
         {/* render key for graph */}
          <Text style={{...styles.keyText,color:"red"}}>{tempRange[0]} . {tempRange[1]} °C</Text>
          <Text style={{...styles.keyText,color:"blue"}}>{precipRange[0]} . {precipRange[1]} %</Text>
          <Text style={{...styles.keyText,color:"gray"}}>{snowRange[0]} . {snowRange[1]} mm</Text>
          <Text style={{...styles.keyText,color:"black"}}>{windRange[0]}/{windRange[1]} mph</Text>
         
        </View>
        <View style={styles.listContainer} >
        <FlatList
        contentContainerStyle={styles.listContainer}
        ref={flatListRef}//used for scroll to index function
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        
        }
      }
        horizontal={true}
          data={hourlyData}
          keyExtractor={(item) => item.time}
          renderItem={({ item,index }) => (
          
            <LinearGradient
            style={styles.listItem}
            colors={item.isDay ? ["blue", "skyblue"] : ["black", "grey"]}
          >
              <Text style={styles.time}>
                {item.time}
              </Text>
              {/* render icon for each hour */}
                <item.icon style={{opacity:1,position:"absolute",width:"100%",height:"100%"}}/>

              {/* cloud cover */}
                {(item.weatherCode === "day_clear" ||
            item.weatherCode === "night_half_moon_clear") &&
              iconMap["overcast"]({
                style: {
                  opacity:1,
                  position: "absolute",
                  width: `${item.cloudCover}%`,
                  height: "100%",
                },
              })}

              {/* render graph for each hour */}
              <Canvas style={styles.canvas}>
                <Path path={item.temp.path}
                color={'red'}
                style={'stroke'}
                strokeWidth={3}/>

                <Path path={item.precip.path} 
                color={'blue'}
                style={'stroke'}
                strokeWidth={3}/>

                <Path path={item.snow.path} 
                color={'white'}
                style={'stroke'}
                strokeWidth={3}/>

                <Path path={item.wind.path} 
                color={'black'}
                style={'stroke'}
                strokeWidth={3}/>
             
              </Canvas>
            </LinearGradient>
           
          )}
         
          />
        
      </View>
      </View>
    );
  }
  const styles = StyleSheet.create({

    details: {
     position:"absolute",
      top:"75%",
      height:"25%",
      flexDirection:"column",
    
      alignItems: "center",
   
      width: "100%",
    
     
    },
    listContainer: {
      // width: "100%",
      height:"100%",
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:"row",
    

    },
    listItem:{
      flex:0,
      // borderColor:"red",
      // borderWidth:2,
      width:80,
      height:"100%",
      padding:0,
      alignItems:'center',
      justifyContent:'center'
    },
    time:{
    
      // backgroundColor:"white",
      // borderColor:"blue",
      // borderWidth:2,
      color:'white',
      width:80,
      height:20,
      textAlign:"center",
    },
    canvas:{
      flex:1,
      // borderColor:"black",
      // borderWidth:2,
      width:80,
      height:100,
      
      // alignItems:'center',
      // justifyContent:'center'
    },
    key:{
      flexDirection:"row",
      justifyContent:"space-around",
      width:"100%",
      height:"15%",
      padding:0,
      backgroundColor:"lightblue",
     
    },
    keyText:{
      textDecorationLine:"underline",
      
      textAlign:'center',
      width:"25%",
      borderWidth:1
      
    }
  });