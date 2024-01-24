import { useState } from "react";

import { Current } from "./scenes/current";
import { Tomorrow } from "./scenes/tomorrow";
import { SevenDays } from "./scenes/sevenDays";
import { LocationProvider } from "./contexts/locationContext";
import { IconProvider } from "./contexts/iconContext";
import { useWindowDimensions, View} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { SevenDaysProvider, VariablesProvider } from "./contexts/weatherContext";

const renderScene = SceneMap({
  current: Current,
  tomorrow: Tomorrow,
  sevenDays: SevenDays,
});

export default function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "current", title: "Today" },
    { key: "tomorrow", title: "Tomorrow" },
    { key: "sevenDays", title: "7 Days" },
  ]);
  return (
    <LocationProvider>
      <IconProvider>
        <VariablesProvider>
          <SevenDaysProvider>
    <TabView
    renderTabBar={props => (
      <View >
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'orange' ,height:5,margin :0,}}
            style={{ backgroundColor: 'blue',height:40,padding:3, }}
            activeColor="blue"
            inactiveColor="white"
            
          tabStyle={{backgroundColor:"silver",borderWidth:1,margin :2,padding:0,height:25}}
          labelStyle={{fontSize:12,fontWeight:"bold",padding:0,margin:0,height:40}}
              />
    </View>
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width,height:20 }}
  style={{backgroundColor:"lightblue",margin :5,padding:0,height:10, }}

    />
      </SevenDaysProvider>
      </VariablesProvider>
      </IconProvider>
    </LocationProvider>
  );
}
