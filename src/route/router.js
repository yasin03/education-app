import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CardItem } from "../CardItem";
import CardDetail from "../CardDetail";
import Home from "../Home";

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerTitle: "Eğitimlerimiz" }}
        />
        <Stack.Screen name="CardItem" component={CardItem} />
        <Stack.Screen
          name="CardDetail"
          component={CardDetail}
          options={{ headerTitle: "Eğitim Detayları" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
