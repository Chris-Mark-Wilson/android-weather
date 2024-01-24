import { FlatList, StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useState, useEffect, useRef } from "react";
import { getHourlyWeather } from "../../weather-api";

export const HourlyScroll = ({ location }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    console.log("in hourly scroll effect");
    if (location) {
      getHourlyWeather(location)
        .then((data) => {
          const { hourly } = data;
          // console.log(data.hourly)
          console.log(JSON.stringify(hourly, null, 2), "hourly data");
          const newData = hourly.time.map((time, index) => {
            return {
              time: new Date(time).toLocaleTimeString("en-US", {
                hour: "numeric",
              }),
              isDay: hourly.is_day[index],
              temp: hourly.apparent_temperature[index],
            };
          });
          console.log(newData, "new data");
          if (!hourlyData.length) {
            setHourlyData(newData);
          }
        })
        .catch((e) => console.log(e, "error in catch"));
    }
    console.log(hourlyData, "hourly data");
  }, [location, hourlyData]);

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
            <Text
              style={{ color: "white", width: "20%", padding: 0, margin: 0 }}
            >
              {item.time}
            </Text>
          </LinearGradient>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // top: "10%",
    // height: "90%",
    flex:1,
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
    padding: 0,
    margin: 0,
    overflow:"scroll"
  },

  listItem: {
    // backg"roundColor:"grey",
    height: 200,
    width: "100%",
    borderWidth: 2,
    borderColor: "orange",
  },
});
