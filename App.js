import * as React from "react";

import { HomeScreen } from "./components/Home";
import { DetailsScreen } from "./components/Details";
import { useWindowDimensions, View } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const renderScene = SceneMap({
  home: HomeScreen,
  details: DetailsScreen,
});

export default function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "First" },
    { key: "details", title: "Second" },
  ]);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
