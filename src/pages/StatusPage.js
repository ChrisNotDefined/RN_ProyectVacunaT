import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/core";
import Colors from "../utils/Colors";
import AppBar from "../components/AppBar";
import { ScrollView } from "react-native-gesture-handler";
import ProgressBar from "react-native-progress/Bar";
import { useEffect } from "react";
import API_Service from "../services/API";
import { firebaseAuth } from "../utils/firebaseConfig";

const StatusPage = () => {
  const navigation = useNavigation();
  const [solicitude, setSolicitude] = useState();

  useEffect(() => {
    getSolicitude();
    const timer = setInterval(() => {
      getSolicitude();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getSolicitude = async () => {
    const solicitude = await API_Service.getSolicitudeBySolicitantID(
      firebaseAuth.currentUser.uid
    );

    setSolicitude(solicitude);
  };

  const status = solicitude?.EstadoSolicitud;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollChild}
      >
        <View style={styles.progresscontainer}>
          <View>
            <Text style={styles.progressText}>
              {!status ? "Enviando" : "Enviada"}
            </Text>
            <View style={{ height: 20 }}></View>
            <ProgressBar
              color={"rgba(2, 98, 104, 1)"}
              animated={true}
              indeterminate={!status}
              progress={1}
              width={105}
              height={8}
            />
          </View>
          <View style={{ width: 10 }} />
          <View>
            <Text style={styles.progressText}>
              {status === "Aceptada" || status === "Rechazada"
                ? "Evaluada"
                : "En evaluación"}
            </Text>
            <View style={{ height: 20 }}></View>
            <ProgressBar
              color={"rgba(0, 160, 170, 1)"}
              animated={true}
              progress={1}
              indeterminate={status === "En evaluación"}
              width={105}
              height={8}
            />
          </View>
          <View style={{ width: 10 }} />
          <View>
            <Text style={styles.progressText}>
              {status === "Aceptada" || status === "Rechazada"
                ? "Preparada"
                : "Preparando"}
            </Text>
            <View style={{ height: 20 }}></View>
            <ProgressBar
              color={"rgba(18, 208, 220, 1)"}
              animated={true}
              indeterminate={status !== "Aceptada" && status !== "Rechazada"}
              progress={status === "Aceptada" || status === "Rechazada" ? 1 : 0}
              width={105}
              height={8}
            />
          </View>
        </View>
        <View style={styles.globe}>
          {loadSolicitudeInfo(solicitude)}
          <View style={{ height: 30 }}></View>
          <ButtonComponent
            style={styles.boton}
            type="default"
            onPress={() => {
              navigation.navigate("Home");
            }}
            value="Cerrar"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const loadSolicitudeInfo = (solicitude) => {
  if (!solicitude || !solicitude.EstadoSolicitud) {
    return <Text>No es posible obtener la informacion</Text>;
  }

  const possibleOutcomes = {
    Aceptada: <ValidSolicitudeInfo solicitude={solicitude} />,
    Rechazada: <DeniedSolicitudeInfo />,
    "En evaluación": <PendingSolicitudeInfo />,
  };

  return (
    possibleOutcomes[solicitude.EstadoSolicitud] || (
      <Text>{solicitude.EstadoSolicitud}</Text>
    )
  );
};

const ValidSolicitudeInfo = ({ solicitude }) => {
  return (
    <>
      <Text style={styles.message}>
        Su solicitud ha sido aceptada, su vacuna está registrada
      </Text>
      <View style={{ height: 15 }}></View>
      <Text style={styles.label}>
        Fecha aproximada: {solicitude.FechaVacunacion}
      </Text>
      <View style={{ height: 10 }}></View>
      <Text style={styles.label}>Nombre Vacuna: {solicitude.NombreVacuna}</Text>
      <View style={{ height: 10 }}></View>
    </>
  );
};

const DeniedSolicitudeInfo = () => {
  return (
    <Text style={styles.message}>
      Tu solicitud ha sido rechazada, verifica que eres mayor de 50 años y tus
      datos estén correctos
    </Text>
  );
};

const PendingSolicitudeInfo = () => {
  return (
    <Text style={styles.message}>
      Estamos revisando tu solicitud, en unos minutos tendremos tu respuesta
    </Text>
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
    alignSelf: "stretch",
    marginTop: 80,
    backgroundColor: Colors.COLOR_PRIMARY,
    padding: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  message: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
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
  progressText: {
    textAlign: "center",
  },
});

export default StatusPage;
