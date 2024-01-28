import { useContext, useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { IconContext } from "../../contexts/iconContext"
import { downloadMapOverlays } from "../../functions/downloadMapOverlays"
import { getMapOverlayUrls } from "../../functions/getMapOverlayUrls"

import { API_KEY } from "@env"










 export const WeatherMap=({location})=>{
  const staticMapUrl=`https://maps.googleapis.com/maps/api/staticmap?center=54.5,-3.5&markers=color:red|size:tiny|${location.lat},${location.lon}&scale=2&zoom=5&size=515x515&maptype=terrain&key=${API_KEY}`

  const { SVG } = useContext(IconContext);

  const [isUK,setIsUK]=useState(false);

  const [uriList,setUriList]=useState({});
  const [isLoading,setIsLoading]=useState(true);
  const [defaultTimes,setDefaultTimes]=useState({});//default times for each layer
  const [offsetHours,setOffsetHours]=useState(0);//offset hours for each layer
  const [count,setCount]=useState(0);//counter for timing sequence of images
  const interval=2000;
  const[displayTime,setDisplayTime]=useState(0);//time to display on screen
  const [isCloud,setIsCloud]=useState(false);
  const [isRain,setIsRain]=useState(false);
  const [isTemp,setIsTemp]=useState(false);
 
    useEffect(() => {
      if (location.lat && location.lon) { 
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
            console.log(new Date(defaultTimes.Rainfall).toLocaleTimeString('en-US',{hour12:true}),"default time in weather map")

            downloadMapOverlays(urlList)
            .then((uriList)=>{ 
              // uriList structure is {layerName:{timestep(number):uri}} timestep is the FORECAST time/element of the url
              // e.g. {CloudAndRain:{0:"file://.../CloudAndRain_0.png",3:"file://.../CloudAndRain_3.png",6:"file://.../CloudAndRain_6.png"}}
              
              // console.log(JSON.stringify(uriList,null,1),"uri list in weather map")
              setUriList(uriList);
              setIsLoading(false);


             })

          })
          .catch((err) => console.log(err, "error in weather map"));
      }
    }, [isUK]);

    useEffect(()=>{
      if(!isLoading){
        setTimeout(()=>{
          setOffsetHours((prev)=>{
            if(prev===36) return 0
            else return prev+3
          });
          setCount((count)=>count+1);
        },interval)
      }

    },[count,isLoading])

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



    const layout = useWindowDimensions();
    // console.log(layout.height,"layout height in weather map")

    return isLoading?<Text>loading</Text>:
    (
        <View style={{flex:1,height:500}}>

{/* style={{...styles.container,height:+`${layout.height}`}} */}

        {!isUK&&<Text>Not in uk no radar data available</Text>}
           {isRain&&!isCloud&&<Image style={{...styles.images}} source={{uri:uriList.Rainfall[offsetHours]}}/>}
            {isCloud&&!isRain&&<Image style={{...styles.images}} source={{uri:uriList.Cloud[offsetHours]}}/>}
            {isCloud&&isRain&&<Image style={{...styles.images}} source={{uri:uriList.CloudAndRain[offsetHours]}}/>}
           {isTemp&&<Image style={{...styles.images}} source={{uri:uriList.Temperature[offsetHours]}}/>}
           <Image style={{...styles.map,width:layout.width}} source={{uri:staticMapUrl}}/>
           
           <Text style={styles.time}> {displayTime} </Text>

      <TouchableOpacity style={{...styles.cloudIcon,backgroundColor:isCloud?"green":"white"}} onPress={()=>{
        if(isCloud){setIsCloud(false)} else{setIsCloud(true)}
      }}>
        <View >
        <SVG.cloudy style={styles.cloudSize}/>
        </View>
        </TouchableOpacity>

      <TouchableOpacity style={{...styles.rainIcon,backgroundColor:isRain?"green":"white"}} onPress={()=>{
        if(isRain){setIsRain(false)} else{setIsRain(true)}
      }}>
        <View >
        <SVG.rain style={styles.rainSize}/>
        </View>
        </TouchableOpacity>

      <TouchableOpacity style={{...styles.tempIcon,backgroundColor:isTemp?"green":"white"}} onPress={()=>{
        if(isTemp){setIsTemp(false)} else{setIsTemp(true)}
      }}>
        <View >
     <Text style={styles.tempSize}>°C</Text>
        </View>
        </TouchableOpacity>

         </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
        backgroundColor:"lightblue",
      
      
    },
    map:{
      position:"absolute",
      zIndex:-1,
      height:550,
  
      
    },
    images:{
      position:"absolute",
      opacity:0.5,
      zIndex:2,
       width:"100%",
       height:500,
        borderWidth:1,
        borderColor:"red",
        paddingLeft:"15",
        paddingRight:"15",
        // marginLeft:"15%",
        // marginRight:"15%",
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
      width:50,
      height:50,
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
      width:50,
      height:50,
    },
    tempIcon:{
      zIndex:999,
      position:"absolute",
      top:130,
      right:20,
      backgroundColor:"white",
      borderRadius:50,
      justifyContent:"center",
    },
    tempSize:{
      left:20,
      top:10,
      width:50,
      height:50,
     fontSize:20,
    },

    time:{
      zIndex:3,
       position:"absolute",
       backgroundColor:"white",
       fontSize:16,
       bottom:20,
        left:20, 
    }
})