import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import InputComponent from "../components/inputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/core";
import { Picker } from "@react-native-picker/picker";
import Colors from "../utils/Colors";
import { isEmpty, validateEmail } from "../utils/validation";
import { firebaseAuth } from "../utils/firebaseConfig";
import AppBar from "../components/AppBar";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";
import API_Service from "../services/API";

const RegisterPage = () => {
  const navigation = useNavigation();
  const [registerData, setRegisterData] = useState(defaultValue);
  const [solicitantData, setSolicitantData] = useState(solicitantValue);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const initialDate = new Date(Date.now());
  const [date, setDate] = useState(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerValue, setPickerValue] = useState("Hombre");

  const defaultValue = () => {
    return {
      email: null,
      password: null,
      confirmPass: null,
    };
  };

  const solicitantValue = () => {
    return {
      name: null,
      apellidoPaterno: null,
      apellidoMaterno: null,
      edad: null,
      curp: null,
      sexo: "Hombre",
      fechaNacimiento: initialDate,
      lugarNacimiento: null,
    };
  };

  const changeDate = (e, value) => {
    setShowDatePicker(false);
    setDate(value || initialDate);
    onChange(value, "fechaNacimiento", "solicitant");
  };

  const register = async () => {
    let error = {};

    error.email = isEmpty(registerData.email);
    error.password = isEmpty(registerData.password);
    error.confirmPass = isEmpty(registerData.confirmPass);

    error.name = isEmpty(solicitantData.name);
    error.apellidoPaterno = isEmpty(solicitantData.apellidoPaterno);
    error.apellidoMaterno = isEmpty(solicitantData.apellidoMaterno);
    error.edad = isEmpty(solicitantData.edad);
    error.curp = isEmpty(solicitantData.curp);
    error.sexo = isEmpty(solicitantData.sexo);
    error.lugarNacimiento = isEmpty(solicitantData.lugarNacimiento);
    error.fechaNacimiento = isEmpty(solicitantData.fechaNacimiento);

    let anyError = Object.keys(error).some((err) => error[err]);
    if (anyError) {
      console.log("Todos los campos son obligatorios");
      Alert.alert("Aviso", "Todos los campos son obligatorios", [
        { text: "OK" },
      ]);
      setFormError(error);
      return;
    }

    const message = [];

    error.email = !validateEmail(registerData.email);
    if (error.email) {
      console.log("Email inválido");
      message.push("Email inválido");
    }

    if (
      !isEmpty(registerData.password) &&
      registerData.password != registerData.confirmPass
    ) {
      console.log("Las contraseñas no coinciden");
      message.push("Las contraseñas no coinciden");
      error.password = true;
      error.confirmPass = true;
    } else {
      error.password = false;
      error.confirmPass = false;
    }

    anyError = Object.keys(error).some((err) => error[err]);
    if (anyError) {
      setFormError(error);
      Alert.alert("Aviso", message.join("\n"), [{ text: "OK" }]);
      return;
    }
    setFormError({});

    try {
      setIsLoading(true);
      const credentials = await firebaseAuth.createUserWithEmailAndPassword(
        registerData.email,
        registerData.password
      );
      await API_Service.postSolicitant(credentials.user.uid, solicitantData);
      setIsLoading(false);
    } catch (err) {
      console.log("[Error:] ", err.code);
      Alert.alert("Error", getAuthErrorMsg(err.code), [{ text: "OK" }]);
      setIsLoading(false);
    }
  };

  const onChange = (text, type, state) => {
    if (state == "register") {
      setRegisterData({ ...registerData, [type]: text });
    } else {
      setSolicitantData({ ...solicitantData, [type]: text });
    }
  };

  return (
    <>
      <AppBar />
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.loadOverlay}>
            <ActivityIndicator size="large" color={Colors.COLOR_PRIMARY} />
          </View>
        )}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.globe}>
            <Text style={styles.label}>CURP</Text>
            <View style={{ height: 10 }}></View>
            <InputComponent
              hasError={formError["curp"]}
              placeholder="CURP"
              onChangeText={(e) => onChange(e, "curp", "solicitant")}
            />
          </View>

          <View style={styles.globe}>
            <Text style={styles.formLabel}>Nombre</Text>
            <View style={styles.formRow}>
              <InputComponent
                hasError={formError["name"]}
                onChangeText={(e) => onChange(e, "name", "solicitant")}
                style={{ width: "100%" }}
                placeholder={"Nombre"}
              />
            </View>
            <Text style={styles.formLabel}>Apellido Paterno</Text>
            <View style={styles.formRow}>
              <InputComponent
                hasError={formError["apellidoPaterno"]}
                onChangeText={(e) =>
                  onChange(e, "apellidoPaterno", "solicitant")
                }
                style={{ width: "100%" }}
                placeholder={"Apellido Paterno"}
              />
            </View>
            <Text style={styles.formLabel}>Apellido Materno</Text>
            <View style={styles.formRow}>
              <InputComponent
                hasError={formError["apellidoMaterno"]}
                onChangeText={(e) =>
                  onChange(e, "apellidoMaterno", "solicitant")
                }
                style={{ width: "100%" }}
                placeholder={"Apellido Materno"}
              />
            </View>
            <Text style={styles.formLabel}>Fecha de Nacimiento</Text>
            <View style={styles.formRow}>
              <TouchableOpacity
                onPress={() => {
                  setShowDatePicker(true);
                }}
                style={[styles.dateInput, { width: "100%" }]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.dateText}>
                    {date.toLocaleDateString("es-es")}
                  </Text>
                  <Entypo name="calendar" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.formLabel}>Correo Electrónico</Text>
            <View style={styles.formRow}>
              <InputComponent
                hasError={formError["email"]}
                onChangeText={(e) => onChange(e, "email", "register")}
                style={{ width: "100%" }}
                placeholder={"Correo electrónico"}
              />
            </View>
            <Text style={styles.formLabel}>Contraseña</Text>
            <View style={styles.formRow}>
              <InputComponent
                isPassword={true}
                hasError={formError["password"]}
                onChangeText={(e) => onChange(e, "password", "register")}
                style={{ width: "100%" }}
                placeholder={"Contraseña"}
              />
            </View>
            <Text style={styles.formLabel}>Repetir contraseña</Text>
            <View style={styles.formRow}>
              <InputComponent
                isPassword={true}
                hasError={formError["confirmPass"]}
                onChangeText={(e) => onChange(e, "confirmPass", "register")}
                style={{ width: "100%" }}
                placeholder={"Repetir contraseña"}
              />
            </View>
            <Text style={styles.formLabel}>Lugar de Nacimiento</Text>
            <View style={styles.formRow}>
              <InputComponent
                hasError={formError["lugarNacimiento"]}
                onChangeText={(e) =>
                  onChange(e, "lugarNacimiento", "solicitant")
                }
                style={{ width: "100%" }}
                placeholder={"Lugar de nacimiento"}
              />
            </View>
            <Text style={styles.formLabel}>Edad y Sexo</Text>
            <View style={[styles.formRow]}>
              <InputComponent
                style={{ minWidth: "45%" }}
                placeholder={"Edad"}
                keyboardType={"number-pad"}
                hasError={formError["edad"]}
                onChangeText={(e) => onChange(e, "edad", "solicitant")}
              />
              <View style={[styles.sexInput, { minWidth: "45%" }]}>
                <Picker
                  style={{ padding: 0 }}
                  selectedValue={pickerValue}
                  onValueChange={(val, i) => {
                    setPickerValue(val);
                    onChange(val, "sexo", "solicitant");
                  }}
                >
                  <Picker.Item label="Hombre" value="Hombre" />
                  <Picker.Item label="Mujer" value="Mujer" />
                </Picker>
              </View>
            </View>

            <View style={{ height: 10 }} />
            <ButtonComponent
              onPress={() => {
                register();
              }}
              value="Registrarse"
            />
            <View style={{ height: 10 }} />
            <ButtonComponent
              type="primary"
              onPress={() => {
                navigation.navigate("Login");
              }}
              value="Iniciar Sesión"
            />
          </View>
        </ScrollView>
      </View>

      {showDatePicker && <DateTimePicker onChange={changeDate} value={date} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  scrollChild: {
    minHeight: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  formInput: {
    width: "80%",
  },

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

  loadOverlay: {
    justifyContent: "center",
    backgroundColor: "#FFF5",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 3,
  },
});

export default RegisterPage;
