import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AppBar from "../components/AppBar";
import InputComponent from "../components/inputComponent";
import Colors from "../utils/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";
import ButtonComponent from "../components/ButtonComponent";

const RequestPage = () => {
  const initialDate = new Date(Date.now());
  const [date, setDate] = useState(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const changeDate = (e, value) => {
    setShowDatePicker(false);
    setDate(value || initialDate);
  };

  const handleSolitude = () => {};

  return (
    <>
      <AppBar />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.globe}>
            <Text style={styles.label}>CURP</Text>
            <View style={{ height: 10 }}></View>
            <InputComponent placeholder="CURP" />
          </View>

          <View style={styles.globe}>
            <Text style={styles.formLabel}>Nombre</Text>
            <View style={styles.formRow}>
              <InputComponent
                style={{ width: "100%" }}
                placeholder={"Nombre"}
              />
            </View>
            <Text style={styles.formLabel}>Apellido Paterno</Text>
            <View style={styles.formRow}>
              <InputComponent
                style={{ width: "100%" }}
                placeholder={"Apellido Paterno"}
              />
            </View>
            <Text style={styles.formLabel}>Apellido Materno</Text>
            <View style={styles.formRow}>
              <InputComponent
                style={{ width: "100%" }}
                placeholder={"Apellido Materno"}
              />
            </View>
            <Text style={styles.formLabel}>Fecha de Nacimiento</Text>

            <View style={styles.formRow}>
              <TouchableOpacity
                containerStyle={{ width: "100%" }}
                onPress={() => {
                  setShowDatePicker(true);
                }}
                style={styles.dateInput}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.dateText}>
                    {date.toLocaleDateString('es-es')}
                  </Text>
                  <Entypo name="calendar" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.formLabel}>Correo Electrónico</Text>
            <View style={styles.formRow}>
              <InputComponent
                style={{ width: "100%" }}
                placeholder={"Correo electrónico"}
              />
            </View>
            <Text style={styles.formLabel}>Lugar de Nacimiento</Text>
            <View style={styles.formRow}>
              <InputComponent
                style={{ width: "100%" }}
                placeholder={"Lugar de nacimiento"}
              />
            </View>
            <Text style={styles.formLabel}>Edad y Sexo</Text>
            <View style={[styles.formRow]}>
              <InputComponent
                style={{ minWidth: "45%" }}
                placeholder={"Edad"}
              />
              <InputComponent
                style={{ minWidth: "45%" }}
                placeholder={"Sexo"}
              />
            </View>
            <ButtonComponent
              type="default"
              value={"Solicitar"}
              onPress={handleSolitude}
            />
          </View>
        </ScrollView>
      </View>

      {showDatePicker && <DateTimePicker onChange={changeDate} value={date} />}
    </>
  );
};

const styles = StyleSheet.create({
  globe: {
    backgroundColor: Colors.COLOR_PRIMARY,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  formLabel: {
    color: "white",
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
  dateText: {
    fontSize: 20,
  },
});

export default RequestPage;
