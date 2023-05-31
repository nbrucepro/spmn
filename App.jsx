// import {
//     Roboto_400Regular,
//     Roboto_400Regular_Italic,
//     Roboto_700Bold,
//     useFonts,
// } from '@expo-google-fonts/roboto';
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
// import SplashScreen from './src/screens/Splash';
import Navigator from "./src/components/navigation/Navigator";
import { StyleSheet, View, Text } from "react-native";
import Signup from "./src/screens/Signup";
import RestaurantMenu from "./src/screens/RestaurantMenu";

export default function App() {
  return (
    // <NavigationContainer>
    //   <Navigator />
    // </NavigationContainer>
    <RestaurantMenu/>
  );
}
