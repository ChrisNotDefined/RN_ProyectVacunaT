import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import Colors from "../utils/Colors";

const InputComponent = (props) => {
  const { initialValue, isPassword, placeholder } = props;
  const [value, setValue] = useState(initialValue ?? "");
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isPassword ?? false}
        style={styles.inputText}
        value={value}
        onChangeText={(v) => setValue(v)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: "red",
    borderWidth: 3,
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: Dimensions.get("screen").width / 2,
    borderRadius: 10,
    borderColor: Colors.COLOR_ACCENT,
    backgroundColor: "white",
  },
  inputText: {
    fontSize: 20,
  },
});

export default InputComponent;
