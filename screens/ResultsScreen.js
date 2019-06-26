import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import { ResultCard } from '../components/ResultCard';
import { HeaderTitle } from '../components/HeaderTitle';

class ResultsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle navigation={navigation} title='KYS' />
  });

  render() {
    const { locations } = this.props;
    const { page } = localStyles;
    const results = locations.map(location => 
      <ResultCard 
        key={location.id} 
        {...location} 
        user={this.props.user} 
        navigate={this.props.navigation.navigate}
      />);
    
    return (
      <ScrollView contentContainerStyle={page}>
        {results}
      </ScrollView>
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
    backgroundColor: '#3f3f3f',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 50
  }
});
