import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/core";
import Colors from "../utils/Colors";
import AppBar from "../components/AppBar";
import { firebaseAuth } from "../utils/firebaseConfig";
import API_Service from "../services/API";
import { useState } from "react/cjs/react.development";

const HomePage = () => {
  const navigation = useNavigation();
  const [solicitude, setSolicitude] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    getSolicitude();
  }, []);

  const getSolicitude = async () => {
    setIsloading(true);
    try {
      const solicitude = await API_Service.getSolicitudeBySolicitantID(
        firebaseAuth.currentUser.uid
      );
      setSolicitude(solicitude);
      setIsloading(false);
      console.log('Solicitude ', solicitude);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    firebaseAuth.signOut();
  };

  return (
    <>
      <AppBar />
      <View style={styles.container}>
        {!solicitude ? (
          <ButtonComponent
            type="defualt"
            onPress={() => {
              navigation.navigate("Request");
            }}
            value="Solicitar Vacuna"
          />
        ) : (
          <ButtonComponent
            type="defualt"
            onPress={() => {
              navigation.navigate("Status");
            }}
            value="Consultar status"
          />
        )}

        <View style={{ height: 20 }} />
        <ButtonComponent
          type="defualt"
          onPress={() => {
            navigation.navigate("Info");
          }}
          value="Info Vacunación"
        />
        <View style={{ height: 20 }} />
        <ButtonComponent
          type="defualt"
          onPress={logout}
          value="Cerrar Sesión"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
    alignItems: "stretch",
    justifyContent: "center",
  },
});

export default HomePage;
