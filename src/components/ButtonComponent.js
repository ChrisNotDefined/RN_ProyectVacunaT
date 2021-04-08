import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../utils/Colors";

const ButtonComponent = (props) => {
  const { type, value, onPress } = props;

  const styles = decideStyle(type);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.textStyles}>{value}</Text>
      </View>
    </Pressable>
  );
};

const decideStyle = (type) => {
  if (type === "primary") return styles_primary;

  if (type === "defualt") return styles_defualt;

  if (type === "form") return styles_form;

  return styles_defualt;
};

const styles_primary = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.COLOR_PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonPressed: {
    backgroundColor: Colors.COLOR_PRIMARY_DARKER,
  },
  textStyles: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

const styles_defualt = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: Colors.COLOR_PRIMARY,
    borderWidth: 1.5,
  },
  buttonPressed: {
    backgroundColor: Colors.COLOR_SHADE,
  },
  textStyles: {
    color: Colors.COLOR_PRIMARY,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

const styles_form = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.APP_BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonPressed: {
    backgroundColor: Colors.COLOR_SHADE,
  },
  textStyles: {
    color: Colors.COLOR_PRIMARY,
    fontWeight: "bold",
  },
});

export default ButtonComponent;
