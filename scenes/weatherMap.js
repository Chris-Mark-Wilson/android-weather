import { useContext, useEffect,useLayoutEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { downloadMapOverlays } from "../functions/downloadMapOverlays"
import { getMapOverlayUrls } from "../functions/getMapOverlayUrls"
import {LocationContext} from "../contexts/locationContext"
import { PlaybackControls } from "./components/playbackControls"
import {FontAwesome5} from '@expo/vector-icons'

import { API_KEY } from "@env"











 export const WeatherMap=()=>{
   const {location}=useContext(LocationContext);
   const mapUrl=`https://maps.googleapis.com/maps/api/staticmap?center=54.5,-3.5&markers=color:red|size:small|${location.lat},${location.lon}&scale=1&zoom=5&size=400x400&maptype=terrain&key=${API_KEY}`
  const [staticMapUrl,setStaticMapUrl]=useState(mapUrl)

  const [isUK,setIsUK]=useState(false);
  const [isPlaying,setIsPlaying]=useState(true);
  const layout = useWindowDimensions();
  const [uriList,setUriList]=useState({});
  const [isLoading,setIsLoading]=useState(true);
  const [defaultTimes,setDefaultTimes]=useState({});//default times for each layer
  const [offsetHours,setOffsetHours]=useState(0);//offset hours for each layer
  const [count,setCount]=useState(0);//counter for timing sequence of images
  const interval=2000;//interval between images in milliseconds
  const[displayTime,setDisplayTime]=useState(0);//time to display on screen
  const [isCloud,setIsCloud]=useState(false);//show cloud layer
  const [isRain,setIsRain]=useState(true);//show rain layer
  const [isTemp,setIsTemp]=useState(false);//show temp layer
  const [attempts,setAttempts]=useState(0)



 
    useEffect(() => {
      if (location.lat && location.lon) { 
        setStaticMapUrl(`https://maps.googleapis.com/maps/api/staticmap?center=54.5,-3.5&markers=color:red|size:small|${location.lat},${location.lon}&scale=1&zoom=5&size=400x400&maptype=terrain&key=${API_KEY}`)
        // console.log(location.lat,"location lat in weather map")
        if (location.lat > 48 && location.lat < 61 && location.lon > -12 && location.lon < 5) {
          setIsUK(true);
     
        }
        else {
          setIsUK(false);
        } 
      }
    }, [location]);
  
    useEffect(() => {
      if (isUK) {
        setIsLoading(true);
        getMapOverlayUrls()
        .then((urlList) => {
            //urlList structure is {layerName:{timesteps:{timestep(number):url},defaultTime:time in iso format}} timestep is the FORECAST time/element of the url
            // represented as a number in 3 hourly intervals 0 - 36 hours ahead from RUN query (DefaultTime)
            //layerNames are usually (or should be) :
            // Rainfall
            // Cloud
            // CloudAndRain
            // Temperature 
            // Pressure
            // Pressure layer is structured differently, 
            // 0 - 72 hours in 12 hour intervals from RUN query (DefaultTime)
            // defaultTime is the start time of the sequence in iso format
         
            // console.log(JSON.stringify(urlList,null,1),"url list in weather map")
            for(const layerName in urlList){
              // get default time for each layer
              defaultTimes[layerName]=urlList[layerName].defaultTime;
            }

            // console.log(JSON.stringify(defaultTimes,null,1),"default times in weather map")
            const hours=3*60*60*1000;//3 hours in milliseconds
           
            // alert(`${JSON.stringify(urlList,null,1)} `)

            downloadMapOverlays(urlList)
            .then((uriList)=>{ 
              // uriList structure is {layerName:{timestep(number):uri}} timestep is the FORECAST time/element of the url
              // e.g. {CloudAndRain:{0:"file://.../CloudAndRain_0.png",3:"file://.../CloudAndRain_3.png",6:"file://.../CloudAndRain_6.png"}}
              
              // console.log(JSON.stringify(uriList,null,1),"uri list in weather map")
              setUriList(uriList);
              setIsLoading(false);


             })

          })
          .catch((err) => {
            console.log(err, "error in weather map");
            alert(`${err} error fetching data, attempt ${attempts}`)
            //kick server till it works..
            if(attempts<3){
              
              setIsUK(false);
              setIsUK(true);
              setAttempts((attempts)=>attempts+1)
            }
          })
      }
    }, [isUK]);

    useEffect(()=>{
      if(!isLoading&&isPlaying){
     setTimeout(()=>{
          setOffsetHours((prev)=>{
            if(prev===36) return 0
            else return prev+3
          });
          setCount((count)=>count+1);
           
        },interval)
      }
    
    },[count,isLoading,isPlaying])

    useEffect(()=>{
      setDisplayTime(()=>{
        const time=new Date(defaultTimes.Rainfall);
        time.setHours(time.getHours()+offsetHours);
        return time.toString().slice(0,21);
      })
      if(offsetHours===36){
        setOffsetHours(0);
      }
    },[offsetHours])





  
    // console.log(layout.height,"layout height in weather map")

    return isLoading?<Text>loading radar data...</Text>:
    (
        <View style={{flex:1,height:500}}>

{/* style={{...styles.container,height:+`${layout.height}`}} */}

        {!isUK&&<Text>Not in uk no radar data available</Text>}
           {isRain&&!isCloud&&<Image style={{...styles.images}} source={{uri:uriList.Rainfall[offsetHours]}}/>}
            {isCloud&&!isRain&&<Image style={{...styles.images}} source={{uri:uriList.Cloud[offsetHours]}}/>}
            {isCloud&&isRain&&<Image style={{...styles.images}} source={{uri:uriList.CloudAndRain[offsetHours]}}/>}
           {isTemp&&<Image style={{...styles.images}} source={{uri:uriList.Temperature[offsetHours]}}/>}
           <Image style={{...styles.map}} source={{uri:staticMapUrl}}/>
           
           <Text style={styles.time}> {displayTime} </Text>

      <TouchableOpacity style={{...styles.cloudIcon,backgroundColor:isCloud?"lightgreen":"white"}} onPress={()=>{
        if(isCloud){setIsCloud(false)} else{setIsCloud(true)}
      }}>
        <View >
       <FontAwesome5 name="cloud" style={styles.cloudSize}/>
        </View>
        </TouchableOpacity>

      <TouchableOpacity style={{...styles.rainIcon,backgroundColor:isRain?"lightgreen":"white"}} onPress={()=>{
        if(isRain){setIsRain(false)} else{setIsRain(true)}
      }}>
        <View >
      <FontAwesome5 name="cloud-rain" style={styles.rainSize}/>
        </View>
        </TouchableOpacity>

      <TouchableOpacity style={{...styles.tempIcon,backgroundColor:isTemp?"lightgreen":"white"}} onPress={()=>{
        if(isTemp){setIsTemp(false)} else{setIsTemp(true)}
      }}>
        <View >
     <FontAwesome5 name="temperature-high" style={styles.tempSize}/>
        </View>
        </TouchableOpacity>

        <View style={styles.controls}>
          <PlaybackControls 
          onFFPressed={()=>{setOffsetHours((prev)=>{return prev===36?0:prev+3})}} 
          onRWPressed={()=>{setOffsetHours((prev)=>{return prev===0?36:prev-3})}}
          onPausePressed={()=>{
            setIsPlaying(false)
            setOffsetHours((prev)=>{return prev===0?36:prev-3})}}
          onPlayPressed={()=>{setIsPlaying(true)}}
          size={25}
          color="green"
          inactivebackgroundColor="white"
          activeBackgroundcolour="lightgray"
          />
          </View>

         </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
        backgroundColor:"lightblue",
      
      
    },
    map:{
      resizeMode:"contain",
      position:"absolute",
      zIndex:-1,
      height:"100%",
  width:"100%"
      
    },
    images:{
      // objectFit:"scale-down",
      position:"absolute",
      opacity:0.5,
      zIndex:2,
       width:"100%",
       top:"25%",
       height:"50%",
        borderWidth:1,
        borderColor:"red",
        paddingLeft:30,
        paddingRight:"15",
        paddingBottom:30,
        // marginLeft:"15%",
        // marginRight:"15%",
        marginBottom:"10%"
    },
    cloudIcon:{
      zIndex:999,
      position:"absolute",
      top:10,
      right:20,
      backgroundColor:"white",
      borderRadius:50,
    
    },
    cloudSize:{
      left:7,
      top:8,
  width:50,
  height:50,
 fontSize:30,
    },
    rainIcon:{
      zIndex:999,
      position:"absolute",
      top:70,
      right:20,
      backgroundColor:"white",
      borderRadius:50,
    },
    rainSize:{
      left:10,
      top:10,
  width:50,
  height:50,
 fontSize:30,
    },
    tempIcon:{
      zIndex:999,
      position:"absolute",
      top:130,
      right:20,
      backgroundColor:"white",
      borderRadius:50,
      // justifyContent:"center",
    },
    tempSize:{
          left:15,
          top:10,
      width:50,
      height:50,
     fontSize:30,
    },

    time:{
      zIndex:3,
       position:"absolute",
       backgroundColor:"white",
       fontSize:18,
       top:20,
        left:20, 
        width:"60%",
        borderWidth:1,
        borderRadius:5
    },
    controls:{
      position:"absolute",
      bottom:50,
    left:20,
      width:"70%",
      height:"7%",
      zIndex:999,
    }
})