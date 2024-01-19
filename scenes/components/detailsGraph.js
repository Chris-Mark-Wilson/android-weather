import React, { useEffect,useState,useContext,useRef } from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import { LocationContext } from '../../contexts/locationContext';
import { IconContext } from '../../contexts/weatherContext';
import { getHourlyWeather } from '../../weather-api';
import { getWeatherDescription } from '../../functions/getWeatherDescription';
import { LinearGradient } from 'expo-linear-gradient';
import {Canvas, Path} from "@shopify/react-native-skia";
export const Details=()=> {
  const [hourlyData,setHourlyData] = useState([]);
  const { iconMap,SVG } = useContext(IconContext);
  const flatListRef = useRef(null);


  
  const { location } = useContext(LocationContext);

useEffect(()=>{
if(location.lat){
  getHourlyWeather(location)
  .then((data)=>{
    console.log(JSON.stringify(data,null,4)," - hourly weather detailsGraph.js");
    //24 hours of data, 1 hour intervals
    //create ranges max-min for each data point
    
    const tempRange = [Math.min(...data.hourly.apparent_temperature),Math.max(...data.hourly.apparent_temperature)];
    const tempMultiplier=70/((Math.round(tempRange[1]-tempRange[0]))+1);
    console.log(tempMultiplier," -temp multiplier")

    const precipRange = [Math.min(...data.hourly.precipitation_probability),Math.max(...data.hourly.precipitation_probability)];
    const precipMultiplier=80/((Math.round(precipRange[1]-precipRange[0]))+1);
    console.log(precipMultiplier," -precip multiplier")

    const snowRange = [Math.min(...data.hourly.snowfall),Math.max(...data.hourly.snowfall)];
    const snowMultiplier=75/((Math.round(snowRange[1]-snowRange[0]))+1);
    console.log(snowMultiplier," -snow multiplier")
    
    const windRange = [Math.min(...data.hourly.wind_speed_10m),Math.max(...data.hourly.wind_speed_10m)];
    const windMultiplier=60/((Math.round(windRange[1]-windRange[0]))+1);
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
      weatherCode:data.hourly.weather_code[index],
      cloudCover:data.hourly.cloud_cover[index],
 
    };
    
  })
  setHourlyData(newData);
  })

  .catch((error)=>{
    console.log(error,"error in hourly weather");
  })
}
},[location])

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
          <Text style={{...styles.keyText,color:"red"}}>Temp</Text>
          <Text style={{...styles.keyText,color:"blue"}}>Rain%</Text>
          <Text style={{...styles.keyText,color:"gray"}}>Snow</Text>
          <Text style={{...styles.keyText,color:"black"}}>Wind</Text>
         
        </View>
      <View style={styles.listContainer}>
        <FlatList
        ref={flatListRef}
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
                  opacity:0.7,
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
      flex: 0.25,
      flexDirection:"column",
      backgroundColor: "green",
      alignItems: "center",
      // justifyContent: "center",
      width: "100%",
      borderRadius: 10,
     
    },
    listContainer: {
      width: "100%",
      height:"85%",
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:"row",
      borderRadius: 10,

    },
    listItem:{
      flex:1,
      // borderColor:"red",
      // borderWidth:2,
      width:80,
      height:140,
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
      
    }
  });