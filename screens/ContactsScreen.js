import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { styles } from '../styles/mainStyles';
import { NavButton } from '../components/NavButton';
import { fetchContacts } from '../api/fetchContacts';
import { Footer } from '../components/Footer';
import { setContacts } from '../actions';
import { HeaderTitle } from '../components/HeaderTitle';

class ContactsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle navigation={navigation} title='TELL' />
  });

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: [],
      contacts: [],
      error: ''  
    }
  }

  handleChange = (text) => {
    this.setState({ input: text })
    fetchContacts(text)
      .then(results => this.setState({ results }))
  }

  handleSelect = (contact) => {
    this.setState({ 
      contacts: [...this.state.contacts, contact],
      input: '',
      results: []
    })
  }

  storeContacts = () => {
    this.props.setContacts(this.state.contacts)
    this.props.navigation.navigate("Details")
  }

  render() {
    const { container, input, button, buttonText } = styles;
    const { heading, pleaseText, contactResult, searchHolder, resultText, contactsHolder, contactText, resultsHolder } = localStyles;
    const results = this.state.results.slice(0, 4).map(result => 
      <TouchableHighlight
        key={result.id}
        style={contactResult} 
        onPress={() => this.handleSelect(result)}
      >
        <Text style={resultText}>
          {result.name}
        </Text>
      </TouchableHighlight>);

    const contactList = this.state.contacts.map(contact => 
      <Text 
        key={contact.id}
        style={contactText}
      >
        {contact.name}
      </Text>
    );

    return (
      <View style={container}>
        <Text style={heading}>Add recent sexual partners to your contact list</Text>
        <View style={searchHolder}>
          <TextInput
            style={input}
            placeholder="Search contacts..."
            value={this.state.input}
            onChangeText={(text) => this.handleChange(text)}
          />
          <View style={resultsHolder}>
            {results}
          </View>
        </View>
        <View style={contactsHolder}>
          <ScrollView>
            {contactList.length ? contactList
              : <Text style={pleaseText}>Please add a contact</Text>}
          </ScrollView>
        </View>
        <TouchableHighlight
          style={button}
          onPress={this.storeContacts}
        >
          <Text style={buttonText}>Next Page</Text>
        </TouchableHighlight>
        <Footer/>
      </View>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setContacts: (contacts) => dispatch(setContacts(contacts))
});

export default connect(null, mapDispatchToProps)(ContactsScreen);

const localStyles = StyleSheet.create({
  contactResult: {
    width: '90%',
    backgroundColor: '#db938f',
    padding: 15,
    borderColor: "white"
  },
  searchHolder: {
    width: '100%',
    alignItems: 'center',
    zIndex: 10
  },
  resultText: {
    fontSize: 20,
    color: 'white'
  },
  contactsHolder: {
    backgroundColor: 'grey',
    width: '90%',
    height: 250,
    overflow: 'scroll',
    paddingHorizontal: 15
  },
  contactText: {
    margin: 10,
    fontSize: 25,
    color: 'white'
  },
  pleaseText: {
    textAlign: 'center',
    fontSize: 30,
    margin: 20,
    color: 'white'
  }, 
  resultsHolder: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 59
  },
  heading: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: '600'
  }
});
