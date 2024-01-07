import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "./components/Home";
import { DetailsScreen } from "./components/Details";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
        {/* <View>
      <Text> what is goin on !</Text>
    </View> */}
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
