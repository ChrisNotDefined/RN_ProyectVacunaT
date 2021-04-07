import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import InputComponent from "../components/inputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/core";
import Colors from "../utils/Colors";
import AppBar from "../components/AppBar";
import { StatusBar } from "expo-status-bar";

const LoginPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{ backgroundColor: Colors.COLOR_ACCENT, height: 24 }} />
      <AppBar />
      <View style={styles.container}>
        <InputComponent initialValue={""} placeholder={"Usuario"} />
        <InputComponent
          isPassword={true}
          initialValue={"Initialized"}
          placeholder={"Contraseña"}
        />
        <ButtonComponent
          type="primary"
          onPress={() => {
            navigation.navigate("Home");
          }}
          value="Iniciar Sesion"
        />
        <ButtonComponent
          type="defult"
          onPress={() => {
            navigation.navigate("Register");
          }}
          value="Registrarse"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginPage;
