import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, Picker, TouchableHighlight, Image, StyleSheet } from 'react-native';
import { styles } from '../styles/mainStyles';
import { NavButton } from '../components/NavButton';
import { setLocations, setUserLocation, setDetails } from '../actions/index';
import { fetchLatLong } from '../api/fetchLatLong';
import { fetchLocations } from '../api/fetchLocations';
import { Footer } from '../components/Footer';
import { HeaderTitle } from '../components/HeaderTitle';

class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle navigation={navigation} title='TELL' />
  });

  constructor(props) {
    super(props);
    this.state = {
      diagnosis: '',
      timeFrame: '',
      additionalNotes: ''
    };
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  generateOptions = (options) => {
    return options.map(item => <Picker.Item key={item} value={item} label={item} />)
  }

  handleSubmit = () => {
    const details = { ...this.state }
    this.props.setDetails(details);
    this.props.navigation.navigate("Preview")
  }
  

  render() {
    const { isLoading, error, zipcode, distance } = this.state;
    const { container, input, button, buttonText } = styles;
    const { heading, pickerHolder, label } = localStyles;
    const stds = ['HIV/AIDS', 'HPV(Human Papillomavirus)', 'Chlamydia', 'Gonorrhea', 'Syphilis', 'Herpes', 'Trichomoniasis'];
    const timeFrames = ["month", "two months", "three months", "six months", "year"]

    return (
      <View style={container}>
        <View style={pickerHolder}>
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
          onPress={this.handleSubmit}
        >
          <Text style={buttonText}>Preview</Text>
        </TouchableHighlight>
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


