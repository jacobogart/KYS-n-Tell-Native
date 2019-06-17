import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, Picker, TouchableHighlight, Image, StyleSheet } from 'react-native';
import { styles } from '../styles/mainStyles';
import { NavButton } from '../components/NavButton';
import { setLocations, setUserLocation, setDetails } from '../actions/index';
import { fetchLatLong } from '../api/fetchLatLong';
import { fetchLocations } from '../api/fetchLocations';
import { Footer } from '../components/Footer';

class PreviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagnosis: '',
      timeFrame: '',
      additionalNotes: ''
    };
  }

  render() {
    console.log(this.props);
    const { isLoading, error, zipcode, distance } = this.state;
    const { container, input, button, buttonText } = styles;
    const { heading, pickerHolder, label } = localStyles;
    const stds = ['HIV/AIDS', 'HPV(Human Papillomavirus)', 'Chlamydia', 'Gonorrhea', 'Syphilis', 'Herpes', 'Trichomoniasis'];
    const timeFrames = ["month", "two months", "three months", "six months", "year"]

    return (
      <View style={container}>
        <Text>PREVIEW</Text>
        {/* <View style={pickerHolder}>
          <Text style={label}>Diagnosis</Text>
          <Picker
            style={localStyles.picker}
            itemStyle={localStyles.pickerItem} selectedValue={this.state.diagnosis}
            onValueChange={(itemValue) => this.handleChange('diagnosis', itemValue)}
          >
            <Picker.Item value="" enabled={false} label="Select diagnosis..." />
            {this.generateOptions(stds)}
          </Picker>

        </View>
        <View style={pickerHolder}>
          <Text style={label}>Time since last test</Text>
          <Picker
            style={localStyles.picker}
            itemStyle={localStyles.pickerItem} selectedValue={this.state.timeFrame}
            onValueChange={(itemValue) => this.handleChange('timeFrame', itemValue)}
          >
            <Picker.Item value="" enabled={false} label="Select time frame..." />
            {this.generateOptions(timeFrames)}
          </Picker>
        </View>
        <TextInput
          style={input}
          placeholder="Additional notes..."
          value={this.state.additionalNotes}
          onChangeText={(text) => this.handleChange('additionalNotes', text)}
        />
        <TouchableHighlight
          style={button}
          onPress={() => this.handleSubmit(zipcode, distance)}
        >
          <Text style={buttonText}>Search</Text>
        </TouchableHighlight> */}
        <Footer />
      </View>
    )
  }
}

export const mapStateToProps = (state) => ({
  contacts: state.contacts,
  details: state.details
});

export const mapDispatchToProps = (dispatch) => ({
  setContacts: (contacts) => dispatch(setContacts(contacts))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewScreen);

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
  },
  heading: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: '600'
  },
  pickerHolder: {
    width: '100%',
    alignItems: 'center'
  },
  label: {
    color: 'white',
    fontSize: 24,
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 20
  }
});


