import { FlatList, StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getWeatherDescription } from "../../functions/getWeatherDescription";
import { useState, useEffect, useRef,useContext } from "react";
import { getHourlyWeather } from "../../open-meteo-api";
import { IconContext } from "../../contexts/iconContext";



export const HourlyScroll = ({ location,date }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const flatListRef = useRef(null);
  const { iconMap, SVG } = useContext(IconContext);

  useEffect(() => {
    // console.log(location,"in hourly scroll effect");

    if (location.place) {
       
      getHourlyWeather(location,date)
        .then((data) => {
        
          const { hourly } = data;
       
        //   console.log(JSON.stringify(hourly, null, 2), "hourly data");

          const newData = hourly.time.map((time, index) => {
            
            return {
              time: new Date(time).toLocaleTimeString("en-US", {
                hour: "numeric",
              }),
              Icon: iconMap[
                getWeatherDescription(
                  hourly.weather_code[index],
                  hourly.is_day[index]
                )[0]
              ],

              weatherDescription: getWeatherDescription(
                hourly.weather_code[index],
                hourly.is_day[index]
              )[1],

                isDay: hourly.is_day[index],

                temperature: hourly.temperature_2m[index],

                feelsLike: hourly.apparent_temperature[index],

                precipitationProbability: hourly.precipitation_probability[index],

                wind: hourly.wind_speed_10m[index],

                cloudCover: hourly.cloud_cover[index],

                humidity: hourly.relative_humidity_2m[index], 

            };
          });


          
            setHourlyData(newData);
      
      
        })
        .catch((e) => console.log(e, "error in hourly scroll catch"));
    }
    // console.log(JSON.stringify(hourlyData,null,1), "hourly data");
  }, [location]);

  useEffect(() => {
      //get time now that matches time in hourlyData
      //scroll to that index
      if (hourlyData.length > 0) {
          const index = hourlyData.findIndex((item) => {
              return item.time === new Date().toLocaleTimeString('en-US', { hour: 'numeric' })
          })
          flatListRef.current.scrollToIndex({ animated: true, index });
      }
  }, [hourlyData])

  return (
      <View style={styles.container}>
      {location.place &&
        <Text style={{...styles.place,backgroundColor:"lightgray"}}>{location.place}</Text>
    
        }
      <FlatList
      
        ref={flatListRef}//used for scroll to index function
        onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
                flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
            });

        }
        }
        data={hourlyData}
        keyExtractor={(item) => item.time}
     
        renderItem={({ item, index }) => (
            
          <LinearGradient
            style={styles.listItem}
            colors={item.isDay === 1 ? ["blue", "skyblue"] : ["black", "grey"]}
          >
              <item.Icon style={styles.icon}/>
                <SVG.overcast style={{...styles.icon,width:`${(item.cloudCover/100)*40}%`,opacity:0.7}}/>
            <Text style={styles.time}>
              {item.time}
            </Text>

            <Text style={styles.weatherDescription}>
              {item.weatherDescription}
            </Text>

            <Text style={styles.temperature}>
              {item.temperature}°C
            </Text>

            <Text style={styles.feelsLike}>
                Feels like {item.feelsLike}°C
            </Text>

           <View style={styles.details}>
            <SVG.rain_icon style={styles.smallIcon}/>
            <Text style={styles.detailsText}> {item.precipitationProbability}% precipitation</Text>
           </View>

           <View style={styles.details}>
            <SVG.water_drop style={styles.smallIcon}/>
            <Text style={styles.detailsText}> {item.humidity}% humidity</Text>
           </View>

           <View style={styles.details}>
            <SVG.wind_icon style={styles.smallIcon}/>
            <Text style={styles.detailsText}> {item.wind}mph</Text>
           </View>
      
            
        
          </LinearGradient>
  
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   //dont mess with this
  //   position:"absolute",
  //   top:"10%",
  //   height:"90%",
  //   width: "100%",
  //   padding: 0,
  //   margin: 0,
  // },
  container:{
    flex:1,
    width:"100%",
    height:"100%",
    backgroundColor:"white"
  },
  
  place:{
   
    height:30,
    textAlign:"center",
    fontSize:20,
    borderWidth:1,
    borderColor:"blue"
  },
  listItem: {
   
   flex:1,
    width: "100%",
    borderWidth: 2,
    borderColor: "orange",
  },
  icon:{
    position:"absolute",
    top:10,
    right:5,
    width:"40%",
    height:"100%",
    padding:0,
    marginLeft:"auto",
    marginRight:"auto"
  },
  time: {
    left: 10,
    fontSize: 30,
    color:"white"
  },
  weatherDescription: {
    width:"50%",
    left: 10,
    fontSize: 16,
    color:"white"
  },
  temperature:{
    left:10,
    fontSize:50,
    color:"white"
  },
    feelsLike:{
        left:10,
        fontSize:20,
        color:"white"
    },
    details:{
        left:10,
        marginTop:5,
        flexDirection:"row",
        justifyContent:"flex-start",
        width:"50%",
        color:"white"
    },
    precipitation:{

    },
    detailsText:{
        fontSize:20,
        color:"white"
    },
    
});
