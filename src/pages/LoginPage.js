import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import InputComponent from "../components/inputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/core";
import Colors from "../utils/Colors";
import AppBar from "../components/AppBar";
import { validateEmail } from "../utils/validation";
import { firebaseAuth } from "../utils/firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";

const LoginPage = () => {
  const navigation = useNavigation();
  const [loginData, setLoginData] = useState(defaultValue);
  const [formError, setFormError] = useState({});

  const login = () => {
    let error = {};
    if (!loginData.email || !loginData.password) {
      if (!loginData.email) error.email = true;
      if (!loginData.password) error.password = true;
    } else if (!validateEmail(loginData.email)) {
      error.email = true;
      // error.password = true;
    } else {
      firebaseAuth
        .signInWithEmailAndPassword(loginData.email, loginData.password)
        .then(() => {
          console.log("Entro");
          navigation.navigate("Home");
        })
        .catch(() => {
          console.log("Error");
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(error);
  };

  const onChange = (text, type) => {
    setLoginData({ ...loginData, [type]: text });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollChild}
      >
        <InputComponent
          initialValue={""}
          placeholder={"Email"}
          onChangeText={(e) => onChange(e, "email")}
        />
        <View style={{ height: 10 }} />
        <InputComponent
          isPassword={true}
          initialValue={""}
          placeholder={"Contraseña"}
          onChangeText={(e) => onChange(e, "password")}
        />
        <View style={{ height: 10 }} />
        <ButtonComponent
          type="primary"
          onPress={() => {
            login();
          }}
          value="Iniciar Sesión"
        />
        <View style={{ height: 10 }} />
        <ButtonComponent
          type="primary"
          onPress={() => {
            navigation.navigate("Register");
          }}
          value="Registrarse"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

function defaultValue() {
  return {
    email: {},
    password: {},
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  scrollChild: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginPage;
