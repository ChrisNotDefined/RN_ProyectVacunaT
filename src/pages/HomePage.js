import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/core";
import Colors from "../utils/Colors";
import AppBar from "../components/AppBar";
import { firebaseAuth } from "../utils/firebaseConfig";

const HomePage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    
  }, []);

  const getSolicitants = () => {
    
  }

  const logout = () => {
    firebaseAuth.signOut();
  };

  return (
    <>
      <AppBar />
      <View style={styles.container}>
        <ButtonComponent
          type="defualt"
          onPress={() => {
            navigation.navigate("Request");
          }}
          value="Solicitar Vacuna"
        />
        <View style={{ height: 20 }} />
        <ButtonComponent
          type="defualt"
          onPress={() => {
            navigation.navigate("Status");
          }}
          value="Consultar status"
        />
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
