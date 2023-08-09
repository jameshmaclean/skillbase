import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import Login from "../../screens/Login";
import Home from "../../screens/Home";
import logoImage from "../../../assets/logo.png";
import { corPrimaria } from "../../../Global";

const Stack = createStackNavigator();
const RotasPrivadas = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: corPrimaria,
          height: 120,
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleContainerStyle: {
          alignItems: "center",
        },
        headerTitle: () => (
          <Image
            source={logoImage}
            style={{ width: 800, height: 200 }}
            resizeMode="contain"
          />
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: null,
        }}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default RotasPrivadas;
