import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Route } from "./src/routes";
import AppProvider from "./src/hooks";
import { LogIn } from "./src/pages/logIn";
import { cor } from "./src/styles";

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <StatusBar style="light" />
        <View style={{ flex: 1 }}>
          <Route />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
}
