export const getWeatherDescription = (weatherCode,isDay) => {
    const lookup={
        "00":["day_clear","Cloud development not observed or not observable"],
        "01":["day_clear","	Clouds generally dissolving or becoming less developed"],
        "02":["day_clear","State of sky on the whole unchanged"],
        "03":["overcast","Clouds generally forming or developing"],
        "04":["angry_clouds","Visibility reduced by smoke, e.g. veldt or forest fires, industrial smoke or volcanic ashes"],
        "05":["day_clear","Haze"],
        "06":["day_clear","Widespread dust in suspension in the air, not raised by wind at or near the station at the time of observation"],
        "07":["day_clear","Dust or sand raised by wind at or near the station at the time of observation, but no well-developed dust whirl(s) or sand whirl(s), and no duststorm or sandstorm seen; or, in the case of ships, blowing spray at the station"],
        "08":["day_clear","Well-developed dust whirl(s) or sand whirl(s) seen at or near the station during the preceding hour or at the time of observation, but no duststorm or sandstorm"],
        "09":["day_clear","Duststorm or sandstorm within sight at the time of observation, or at the station during the preceding hour"],
        "10":["mist","Mit"],
        "11":["mist","Pachy shallow fog or ice fog at the station, whether on land or sea, not deeper than about 2 metres on land or 10 metres at sea"],
        "12":["mist","Moe or less continuous shallow fog or ice fog at the station, whether on land or sea, not deeper than about 2 metres on land or 10 metres at sea, covering less than half the sky"],
        "13":["thunder","Lightning visible, no thunder heard"],
        "14":["day_clear","Precipitation within sight, not reaching the ground or the surface of the sea"],
        "15":["day_clear","Precipitation within sight, reaching the ground or the surface of the sea, but distant, i.e. estimated to be more than 5 km from the station"],
        "16":["day_clear","Precipitation within sight, reaching the ground or the surface of the sea, near to, but not at the station"],
        "17":["thunder","Thunderstorm, but no precipitation at the time of observation"],
        "18":["thunder","Squalls at or within sight of the station during the preceding hour or at the time of observation"],
        "19":["tornado","Funnel cloud(s) at or within sight of the station during the preceding hour or at the time of observation, not connected with a thunderstorm"],
        "20":["day_clear","Drizzle (not freezing) or snow grains, not falling as shower(s) and not reaching the ground"],
        "21":["day_clear","Rain (not freezing), not falling as shower(s) and not reaching the ground"],
        "22":["day_clear","Snow, not falling as shower(s) and not reaching the ground"],
        "23":["day_clear","Rain and snow, not falling as shower(s) and not reaching the ground"],
        "24":["day_clear","Freezing drizzle or freezing rain, not falling as shower(s) and not reaching the ground"],
        "25":["day_clear","Shower(s) of rain alone"],
        "26":["day_clear","Shower(s) of rain and snow or hail"],
        "27":["day_clear","Shower(s) of hail,or rain and hail"],
        "28":["day_clear","Fog or Ice fog in whole or part"],
        "29":["thunder","Thunderstorm with or without precipitation"],
        "30":["day_clear","Slight or moderate duststorm or sandstorm has decreased during the preceding hour"],
        "31":["day_clear","Slight or moderate duststorm or sandstorm, no appreciable change during the preceding hour"],
        "32":["day_clear","Slight or moderate duststorm or sandstorm has begun or has increased during the preceding hour"],
        "33":["day_clear","Severe duststorm or sandstorm has decreased during the preceding hour"],
        "34":["day_clear","Severe duststorm or sandstorm, no appreciable change during the preceding hour"],
        "35":["day_clear","Severe duststorm or sandstorm has begun or has increased during the preceding hour"],
        "36":["day_clear","Slight or moderate drifting snow has decreased during the preceding hour"],
        "37":["day_clear","Slight or moderate drifting snow, no appreciable change during the preceding hour"],
        "38":["snow","Slght or moderate drifting snow has begun or has increased during the preceding hour"],
        "39":["snow","Hevy drifting snow has decreased during the preceding hour"],
        "40":["fog","Fogor ice fog at a distance at the time of observation, but not at the station during the preceding hour, the fog or ice fog extending to a level above that of the observer"],
        "41":["fog","Fogor ice fog in patches"],
        "42":["fog","Fogor ice fog, sky visible, has become thinner during the preceding hour"],
        "43":["fog","Fogor ice fog, sky invisible, has become thinner during the preceding hour"],
        "44":["fog","Fogor ice fog, sky visible, no appreciable change during the preceding hour"],
        "45":["fog","Fogor ice fog, sky invisible, no appreciable change during the preceding hour"],
        "46":["fog","Fogor ice fog, sky visible, has begun or has become thicker during the preceding hour"],
        "47":["fog","Fogor ice fog, sky invisible, has begun or has become thicker during the preceding hour"],
        "48":["fog","Fog depositing rime, sky visible"],
        "49":["fog","Fog depositing rime, sky invisible"],
        "50":["mist","Drzzle, not freezing, intermittent, slight at time of observation"],
        "51":["mist","Drzzle, not freezing, continuous, slight at time of observation"],
        "52":["mist","Drzzle, not freezing, intermittent, moderate at time of observation"],
        "53":["mist","Drzzle, not freezing, continuous, moderate at time of observation"],
        "54":["mist","Drzzle, not freezing, intermittent, heavy at time of observation"],
        "55":["mist","Drzzle, not freezing, continuous, heavy at time of observation"],
        "56":["mist","Drzzle, freezing, slight"],
        "57":["sleet","Dizzle, freezing, moderate or heavy"],
        "58":["rain","Drzzle and rain, slight"],
        "59":["rain","Drzzle and rain, moderate or heavy"],
        "60":["rain","Rain, not freezing, intermittent, slight at time of observation"],
        "61":["rain","Rain, not freezing, continuous, slight at time of observation"],
        "62":["rain","Rain, not freezing, intermittent, moderate at time of observation"],
        "63":["rain","Rain, not freezing, continuous, moderate at time of observation"],
        "64":["rain","Rain, not freezing, intermittent, heavy at time of observation"],
        "65":["rain","Rain, not freezing, continuous, heavy at time of observation"],
        "66":["rain","Rain, freezing, slight"],
        "67":["rain","Rain, freezing, moderate or heavy"],
        "68":["snow","Rain or drizzle and snow, slight"],
        "69":["snow","Rain or drizzle and snow, moderate or heavy"],
        "70":["snow","Intermittent fall of snowflakes, slight at time of observation"],
        "71":["snow","Continuous fall of snowflakes, slight at time of observation"],
        "72":["snow","Intermittent fall of snowflakes, moderate at time of observation"],
        "73":["snow","Continuous fall of snowflakes, moderate at time of observation"],
        "74":["snow","Intermittent fall of snowflakes, heavy at time of observation"],
        "75":["snow","Continuous fall of snowflakes, heavy at time of observation"],
        "76":["snow","Diamond dust (with or without fog) at time of observation"],
        "77":["snow","Snow grains (with or without fog) at time of observation"],
        "78":["snow","Isolated star-like snow crystals (with or without fog) at time of observation"],
        "79":["snow","Isolated snow or rain,pellets"],
        "80":["rain","Rain shower(s), slight"],
        "81":["rain","Rain shower(s), moderate or heavy"],
        "82":["rain","Rain shower(s), violent"],
        "83":["sleet","Showers of rain and snow mixed, slight"],
        "84":["sleet","Showers of rain and snow mixed, moderate or heavy"],
        "85":["snow","Snow shower(s), slight"],
        "86":["snow","Snow shower(s), moderate or heavy"],
        "87":["snow","Shower(s) of snow pellets or small hail, with or without rain or rain and snow mixed, slight"],
        "88":["snow","Shower(s) of snow pellets or small hail, with or without rain or rain and snow mixed, moderate or heavy"],
        "89":["snow","Shower(s) of hail, with or without rain or rain and snow mixed, not associated with thunder, slight"],
        "90":["snow","Shower(s) of hail, with or without rain or rain and snow mixed, not associated with thunder, moderate or heavy"],
        "91":["rain_thunder","Slight rain at time of observation"],
        "92":["rain_thunder","Moderate rain at time of observation"],
        "93":["snow_thunder","Slight snow or rain and snow mixed or hail at time of observation"],
        "94":["snow_thunder","Moderate or heavy snow or rain and snow mixed or hail at time of observation"],
        "95":["snow_thunder","Thunderstorm, slight or moderate, without hail, but with rain and/or snow at time of observation"],
        "96":["snow_thunder","Thunderstorm, slight or moderate, with hail at time of observation"],
        "97":["snow_thunder","Thunderstorm, heavy, without hail, but with rain and/or snow at time of observation"],
        "98":["snow_thunder","Thunderstorm combined with duststorm or sandstorm at time of observation"],
        "99":["snow_thunder","Thunderstorm, heavy, with hail at time of observation"]
    }

    if(!isDay){
        //change all day_clear to night_clear
      for(let key in lookup){
        if(lookup[key][0]==="day_clear"){
          lookup[key][0]="night_half_moon_clear"
        }
      }
    }

    return lookup[weatherCode.toString().padStart(2,"0")];
}
