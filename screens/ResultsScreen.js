import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import { styles } from '../styles/mainStyles';
import { NavButton } from '../components/NavButton';
import { ResultCard } from '../components/ResultCard';

class ResultsScreen extends Component {
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
    paddingVertical: 50
  }
});
