import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import Colors from "../utils/Colors";

const InputComponent = (props) => {
  const {
    value,
    isPassword,
    placeholder,
    style: externalStyles,
    onChangeText,
    onFocus,
    onPressIn,
    keyboardType,
  } = props;
  return (
    <View style={[styles.inputContainer, externalStyles]}>
      <TextInput
        keyboardType={keyboardType}
        onPressIn={onPressIn}
        onFocus={onFocus}
        placeholder={placeholder}
        secureTextEntry={isPassword ?? false}
        style={styles.inputText}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 3,
    paddingHorizontal: 4,
    paddingVertical: 8,
    minWidth: Dimensions.get("screen").width / 2,
    borderRadius: 10,
    borderColor: Colors.COLOR_ACCENT,
    backgroundColor: "white",
  },
  inputText: {
    fontSize: 20,
  },
});

export default InputComponent;
