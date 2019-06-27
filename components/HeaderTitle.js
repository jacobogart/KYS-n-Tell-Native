import React from 'react';
import { Text, TouchableHighlight } from 'react-native';


export const HeaderTitle = (props) => {
  return (
    <TouchableHighlight
      onPress={() => props.navigation.navigate("Home")}
    >
      <Text style={{
        fontSize: 100,
        fontWeight: '700',
        color: 'white'}}>{props.title}</Text>
    </TouchableHighlight>
  )
}