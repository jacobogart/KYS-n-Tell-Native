import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles/mainStyles';
import { NavButton } from '../components/NavButton';

export class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { container } = styles;
    const { buttonHolder, headingHolder, title, subTitle, page } = localStyles;
    const { navigation } = this.props;
    return (
      <View style={[container, page]}>
        <View style={[container, headingHolder]}>
          <Text style={subTitle}>Know Your Status</Text>
          <Text style={title}>KYS n' Tell</Text>
          <Text style={subTitle}>Tell Your Partners</Text>
        </View>
        <View style={[container, buttonHolder]}>
          <NavButton
            text="Find a location"
            screen="Search"
            navigation={navigation}
          />
          <NavButton
            text="Anonymously Share Status"
            screen="Contacts"
            navigation={navigation}
          />
        </View>
      </View>
    )
  }
}


export const localStyles = StyleSheet.create({
  buttonHolder: {
    flex: 0.3,
    width: '90%'
  },
  title: {
    color: 'white',
    fontWeight: '800',
    fontSize: 65,
    marginVertical: 50,
    marginHorizontal: 0
  },
  subTitle: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    padding: 15,
    paddingHorizontal: 30
  },
  headingHolder: {
    flex: 0.3,
  },
  page: {
    paddingTop: 100,
    paddingBottom: 50
  }
});

