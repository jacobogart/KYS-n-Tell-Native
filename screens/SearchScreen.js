import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, Picker, TouchableHighlight, Image, StyleSheet } from 'react-native';
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
      error: false
    };
  }

  handleChange = (name, text) => {
    this.setState({ [name]: text });
  }

  handleSubmit = (zipcode, distance) => {
    this.setState({ isLoading: true, error: false });
    return fetchLatLong(zipcode)
      .then(location => {
        this.props.setUserLocation(location);
        return fetchLocations(location, distance);
      })
      .then(results => {
        this.setState({ isLoading: false })
        if (results.length) {
          this.props.setLocations(results);
          this.props.navigation.navigate("Results");
        } else {
          this.setState({ error: true })
        }
      })
  }

  render() {
    const { isLoading, error, zipcode, distance } = this.state;
    const { container, input, button, buttonText } = styles;
    const { heading, loader, loaderHolder } = localStyles;
    const form = (
      <View style={[container, localStyles.form]}>
        <Text style={heading}>Search for HIV/STD tesing centers near you</Text>
        <TextInput
          style={input}
          placeholder="Enter zipcode..."
          value={this.state.zipcode}
          onChangeText={(text) => this.handleChange('zipcode', text)}
        />
        {error && <Text>No locations found, please increase range</Text>}
        <Picker
          style={localStyles.picker} 
          itemStyle={localStyles.pickerItem}            selectedValue={this.state.distance}
          onValueChange={(itemValue) => this.handleChange('distance', itemValue)}
          className="search-input"
        >
          <Picker.Item value="" enabled={false} label="Select distance..."/>
          <Picker.Item value="10" label="10 miles"/>
          <Picker.Item value="20" label="20 miles"/>
          <Picker.Item value="30" label="30 miles"/>
          <Picker.Item value="40" label="40 miles"/>
          <Picker.Item value="50" label="50 miles"/>
        </Picker>
        <TouchableHighlight
          style={button}
          onPress={() => this.handleSubmit(zipcode, distance)}
        >
          <Text style={buttonText}>Search</Text>
        </TouchableHighlight>
      </View>
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
    marginTop: 30,
    width: '100%',
    flex: 1.2
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


