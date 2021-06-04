import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import InputComponent from '../components/inputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { useNavigation } from '@react-navigation/core';
import Colors from '../utils/Colors';
import AppBar from "../components/AppBar";
import { ScrollView } from "react-native-gesture-handler";

const RegisterPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
    <AppBar/>
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollChild}>
      <InputComponent initialValue={''} placeholder={"Username"}/>
      <View style={{height: 10}}/>
      <InputComponent initialValue={''} placeholder={"Password"} isPassword={true}/>
      <View style={{height: 10}}/>
      <InputComponent initialValue={''} placeholder={"Confirm Password"} isPassword={true}/>
      <View style={{height: 10}}/>
      <ButtonComponent type="primary" onPress={() => {navigation.navigate('Login')}} value='Registrarse'/>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  scrollChild: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})

export default RegisterPage;