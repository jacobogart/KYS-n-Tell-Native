import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export const BackImage = () => {
  return (
    <View style={{ margin: 20}}>
      <Icon name="chevron-left" size={50} color="#db938f" />
    </View>
  )
}