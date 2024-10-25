import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import { getSevenDayForecast, getHourlyWeather } from "../open-meteo-api";
import { LocationContext } from "../contexts/locationContext";
import { IconContext } from "../contexts/iconContext";
import { getWeatherDescription } from "../functions/getWeatherDescription";
import {FontAwesome5} from '@expo/vector-icons'

import { Image } from "expo-image";

export const SevenDays = () => {
  const [sevenDayForecast, setSevenDayForecast] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const { location } = useContext(LocationContext);
  const [modalDate, setModalDate] = useState(null);

  const { iconMap } = useContext(IconContext);

  useEffect(() => {
//  console.log(iconMap,"iconMap in 7days")
    if (location.place) {
      getSevenDayForecast(location)
        .then((response) => {
          console.log('response in 7day')
          const data = response.daily;

          const maxTemp = [...data.apparent_temperature_max];
          const newSevenDayForecast = maxTemp.map((appTempMax, index) => {
            return {
              image: iconMap[
                getWeatherDescription(data.weather_code[index], true)[0]
              ],
              feelsMax: appTempMax,
              feelsMin: data.apparent_temperature_min[index],
              rain: data.precipitation_probability_max[index],
              actualMax: data.temperature_2m_max[index],
              actualMin: data.temperature_2m_min[index],
              date: data.time[index],
              weatherDescription: getWeatherDescription(
                data.weather_code[index],
                true
              )[0],
            };
          });
         return newSevenDayForecast;
          //{"apparent_temperature_max": [7.4, 7.2, 8.4, 7.5, 6.3, 6.5, 6.8], "apparent_temperature_min": [-4.5, 0.8, -3.4, -1.3, 0.3, 0, 0.8], "precipitation_probability_max": [30, 42, 16, 13, 7, 39, 32], "temperature_2m_max": [10.6, 10.3, 11.5, 11.1, 10, 10.4, 10.5], "temperature_2m_min": [-1.6, 3.1, -1, 1.1, 3.3, 3, 3.7], "time": ["2024-03-04", "2024-03-05", "2024-03-06", "2024-03-07", "2024-03-08", "2024-03-09", "2024-03-10"], "weather_code": [45, 61, 45, 45, 3, 3, 3]}
        })
        .then((forecast) => {
          console.log('got forecast')
          setSevenDayForecast(() => [...forecast]);
        })

        .catch((error) => {
          console.log('error in 7days effect',error);
        });
    }
  }, [location]);

  const handlePressed = async (date) => {
    console.log(date);
    const response = await getHourlyWeather(location, date);
    const data = response.hourly;
    const hourlyArray = data.time.map((element, index) => {
      return {
        time: new Date(element).toLocaleTimeString("en-US", {
          hour: "numeric",
        }),
        feelsLike: data.apparent_temperature[index],
        rain:data.precipitation_probability[index],
        isDay:data.is_day[index],
        //capital Icon because its an SVG
        image: iconMap[
          getWeatherDescription(
            data.weather_code[index],
            data.is_day[index]
          )[0]
        ]
      };
    });
    setModalData(() => hourlyArray);
    setModalDate(() => date);
    setShowModal(true);
  };
  //{"apparent_temperature": [1.3, 0.8, 0.4, 0.2, 0.4, 1.1, 1.3, 1.3, 2.1, 3.8, 5.2, 6.1, 6.8, 7.1, 7.2, 6.8, 6, 5.2, 4.3, 3, 1.6, 1, 0.4, -0.2], "cloud_cover": [3, 25, 43, 43, 96, 100, 70, 66, 46, 58, 19, 77, 80, 81, 87, 77, 73, 62, 66, 38, 46, 46, 24, 29], "is_day": [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], "precipitation_probability": [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 6, 10, 13, 12, 11, 10, 7, 3, 0, 0, 0, 0, 0, 0], "relative_humidity_2m": [96, 97, 97, 97, 98, 97, 98, 97, 96, 90, 83, 74, 69, 64, 64, 65, 74, 75, 80, 85, 88, 90, 93, 94], "temperature_2m": [3.8, 3.3, 3, 2.7, 2.8, 3.3, 3.7, 3.9, 4.5, 6.1, 7.9, 9.6, 10.4, 10.9, 10.9, 10.7, 9.9, 8.8, 7.6, 6.2, 4.9, 4.1, 3.3, 2.7], "time": ["2024-03-07T00:00", "2024-03-07T01:00", "2024-03-07T02:00", "2024-03-07T03:00", "2024-03-07T04:00", "2024-03-07T05:00", "2024-03-07T06:00", "2024-03-07T07:00", "2024-03-07T08:00", "2024-03-07T09:00", "2024-03-07T10:00", "2024-03-07T11:00", "2024-03-07T12:00", "2024-03-07T13:00", "2024-03-07T14:00", "2024-03-07T15:00", "2024-03-07T16:00", "2024-03-07T17:00", "2024-03-07T18:00", "2024-03-07T19:00", "2024-03-07T20:00", "2024-03-07T21:00", "2024-03-07T22:00", "2024-03-07T23:00"], "weather_code": [1, 1, 2, 2, 3, 3, 2, 2, 2, 2, 1, 2, 2, 3, 3, 3, 2, 2, 2, 1, 2, 2, 1, 1], "wind_speed_10m": [3.8, 3.5, 3.8, 3.2, 3.1, 2.3, 3.4, 4.5, 4, 4.5, 6.4, 9.8, 10, 10.2, 10.3, 11.1, 11.5, 9.9, 8.1, 7.5, 7.2, 5.9, 4.9, 4.6]}


  const BackButton=()=>{
    return(
    <Pressable
    onPress={() => setShowModal(false)}
   
  >
    <View style={styles.backButton}>
    <Text style={{color:'white'}}     
    >
      Back
    </Text>
    </View>
  </Pressable>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>7 Day Forecast</Text>
      </View>

      {/* Modal showing daily weather details */}
      <Modal
        animationType="fade" //,slide on none
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <View>
            <Text style={{fontSize:20}}>{new Date(modalDate).toDateString()}</Text>
          </View>
          <FlatList
            data={modalData}
            keyExtractor={(item) => item.time}
            // ListFooterComponent={<BackButton />}
            renderItem={({ item }) => {
              return (
                //Hourly data
            
                <Pressable
                  onPress={() => setShowModal(false)}
                  style={{
                    ...styles.modalListItem,
                    backgroundColor: item.isDay ? "white" : "grey",
                  }}
                >
                  <Text style={{ color: item.isDay ? "black" : "white",fontSize:14 }}>
                    {item.time}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="temperature-high"
                      style={{ color: item.isDay ? "black" : "white",fontSize:16 }}
                    />
                    <Text style={{ color: item.isDay ? "black" : "white",fontSize:16 }}>
                      {item.feelsLike}°C
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="umbrella"
                      style={{ color: item.isDay ? "black" : "white",fontSize:16 }}
                    />
                    <Text style={{ color: item.isDay ? "black" : "white",fontSize:16 }}>
                      {item.rain}%
                    </Text>
                  </View>
                  <View>
                    {/*fudge to space out with the SVG icon */}
                    <Text>         </Text>
                  </View>

             
                 
                
                  
                </Pressable>
              
                    
              );
            }}
          />
        </View>
        {/* <Details location={location} date={modalDate} /> */}
      </Modal>

      <FlatList
        data={sevenDayForecast}
        renderItem={({ item }) => {
          return (
         
            <Pressable
              style={styles.listItem}
              onPress={() => handlePressed(item.date)}
            >
            
                <Image source={item.image} style={{position:'absolute',left:200,top:20,height:'60%',width:'20%',opacity:0.8}}/>
             
              <Text style={styles.listText}>
                {new Date(item.date).toDateString().split(" ")[0]}
              </Text>
              <Text style={styles.listText}>Max temp: {item.actualMax} °C</Text>
              <Text style={styles.listText}>Min temp: {item.actualMin} °C</Text>
              {/* <Text>Feels like max: {item.feelsMax}</Text>
                <Text>Feels like min: {item.feelsMin}</Text> */}
              <Text style={styles.listText}>
                Chance of precipitation: {item.rain}%
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  position: "absolute",
                  top: 0,
                  right: 10,
                }}
              >
                {item.weatherDescription}
              </Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.date}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  modal: {
    backgroundColor: "lightblue",
    width: "90%",
    height: "90%",
    marginTop:'auto',
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:'auto',
    justifyContent: "center",
    alignItems: "center",
    borderWidth:5,
    borderRadius:20
  },
  modalListItem: {
    flex: 1,
    marginLeft:'auto',
    marginRight:'auto',
    alignItems:'center',
    justifyContent: "space-around",
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "red",
    width: '90%',
    height:40
  },
  title: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  titleText: {
    fontSize: 20,
    padding: 5,
  },
  listText: {
    fontSize: 20,
  },

  listItem: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "flexStart",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
  },
  icon: {
    position: "absolute",
    top: 30,
    right: 100,
    width: "15%",
    height: "45%",
   
    paddingBottom: 10,
    marginLeft: -10,
    marginRight: "auto",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
 
  },
  details: {
    flex: 0.25,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  backButton:{
    width:'90%',
    height:60,
    marginLeft:'auto',
    marginRight:'auto',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
    backgroundColor:'green',
    
  },

 
});
