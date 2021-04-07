import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../utils/Colors';
import vacuna from '../img/vacuna.png'


const AppBar = () => {
  return (
    <View style = {styles.container}>
     <Text style = {styles.text}>
     <Image 
     style = {styles.image}
     source={vacuna}/>
       VACUNA-T
       </Text>
   </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_ACCENT,
    height: 100,
  },
  image: {
    height: 70,
    width: 70, 
    resizeMode: "stretch",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    height: 120
  }
})

export default AppBar;