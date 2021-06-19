import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import HomePage from "./src/pages/HomePage";
import InfoPage from "./src/pages/InfoPage";
import RequestPage from "./src/pages/RequestPage";
import StatusPage from "./src/pages/StatusPage";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebaseAuth } from "./src/utils/firebaseConfig";

const Stack = createStackNavigator();

export default function App() {
  const navRef = React.useRef(null);

  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      navRef.current?.navigate("Home");
    } else {
      navRef.current?.navigate("Login");
    }
  });

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer ref={navRef}>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginPage} />

            <Stack.Screen name="Register" component={RegisterPage} />

            <Stack.Screen name="Home" component={HomePage} />

            <Stack.Screen name="Info" component={InfoPage} />

            <Stack.Screen name="Request" component={RequestPage} />

            <Stack.Screen name="Status" component={StatusPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
