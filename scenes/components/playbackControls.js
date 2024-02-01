import {View,StyleSheet,TouchableOpacity} from "react-native";
import {Entypo} from '@expo/vector-icons'

export const PlaybackControls = ({...props}) => {
const {onRWPressed,onFFPressed,onPlayPressed,onPausePressed,size,color="green",backgroundColor="white"}=props


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onRWPressed}>
                <View style={styles.buttonContainer}>
            <Entypo name="controller-fast-backward" size={size} color="green" />
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlayPressed}>
            <View style={styles.buttonContainer}>
            <Entypo name="controller-play" size={size} color={color} />
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPausePressed}>
            <View style={styles.buttonContainer}>
            <Entypo name="controller-paus" size={size} color={color} />
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onFFPressed}>
            <View style={styles.buttonContainer}>
            <Entypo name="controller-fast-forward" size={size} color={color} />
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        width:"100%",
        height:"100%",
        backgroundColor:"silver",
        borderWidth:1,
        borderColor:"black",
        borderRadius:5
    },
    buttonContainer:{
       padding:10,
             
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        backgroundColor:"white",
    }
})
