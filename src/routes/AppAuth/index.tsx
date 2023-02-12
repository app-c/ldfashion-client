import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../../pages/home";
import { Item } from "../../pages/itens";
import { Buy } from "../../pages/buy";
import { Cart } from "../../pages/cart";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppAuth() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="item" component={Item} />
      <Screen name="buy" component={Buy} />
      <Screen name="cart" component={Cart} />
    </Navigator>
  );
}
