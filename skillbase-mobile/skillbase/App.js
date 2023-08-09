import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { UserContextProvider } from "./src/contexts/UserContext";
import Rotas from "./src/routes/Rotas";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/Login";

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
          <StatusBar style="auto" />
          <Rotas />
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000",
    alignItems: "center",
    justifyContent: "center",
  },
});
