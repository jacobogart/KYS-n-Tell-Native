import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles/mainStyles';
import { NavButton } from '../components/NavButton';
import { Footer } from '../components/Footer';

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
        <View style={headingHolder}>
          <Text style={subTitle}>Know Your Status</Text>
          <Text style={title}>KYS n' Tell</Text>
          <Text style={subTitle}>Tell Your Partners</Text>
        </View>
        <View style={buttonHolder}>
          <NavButton
            text="Find a location"
            callback={() => navigation.navigate("Search")}
          />
          <NavButton
            text="Anonymously Share Status"
            callback={() => navigation.navigate("Contacts")}
          />
        </View>
        <Footer/>
      </View>
    )
  }
}


const localStyles = StyleSheet.create({
  buttonHolder: {
    flex: 0.35,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-around'
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
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  page: {
    paddingTop: 100,
    paddingBottom: 100
  }
});

