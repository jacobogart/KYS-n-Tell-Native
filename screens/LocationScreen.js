import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, Linking, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { styles } from '../styles/mainStyles';
import { connect } from 'react-redux';
import { fetchPlaceID } from '../api/fetchPlaceID';
import { fetchDetails } from '../api/fetchDetails';
import { Footer } from '../components/Footer';

class LocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: { },
      loading: false
    }
  }
  
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    const { title, point } = this.props.locations.find(location => location.id === id);
    fetchPlaceID(title, point)
      .then(id => fetchDetails(id))
      .then(details => this.setState({ ...details }));
  }
  
  render() {
    const id = this.props.navigation.getParam('id');
    const { title, address, point, telephone } = this.props.locations.find(location => location.id === id);
    const { detailsHolder, contactHolder, titleText, addressText, linkText } = localStyles;
    const globe = <Icon name="globe" size={21} color="#db938f" />;
    const phone = <Icon name="phone" size={21} color="#db938f" />;
    const smallTitle = title.length > 35
      ? { fontSize: 30 }
      : null;
    
    return (
      <View style={styles.container}>
        <View style={detailsHolder}>
          <Text style={[titleText, smallTitle]}>
            {title}
          </Text>
          <Text style={addressText}>
            {address.split(';')[0]}{"\n"}{address.split(';')[1]}
          </Text>
          <View style={contactHolder}>
            <Text style={linkText}
              onPress={() => Linking.openURL(this.state.website)}>
              {globe} Website
            </Text>
            <Text style={linkText}
              onPress={() => Linking.openURL(`tel:${telephone}`)}>
              {phone} {telephone}
            </Text>
          </View>
        </View>
        <MapView
          style={{ flex: 0.8, width: '90%' }}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: +point.lat,
            longitude: +point.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: +point.lat,
              longitude: +point.lng 
            }}
        />
        </MapView>
        <Footer/>
      </View>
    )
  }
}

export const mapStateToProps = (state) => ({
  locations: state.locations
})

export default connect(mapStateToProps)(LocationScreen);

const localStyles = StyleSheet.create({
  detailsHolder: {
    backgroundColor: 'white',
    width: '90%',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  contactHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addressText: {
    color: 'grey',
    fontSize: 24,
    fontWeight: '600'
  },
  titleText: {
    fontSize: 35,
    fontWeight: '800'
  },
  linkText: {
    color: "#db938f",
    fontSize: 21
  }
});

