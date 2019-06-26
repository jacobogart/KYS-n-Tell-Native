import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../styles/mainStyles';
import { Footer } from '../components/Footer';
import { fetchSendMessage } from '../api/fetchSendMessage';
import { HeaderTitle } from '../components/HeaderTitle';

class PreviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle navigation={navigation} title='TELL' />
  });

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      active: 'Message'
    };
  }

  componentDidMount() {
    this.setMessage();
  }

  setMessage = () => {
    const { diagnosis, timeFrame, additionalNotes } = this.props.details;
    let message = `Hello, we have been informed by an anonymous sexual partner that you may have been exposed to ${diagnosis} in the last ${timeFrame}. While this is no cause for alarm, we do recommend getting tested at your earliest convenience. To find a testing center near you, please visit kysntell.com, or contact your preferred healthcare provider.`
    if (additionalNotes) { message = message.concat(' ', `Additional notes from partner: ${additionalNotes}`) }
    this.setState({ message });
  }

  toggleView = (active) => {
    this.setState({ active })
  }

  handleSend = () => {
    return fetchSendMessage(this.props.contacts, this.state.message)
      .then(res => {
        if (res.every(res => res.ok)) {
          this.props.navigation.navigate("Success")
        } else {
          this.handleError(res);
        }
      })
      .catch(error => this.handleError())
  }

  handleError = (res) => {
    if (res) {
      const failedContacts = res.filter(res => !res.ok).map(res => res.contact);
      this.props.setContacts(failedContacts);
    }
    this.props.navigation.navigate("Error")
  }

  render() {
    const { activeButton, contactText, activeText, buttonHolder, previewContainer, toggleButton, messageHolder, messageText } = localStyles;
    const { container, button, buttonText } = styles;
    const { message, active } = this.state;
    let messageButton = active === 'Message'
      ? activeButton
      : null;
    let contactsButton = active === 'Contacts'
      ? activeButton
      : null;
    let messageBtnText = active === 'Message'
      ? activeText
      : null;
    let contactsText = active === 'Contacts'
      ? activeText
      : null;
    const contactList = this.props.contacts.map(contact =>
      <Text
        key={contact.id}
        style={contactText}
      >
        {contact.name}
      </Text>)

    return (
      <View style={container}>
        <View style={previewContainer}>
          <View style={buttonHolder}>
            <TouchableHighlight
              style={[button, toggleButton, messageButton]}
              onPress={() => this.toggleView('Message')}
            >
              <Text style={[buttonText, messageBtnText]}>Message</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[button, toggleButton, contactsButton]}
              onPress={() => this.toggleView('Contacts')}
            >
              <Text style={[buttonText, contactsText]}>Contacts</Text>
            </TouchableHighlight>
          </View>
          <View style={messageHolder}>
            <ScrollView>
              {active === 'Message' && 
              <Text style={messageText}>
                {message}
              </Text>}
              {active === 'Contacts' &&
                <View>
                  {contactList}
                </View>
              }
            </ScrollView>
          </View>
        </View>
        <TouchableHighlight
          style={button}
          onPress={this.handleSend}
        >
          <Text style={buttonText}>Send Message</Text>
        </TouchableHighlight>
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
  activeButton: {
    backgroundColor: 'white',
  },
  activeText: {
    color: 'black'
  },
  contactText: {
    margin: 10,
    fontSize: 25
  },
  buttonHolder: {
    flexDirection: 'row'
  },
  previewContainer: {
    width: '90%'
  }, 
  toggleButton: {
    width: '50%',
    borderRadius: 0
  },
  messageHolder: {
    backgroundColor: 'grey',
    padding: 10,
    height: 300
  }, 
  messageText: {
    fontSize: 20,
    color: 'white'
  }
});


