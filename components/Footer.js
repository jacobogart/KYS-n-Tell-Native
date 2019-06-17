import React from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';

export const Footer = () => {
  const { footer, footerText, phone } = localStyles;
  return (
    <View style={footer}>
      <Text style={footerText}>For more information, call ( 
        <Text style={[footerText, phone]}
          onPress={() => Linking.openURL("tel:1-800-227-8922")}>
           1-800-227-8922
        </Text>)
      </Text>
      <Text style={footerText}>If you are feeling suicidal, call (
        <Text style={[footerText, phone]}
          onPress={() => Linking.openURL("tel:1-800-273-8255")}>
          1-800-273-8255
        </Text>) 
      </Text>
    </View>
  )
}

const localStyles = StyleSheet.create({
  footer: {
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 80,
    width: '100%',
    justifyContent: 'space-evenly',
    paddingBottom: 10
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15
  },
  phone: {
    textDecorationLine: 'underline',
    padding: 20
  }
});