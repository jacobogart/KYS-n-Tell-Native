import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, Picker, TouchableHighlight, Image, StyleSheet } from 'react-native';
import { styles } from '../styles/mainStyles';
import { NavButton } from '../components/NavButton';
import { setLocations, setUserLocation } from '../actions/index';
import { fetchLatLong } from '../api/fetchLatLong';
import { fetchLocations } from '../api/fetchLocations';
import { Footer } from '../components/Footer';

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  

  render() {
    console.log(this.props.contacts);
    const { isLoading, error, zipcode, distance } = this.state;
    const { container, input, button, buttonText } = styles;
    const { heading, loader, loaderHolder } = localStyles;

    return (
      <View style={container}>
        <View style={[container, localStyles.form]}>
          <Text style={heading}>DETAILS</Text>
          <TextInput
            style={input}
            placeholder="Enter zipcode..."
            value={this.state.zipcode}
            onChangeText={(text) => this.handleChange('zipcode', text)}
          />
          {error && <Text>No locations found, please increase range</Text>}
          <Picker
            style={localStyles.picker}
            itemStyle={localStyles.pickerItem} selectedValue={this.state.distance}
            onValueChange={(itemValue) => this.handleChange('distance', itemValue)}
            className="search-input"
          >
            <Picker.Item value="" enabled={false} label="Select distance..." />
            <Picker.Item value="10" label="10 miles" />
            <Picker.Item value="20" label="20 miles" />
            <Picker.Item value="30" label="30 miles" />
            <Picker.Item value="40" label="40 miles" />
            <Picker.Item value="50" label="50 miles" />
          </Picker>
          <TouchableHighlight
            style={button}
            onPress={() => this.handleSubmit(zipcode, distance)}
          >
            <Text style={buttonText}>Search</Text>
          </TouchableHighlight>
        </View>
        <Footer/>
      </View>
    )
  }
}

export const mapStateToProps = (state) => ({
  contacts: state.contacts
});

export const mapDispatchToProps = (dispatch) => ({
  setDetails: (details) => dispatch(setDetails(details))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);

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
    marginTop: 30,
    width: '100%',
    flex: 0.9
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
  }
});


