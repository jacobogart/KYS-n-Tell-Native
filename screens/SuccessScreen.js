import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles/mainStyles';
import { Footer } from '../components/Footer';
import { HeaderTitle } from '../components/HeaderTitle';

export class SuccessScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle navigation={navigation} title='TELL' />
  });

  render() {
    const { container } = styles;
    const { success, text, textHolder } = localStyles;
    return (
      <View style={container}>
        <Text style={success}>
          Messages successfully sent!
        </Text>
        <View style={textHolder}>
          <Text style={text}>
            Thank you for taking the brave step to share your status with your partner(s).
          </Text>
        </View>
        <Footer />
      </View>
    )
  }
}


const localStyles = StyleSheet.create({
  success: {
    color: '#5bce5b',
    fontSize: 55,
    fontWeight: '800',
    textAlign: 'center'
  },
  text: {
    color: 'white',
    fontSize: 27,
    fontWeight: '600',
    textAlign: 'center'
  }, 
  textHolder: {
    paddingHorizontal: 10
  }
});

