import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import InputComponent from "../components/inputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/core";
import Colors from "../utils/Colors";
import AppBar from "../components/AppBar";
import { ScrollView } from "react-native-gesture-handler";
import ProgressBar from "react-native-progress/Bar";

const StatusPage = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollChild}
      >
        <View style={styles.progresscontainer}>
          <ProgressBar
            color={"rgba(2, 98, 104, 1)"}
            animated={true}
            indeterminate={true}
            progress={0.5}
            width={105}
            height={8}
          />
          <View style={{ width: 10 }} />
          <ProgressBar
            color={"rgba(0, 160, 170, 1)"}
            animated={true}
            indeterminate={true}
            progress={0.5}
            width={105}
            height={8}
          />
          <View style={{ width: 10 }} />
          <ProgressBar
            color={"rgba(18, 208, 220, 1)"}
            animated={true}
            indeterminate={true}
            progress={0.5}
            width={105}
            height={8}
          />
        </View>
        <View style={styles.globe}>
          <Text style={styles.label}>Fecha aproximada:</Text>
          <View style={{ height: 10 }}></View>
          <Text style={styles.label}>Nombre Vacuna:</Text>
          <View style={{ height: 10 }}></View>
          <Text style={styles.label}>Numero de Dosis:</Text>
          <View style={{ height: 10 }}></View>
          <Text style={styles.label}>Punto de Vacunación:</Text>
          <View style={{ height: 30 }}></View>
          <ButtonComponent
            style={styles.boton}
            type="default"
            onPress={() => {
              navigation.navigate("Login");
            }}
            value="Cerrar"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  scrollChild: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  progresscontainer: {
    flexDirection: "row",
    marginTop: 50,
    alignItems: "flex-start",
  },
  globe: {
    alignSelf: 'stretch',
    marginTop: 80,
    backgroundColor: Colors.COLOR_PRIMARY,
    padding: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  boton: {
    backgroundColor: Colors.APP_BACKGROUND,
    alignItems: "stretch",
    justifyContent: "center",
    fontSize: 10,
  },
});

export default StatusPage;
