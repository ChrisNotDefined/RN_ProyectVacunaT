import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import AppBar from "../components/AppBar";
import InputComponent from "../components/inputComponent";
import Colors from "../utils/Colors";
import ButtonComponent from "../components/ButtonComponent";
import { firebaseAuth } from "../utils/firebaseConfig";
import API_Service from "../services/API";
import { validateEmail } from "../utils/validation";

const RequestPage = () => {
  const navigation = useNavigation();
  const [solicitudData, setSolicitudData] = useState(solicitudValue());
  const [solicitudErrors, setSolicitudErrors] = useState(errorsValue());

  useEffect(() => {
    console.log(solicitudErrors);
  }, [solicitudErrors])

  const onChange = (text, type) => {
    setSolicitudData({ ...solicitudData, [type]: text });
  };

  const sendRequest = async () => {
    let errors = errorsValue();

    if (
      !solicitudData ||
      !solicitudData.CorreoAsociado ||
      solicitudData.CorreoAsociado == ""
    ) {
      Alert.alert("Aviso", "Indique un correo de respaldo", [{ text: "OK" }]);
      errors.CorreoAsociado = true;
      setSolicitudErrors(errors);
      return;
    }

    if (!validateEmail(solicitudData.CorreoAsociado)) {
      errors.CorreoAsociado = true;
      setSolicitudErrors(errors);
      Alert.alert("Aviso", "El correo ingresado no es válido", [
        { text: "OK" },
      ]);
      console.log("Invalid email");
      return;
    }

    setSolicitudErrors(errors);

    var response = await API_Service.postSolicitude(
      firebaseAuth.currentUser.uid,
      solicitudData
    );
    if (response != null) {
      navigation.navigate("Home");
    }
  };

  return (
    <>
      <AppBar />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.formLabel}>Correo Electrónico</Text>
          <View style={styles.formRow}>
            <InputComponent
              hasError={solicitudErrors.CorreoAsociado}
              style={{ width: "100%" }}
              placeholder={"Correo electrónico"}
              onChangeText={(e) => onChange(e, "CorreoAsociado")}
            />
          </View>
          <ButtonComponent
            style={styles.button}
            type="default"
            value="Solicitar Vacuna"
            onPress={() => sendRequest()}
          ></ButtonComponent>
        </ScrollView>
      </View>
    </>
  );
};

const solicitudValue = () => {
  return {
    CorreoAsociado: null,
  };
};

const errorsValue = () => {
  return {
    CorreoAsociado: false,
  };
};

const styles = StyleSheet.create({
  globe: {
    backgroundColor: Colors.COLOR_PRIMARY,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    color: "#008BAF",
    backgroundColor: "#D5F2F1",
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  formLabel: {
    color: "#008BAF",
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  formRow: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  dateInput: {
    borderWidth: 3,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: Colors.COLOR_ACCENT,
    backgroundColor: "white",
  },
  sexInput: {
    paddingHorizontal: 4,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: Colors.COLOR_ACCENT,
    backgroundColor: "white",
  },
  dateText: {
    fontSize: 20,
  },
});

export default RequestPage;
