import React, { Component } from 'react';
import { Text, View, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from '../styles/mainStyles';
import { connect } from 'react-redux';
import { fetchPlaceID } from '../api/fetchPlaceID';
import { fetchDetails } from '../api/fetchDetails';

class LocationScreen extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    const { title, point } = this.props.locations.find(location => location.id === id);
    fetchPlaceID(title, point)
      .then(id => fetchDetails(id))
      .then(result => this.setState({ ...result}))
  }
  
  render() {
    const id = this.props.navigation.getParam('id');
    const { title, address, point, telephone } = this.props.locations.find(location => location.id === id);
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{address.split(';')[0]} {"\n"}{address.split(';')[1]}</Text>
        <Text style={{ color: 'blue' }}
          onPress={() => Linking.openURL(this.state.website)}>
          Website
        </Text>
        <Text style={{ color: 'blue' }}
          onPress={() => Linking.openURL(`tel:${telephone}`)}>
          {telephone}
        </Text>
        <MapView
          style={ {flex: 0.5, width: '80%' }}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: +point.lat,
            longitude: +point.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
    )
  }
}

export const mapStateToProps = (state) => ({
  locations: state.locations
})

export default connect(mapStateToProps)(LocationScreen);

