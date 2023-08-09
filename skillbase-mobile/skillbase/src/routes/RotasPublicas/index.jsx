import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../../screens/Login";
import Cadastro from "../../screens/Registro";
import {
  cinza,
  complementar,
  corPrimaria,
  corSecundaria,
} from "../../../Global";
import logoImage from "../../../assets/logo.png";
import { Image } from "react-native";

const Stack = createStackNavigator();
const RotasPublicas = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: corPrimaria,
          height: 120,
        },
        headerTintColor: cinza,
        headerTitleAlign: "center",
        headerTitleContainerStyle: {
          alignItems: "center",
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cadastrar" component={Cadastro} />
    </Stack.Navigator>
  );
};

export default RotasPublicas;
