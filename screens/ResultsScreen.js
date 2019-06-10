import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { styles } from '../styles/mainStyles';
import { NavButton } from '../components/NavButton';

class ResultsScreen extends Component {
  render() {
    const results = this.props.locations.map(location => <Text>{location.title}</Text>)
    return (
      <View style={styles.container}>
        {results}
      </View>
    )
  }
}

export const mapStateToProps = (state) => ({
  locations: state.locations,
  user: state.user
});

export default connect(mapStateToProps)(ResultsScreen);
