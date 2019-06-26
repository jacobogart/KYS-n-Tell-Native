import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styles } from '../styles/mainStyles';
import { ScrollView, StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { ResultCard } from '../components/ResultCard';
import { HeaderTitle } from '../components/HeaderTitle';
import { Footer } from '../components/Footer';
import { Map } from '../components/Map';

class ResultsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle navigation={navigation} title='KYS' />
  });

  constructor(props) {
    super(props);
    this.state = {
      active: 'List'
    }
  }

  toggleView = (text) => {
    this.setState({ active: text })
  }
  

  render() {
    const { locations, user, navigation } = this.props;
    const { active } = this.state;
    const { container, button, buttonText } = styles;
    const { page, activeButton, activeText, buttonHolder, toggleButton } = localStyles;
    const results = locations.map(location => 
      <ResultCard 
        key={location.id} 
        {...location} 
        user={user} 
        navigate={navigation.navigate}
      />);
    const listView = <ScrollView 
      showsHorizontalScrollIndicator={false}
      overScrollMode={'never'} 
      contentContainerStyle={page} 
      directionalLockEnabled={true}>
        {results}
      </ScrollView>
    const map = <Map user={user} locations={locations} navigate={navigation.navigate} />
    let listButton = active === 'List'
      ? activeButton
      : null;
    let mapButton = active === 'Map'
      ? activeButton
      : null;
    let listBtnText = active === 'List'
      ? activeText
      : null;
    let mapText = active === 'Map'
      ? activeText
      : null;
    
    return (
      <View style={container}>
        <View style={buttonHolder}>
          <TouchableHighlight
            style={[button, toggleButton, listButton]}
            onPress={() => this.toggleView('List')}
          >
            <Text style={[buttonText, listBtnText]}>List</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[button, toggleButton, mapButton]}
            onPress={() => this.toggleView('Map')}
          >
            <Text style={[buttonText, mapText]}>Map</Text>
          </TouchableHighlight>
        </View>
        {active === 'List' && listView}
        {active === 'Map' && map}
        <Footer/>
      </View>
    )
  }
}

export const mapStateToProps = (state) => ({
  locations: state.locations,
  user: state.user
});

export default connect(mapStateToProps)(ResultsScreen);

const localStyles = StyleSheet.create({
  page: {
    marginTop:3,
    backgroundColor: '#3f3f3f',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '110%'
  },
  activeButton: {
    backgroundColor: 'white',
  },
  activeText: {
    color: 'black'
  },
  buttonHolder: {
    flexDirection: 'row',
  },
  toggleButton: {
    width: '50%',
    borderRadius: 0
  },
});
