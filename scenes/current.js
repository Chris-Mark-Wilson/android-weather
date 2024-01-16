import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Details } from "./components/detailsGraph";
import { LocationFinder } from "./components/locationFinder";
import { CurrentMain } from "./components/current_main";

export const Current = () => {
  return (
    <View style={styles.container}>
      <LocationFinder />
      <CurrentMain />
      <Details />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },


 
});
