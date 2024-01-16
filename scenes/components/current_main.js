import { StyleSheet, Text } from "react-native";
import { useContext, useState, useEffect } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { LocationContext } from "../../contexts/locationContext";
import { getCurrentWeather } from "../../weather-api";
import { getWeatherDescription } from "../../functions/getWeatherDescription";
import { IconContext, VariablesContext } from "../../contexts/weatherContext";
export const CurrentMain = () => {
  const { variables, setVariables } = useContext(VariablesContext);
  const { iconMap, SVG } = useContext(IconContext);
  const { location } = useContext(LocationContext);
  const [placeName, setPlaceName] = useState(location.place);
  //weathercode used to map to sgv component
  const [weatherCode, setWeatherCode] = useState("");
  //WeatherIcon used as background
  const WeatherIcon = iconMap[weatherCode];
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (location.place) {
      //load current weather using location
      getCurrentWeather(location)
        .then((data) => {
          setVariables(data.current);
          setPlaceName(location.place);
        })
        .catch((error) => {
          console.log(error, "error in current.js");
        });
    }
  }, [location]);

  useEffect(() => {
    if (variables.weather_code != 0) {
      //gets icon and wmo description based on weathercode
      const weatherDescription = getWeatherDescription(
        variables.weather_code,
        variables.is_day
      );
      //weather code comes back as icon description/iconMap keyname
      setWeatherCode(weatherDescription[0]);
      setDescription(weatherDescription[1]);
    }
  }, [variables]);

  useEffect(() => {
    setTimeout(() => {
      setTimer(timer + 1);
      setTime(new Date().toLocaleTimeString("en-US"));
    }, 1000);
  }, [timer]);

  return (
    <LinearGradient
      style={styles.currentWeather}
      colors={variables.is_day ? ["blue", "skyblue"] : ["black", "grey"]}
    >
      {description && (
        <>
          <WeatherIcon
            style={{
              opacity: 0.8,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />

          {/* cloud cover */}
          {weatherCode === "day_clear" ||
            (weatherCode === "night_half_moon_clear" &&
              iconMap["overcast"]({
                style: {
                  opacity: 0.7,
                  position: "absolute",
                  width: `${variables.cloud_cover}%`,
                  height: "100%",
                },
              }))}

          <Text style={styles.time}>{time}</Text>
          <Text style={styles.placename}>{placeName}</Text>
          <Text style={styles.temp}>
            {variables.temperature_2m}
            °C
          </Text>
          <Text style={styles.humidity}>
            <SVG.water_drop style={{ height: 20, width: 20 }} />{" "}
            {variables.relative_humidity_2m}%
          </Text>
          <Text style={styles.realFeel}>
            {variables.apparent_temperature}°C
          </Text>
          <Text style={styles.rain}>
            <SVG.rain_icon style={{ height: 20, width: 20 }} /> {variables.rain}
            mm
          </Text>
          <Text style={styles.cloud}>
            <SVG.cloud_icon style={{ hieght: 0, width: 20 }} />{" "}
            {variables.cloud_cover}%
          </Text>
          <Text style={styles.windSpeed}>
            <SVG.wind_icon style={{ height: 20, width: 20 }} />{" "}
            {variables.wind_speed_10m}mph
          </Text>

          <Text style={styles.description}>{description}</Text>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  currentWeather: {
    flex: 0.6,

    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 10,
  },
  time: {
    position: "absolute",
    top: 0,
    fontSize: 30,
    fontWeight: "bold",
    color: "white",

    opacity: 1,
    padding: 5,
  },

  placename: {
    position: "absolute",
    top: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",

    opacity: 1,
    padding: 5,
  },
  temp: {
    position: "absolute",
    top: 60,
    right: 0,
    fontSize: 80,
    fontWeight: "bold",
    color: "white",

    opacity: 1,
    padding: 5,
  },
  realFeel: {
    position: "absolute",
    top: 160,
    right: 0,
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    opacity: 1,
    padding: 5,
  },

  humidity: {
    position: "absolute",
    top: 100,
    left: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",

    opacity: 1,
    padding: 5,
  },

  rain: {
    position: "absolute",
    top: 140,
    left: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    opacity: 1,
    padding: 5,
  },
  cloud: {
    position: "absolute",
    top: 180,
    left: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    opacity: 1,
    padding: 5,
  },
  windSpeed: {
    position: "absolute",
    top: 220,
    left: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    opacity: 1,
    padding: 5,
  },

  description: {
    position: "absolute",
    top: 320,

    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    opacity: 1,
    padding: 5,
  },
});
