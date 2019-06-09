import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from '../styles/mainStyles';
import { NavButton } from '../components/NavButton';

export class ContactsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CONTACTS</Text>
      </View>
    )
  }
}

