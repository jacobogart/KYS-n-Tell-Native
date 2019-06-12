import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { fetchDistance } from '../api/fetchDistance';

export class ResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: ''
    };
  }

  componentDidMount() {
    const { user, point } = this.props

    fetchDistance(user.location, point)
      .then(distance => this.setState({ distance }))
  }


  render() {
    const { id, title, address } = this.props;
    const { card, innerCard, distance, headingText, distanceText, cardText, textArea } = localStyles; 

    return (
      <TouchableHighlight 
        style={card} 
        onPress={() => this.props.navigate('Location', { id } )}
      >
        <View style={innerCard}>
          <View style={textArea}>
            <Text style={headingText}>{title}</Text>
            <Text style={cardText}>{address.split(';')[0]} {"\n"}{address.split(';')[1]}</Text>
          </View>
          <View style={distance}>
            <Text style={distanceText}>{this.state.distance}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const localStyles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'white',
    margin: 3,
    flex: 1
  },
  innerCard: {
    flexDirection: 'row',
    flex: 1,
  },
  textArea: {
    margin: 20,
    width: '70%'
  },
  distance: {
    padding: 15,
    backgroundColor: '#db938f',
    height: '100%',
    width: '20%',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0
  },
  headingText: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '600'
  },
  cardText: {
    fontSize: 18,
  },
  distanceText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  }
});
