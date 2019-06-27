import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, Picker, TouchableHighlight, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { styles } from '../styles/mainStyles';
import { setLocations, setUserLocation } from '../actions/index';
import { fetchLatLong } from '../api/fetchLatLong';
import { fetchLocations } from '../api/fetchLocations';
import { Footer } from '../components/Footer';
import { HeaderTitle } from '../components/HeaderTitle';

class SearchScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle navigation={navigation} title='KYS'/>
  });

  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      distance: '',
      isLoading: false,
      error: false,
      showZipcode: false,
      hideRange: false
    };
  }

  handleChange = (name, text) => {
    this.setState({ [name]: text });
  }

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const cleanPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          geo: true
        }
        this.props.setUserLocation(cleanPosition);
        this.handleSubmit(cleanPosition)},
      error => console.log(error)
    )
  }

  toggleShowZipcode = (bool) => {
    this.setState({ showZipcode: bool });
  }

  handleSearch = () => {
    return fetchLatLong(this.state.zipcode)
      .then(location => {
        this.props.setUserLocation({...location, geo: false});
        return this.handleSubmit(location);
      })
  }

  handleSubmit = (position) => {
    this.setState({ isLoading: true, error: false });
    fetchLocations(position, this.state.distance)
      .then(results => {
        this.setState({ isLoading: false, showZipcode: false })
        if (results.length) {
          this.props.setLocations(results);
          this.props.navigation.navigate("Results");
        } else {
          this.setState({ error: true })
        }
      })
  }

  render() {
    const { isLoading, error, showZipcode, adjustZipInput } = this.state;
    const { container, input, button, buttonText } = styles;
    const { heading, loader, loaderHolder, btnHolder, zipMargin, pickerMargin } = localStyles;
    const adjustedZipMargin = adjustZipInput
      ? zipMargin
      : null;
    const adjustedPickerMargin = adjustZipInput
      ? pickerMargin
      : null;
    
    const zipcodeInput = 
      <TextInput
        returnKeyType='done'
        keyboardType={'numeric'}
        style={[input, adjustedZipMargin]}
        placeholder="Enter zipcode..."
        value={this.state.zipcode}
        onChangeText={(text) => this.handleChange('zipcode', text)}
        onSubmitEditing={() => this.setState({ adjustZipInput: false })}
        onFocus={() => this.setState({ adjustZipInput: true })}
      />

    const searchBtn = 
      <TouchableHighlight
        style={button}
        onPress={this.handleSearch}
      >
        <Text style={buttonText}>Search</Text>
      </TouchableHighlight>
    
    const locationBtn = 
      <TouchableHighlight
        style={button}
        onPress={this.getUserLocation}
      >
        <Text style={buttonText}>Use Current Location</Text>
      </TouchableHighlight>

    const zipcodeBtn = 
      <TouchableHighlight
        style={button}
        onPress={() => this.toggleShowZipcode(true)}
      >
        <Text style={buttonText}>Use zipcode</Text>
      </TouchableHighlight>

    const form = (
      <KeyboardAvoidingView style={[container, localStyles.form]} behavior="padding" enabled>
        <Text style={heading}>Search for HIV/STD tesing centers near you</Text>
        <Picker
          style={[localStyles.picker, adjustedPickerMargin]}
          itemStyle={localStyles.pickerItem} selectedValue={this.state.distance}
          onValueChange={(itemValue) => this.handleChange('distance', itemValue)}
          className="search-input"
        >
          <Picker.Item value="" enabled={false} label="Select range..." />
          <Picker.Item value="10" label="10 miles" />
          <Picker.Item value="20" label="20 miles" />
          <Picker.Item value="30" label="30 miles" />
          <Picker.Item value="40" label="40 miles" />
          <Picker.Item value="50" label="50 miles" />
        </Picker>
        {error && <Text>No locations found, please increase range</Text>}
        <View style={btnHolder}>
          {showZipcode && zipcodeInput}
          {!showZipcode && zipcodeBtn}
          {showZipcode && searchBtn}
          {!showZipcode && locationBtn}
        </View>     
      </KeyboardAvoidingView>
    );
    const loading = (
      <View style={loaderHolder}>
        <Image 
          style={loader}
          source={{uri:"http://i66.tinypic.com/9v8d4k.gif"}} 
        />
      </View>
    );

    return (
      <View style={container}>
        {isLoading ? loading : form}
        <Footer/>
      </View>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setLocations: (locations) => dispatch(setLocations(locations)),
  setUserLocation: (location) => dispatch(setUserLocation(location))
});

export default connect(null, mapDispatchToProps)(SearchScreen);

const localStyles = StyleSheet.create({
  picker: {
    width: '90%',
    height: 120,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  pickerItem: {
    height: 120,
    fontSize: 24,
    color: 'black'
  },
  form: {
    width: '100%',
    flex: 0.9,
    paddingBottom: 20
  },
  heading: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: '600'
  },
  loader: {
    height: 200,
    width: 200,
    margin: -20
  },
  loaderHolder: {
    backgroundColor: 'white',
    borderRadius: 200
  },
  btnHolder: {
    height: 180,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  pickerMargin: {
    marginTop: -30
  },
  zipMargin: {
    marginTop: -60
  }
});