import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { styles } from '../styles/mainStyles';

export const NavButton = (props) => {
  return (
      <TouchableHighlight
        style={styles.button}
        onPress={props.callback}
      >
      <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableHighlight>
  )
}
