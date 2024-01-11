import { useState } from "react";

import { Current } from "./scenes/current";
import { Tomorrow } from "./scenes/tomorrow";
import { SevenDays } from "./scenes/sevenDays";
import { LocationProvider } from "./contexts/locationContext";

import { useWindowDimensions, View,Text } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

const renderScene = SceneMap({
  current: Current,
  tomorrow: Tomorrow,
  sevenDays: SevenDays,
});

export default function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "current", title: "Current weather" },
    { key: "tomorrow", title: "Tomorrow" },
    { key: "sevenDays", title: "7 Days" },
  ]);
  return (
    <LocationProvider>
    <TabView
    renderTabBar={props => (
      <View style={{backgroundColor:"lightblue"}}>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'red' ,borderColor:"black",height:"100%",borderWidth:1,margin :0, borderRadius:10,}}
            style={{ backgroundColor: 'pink'}}
            activeColor="blue"
            inactiveColor="gray"
            
          tabStyle={{backgroundColor:"silver",borderWidth:1,margin :10,padding:0, borderRadius:10}}
          labelStyle={{fontSize:12,fontWeight:"bold"}}
              />
    </View>
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
  style={{backgroundColor:"lightblue",margin :5,padding:0, borderRadius:10}}

    />
    </LocationProvider>
  );
}
