import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="light" />
      </View>
    </NavigationContainer>
  );
}