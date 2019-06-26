import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles/mainStyles';
import { Footer } from '../components/Footer';

export class ErrorScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <Text>ErrorScreen</Text>
        <Footer />
      </View>
    )
  }
}


const localStyles = StyleSheet.create({

});

