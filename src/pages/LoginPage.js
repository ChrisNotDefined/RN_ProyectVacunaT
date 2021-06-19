import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Alert } from "react-native";
import InputComponent from "../components/inputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/core";
import Colors from "../utils/Colors";
import AppBar from "../components/AppBar";
import { isEmpty, validateEmail } from "../utils/validation";
import { firebaseAuth, getAuthErrorMsg } from "../utils/firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";

const LoginPage = () => {
  const navigation = useNavigation();
  const [loginData, setLoginData] = useState(defaultValue);
  const [formError, setFormError] = useState({});

  const login = async () => {
    let error = {};
    if (isEmpty(loginData.email) || isEmpty(loginData.password)) {
      if (!loginData.email || loginData.email == "") {
        error.email = true;
      }
      if (!loginData.password || loginData.password == "") {
        error.password = true;
      }
      Alert.alert("Aviso", "Todos los campos son requeridos", [{ text: "OK" }]);
    } else if (!validateEmail(loginData.email)) {
      error.email = true;
      Alert.alert("Aviso", "Email no válido", [{ text: "OK" }]);
    } else {
      try {
        const credentials = await firebaseAuth.signInWithEmailAndPassword(
          loginData.email,
          loginData.password
        );

        if (credentials) {
          console.log("Entro");
          navigation.navigate("Home");
        }
      } catch (err) {
        console.log("[Error]: " + err.code);
        Alert.alert("Error", getAuthErrorMsg(err.code), [{ text: "OK" }]);
        setFormError({
          email: true,
          password: true,
        });
      }
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
          style={styles.formInput}
          hasError={formError["email"]}
          initialValue={""}
          placeholder={"Email"}
          onChangeText={(e) => onChange(e, "email")}
        />
        <View style={{ height: 10 }} />
        <InputComponent
          style={styles.formInput}
          hasError={formError["password"]}
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
    email: null,
    password: null,
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
  formInput: {
    width: "80%",
  },
});

export default LoginPage;
