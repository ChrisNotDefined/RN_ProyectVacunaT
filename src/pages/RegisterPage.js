import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputComponent from '../components/inputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { useNavigation } from '@react-navigation/core';
import Colors from '../utils/Colors';
import AppBar from "../components/AppBar";

const RegisterPage = () => {
  const navigation = useNavigation();
  return (
    <>
    <AppBar/>
    <View style={styles.container}>
      <InputComponent initialValue={'Initialized'}/>
      <InputComponent initialValue={'Initialized'}/>
      <InputComponent initialValue={'Initialized'}/>
      <ButtonComponent type="primary" onPress={() => {navigation.navigate('Login')}} value='Registrarse'/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default RegisterPage;