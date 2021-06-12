import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import InputComponent from "../components/inputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/core";
import Colors from "../utils/Colors";
import { validateEmail } from "../utils/validation";
import { firebaseAuth } from "../utils/firebaseConfig";
import AppBar from "../components/AppBar";
import { ScrollView } from "react-native-gesture-handler";
import API_Service from "../services/API";

const RegisterPage = () => {
  const navigation = useNavigation();
  const [registerData, setRegisterData] = useState(defaultValue);
  const [solicitantData, setSolicitantData] = useState(solicitantValue);
  const [formError, setFormError] = useState({});
  const register = async () => {
    let error = {};
    if (
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPass ||
      !solicitantData.name ||
      !solicitantData.last_name ||
      !solicitantData.edad ||
      !solicitantData.curp
    ) {
      console.log("Faltan datos");
      if (!registerData.email) error.email = true;
      if (!registerData.password) error.password = true;
      if (!registerData.confirmPass) error.confirmPass = true;
    } else if (registerData.password != registerData.confirmPass) {
      console.log("Contraseñas diferentes");
      error.password = true;
      error.confirmPass = true;
    } else if (!validateEmail(registerData.email)) {
      error.email = true;
      console.log("Correo invalido");
    } else {
      console.log("Creando usuario");
      try {
        const credentials = await firebaseAuth.createUserWithEmailAndPassword(
          registerData.email,
          registerData.password
        );

        console.log("Registrado en firebase");
        await API_Service.postSolicitant(credentials.user.uid, solicitantData);
        console.log("Registrado en mongo");
      } catch (err) {
        console.log("[Error:] ", err);
        setFormError({
          email: true,
          password: true,
          confirmPass: true,
        });
      }
    }
  };

  const onChange = (text, type, state) => {
    console.log(type + ": " + text);
    if (state == "register") {
      setRegisterData({ ...registerData, [type]: text });
    } else {
      setSolicitantData({ ...solicitantData, [type]: text });
    }
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
          onChangeText={(e) => onChange(e, "email", "register")}
        />
        <View style={{ height: 10 }} />
        <InputComponent
          initialValue={""}
          placeholder={"Nombre"}
          onChangeText={(e) => onChange(e, "name", "solicitant")}
        />
        <View style={{ height: 10 }} />
        <InputComponent
          initialValue={""}
          placeholder={"Apellidos"}
          onChangeText={(e) => onChange(e, "last_name", "solicitant")}
        />
        <View style={{ height: 10 }} />
        <InputComponent
          initialValue={""}
          placeholder={"Edad"}
          keyboardType={'number-pad'}
          onChangeText={(e) => onChange(e, "edad", "solicitant")}
        />
        <View style={{ height: 10 }} />
        <InputComponent
          initialValue={""}
          placeholder={"CURP"}
          onChangeText={(e) => onChange(e, "curp", "solicitant")}
        />
        <View style={{ height: 10 }} />
        <InputComponent
          initialValue={""}
          placeholder={"Password"}
          isPassword={true}
          onChangeText={(e) => onChange(e, "password", "register")}
        />
        <View style={{ height: 10 }} />
        <InputComponent
          initialValue={""}
          placeholder={"Confirm Password"}
          isPassword={true}
          onChangeText={(e) => onChange(e, "confirmPass", "register")}
        />
        <View style={{ height: 10 }} />
        <ButtonComponent
          type="primary"
          onPress={() => {
            register();
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
    confirmPass: {},
  };
}

function solicitantValue() {
  return {
    name: {},
    last_name: {},
    edad: {},
    curp: {},
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

export default RegisterPage;
