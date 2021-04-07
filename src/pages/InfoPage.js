import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const InfoPage = () => {
  return (
    <View style={styles.container}>
      <Text>Info Page</Text>
      <Image
        style={styles.stretch}
        source={{
          uri:
            "https://www.enfermeriayvacunas.es/wp-content/uploads/2020/05/anen.jpg",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
  stretch: {
    height: 300,
    aspectRatio: 1,
    resizeMode: "stretch",
  },
});

export default InfoPage;
