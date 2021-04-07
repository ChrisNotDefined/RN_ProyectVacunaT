import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../utils/Colors';


const AppBar = () => {
  return (
    <View style = {styles.container}>
     <Text>App Bar</Text>
   </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_ACCENT,
    height: 70,
  },
})

export default AppBar;