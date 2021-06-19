import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import AppBar from "../components/AppBar";
import Colors from "../utils/Colors";

const InfoPage = () => {
  const [image, setImage] = useState();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      setIsloading(true)
      const obj = await require("../img/advices.jpg");
      setImage(obj);
      setIsloading(false)
    };

    fetchImage();
  }, []);

  return (
    <>
      <AppBar />
      <View style={styles.container}>
        <ActivityIndicator size="large" animating={isLoading} color={Colors.COLOR_PRIMARY} />
        <Image style={styles.stretch} source={image} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
  stretch: {
    width: "100%",
    resizeMode: "contain",
  },
});

export default InfoPage;
