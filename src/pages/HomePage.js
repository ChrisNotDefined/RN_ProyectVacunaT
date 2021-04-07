import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import { useNavigation } from '@react-navigation/core';
import Colors from '../utils/Colors';
import AppBar from "../components/AppBar";

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <>
    <AppBar />
    <View style={styles.container}>
     <ButtonComponent type="defualt" onPress={() => {navigation.navigate('Request')}} value="Solicitar Vacuna"/>
     <ButtonComponent type="defualt" onPress={() => {navigation.navigate('Status')}} value="Consultar status"/>
     <ButtonComponent type="defualt" onPress={() => {navigation.navigate('Info')}} value="Info Vacunación"/>
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

export default HomePage;