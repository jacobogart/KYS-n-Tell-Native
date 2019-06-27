import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { fetchDistance } from '../api/fetchDistance';

export class ResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      height: 150.3
    };
  }

  componentDidMount() {
    const { user, point } = this.props
    fetchDistance(user.location, point)
      .then(distance => this.setState({ distance }))
  }

  handleTitle = (e) => {
    const { height } = e.nativeEvent.layout;
    if (height < 30) {
      this.setState({ height: 121.7 });
    } else if (height > 80) {
      this.setState({ height: 175 });
    }
  }


  render() {
    const { id, title, address } = this.props;
    const { card, innerCard, distance, headingText, distanceText, cardText, textArea } = localStyles; 
    return (
      <TouchableHighlight 
        style={[card, { height: this.state.height}]} 
        onPress={() => this.props.navigate('Location', { id } )}
      >
        <View style={innerCard}>
          <View style={textArea}>
            <Text 
              style={headingText}
              onLayout={(e) => this.handleTitle(e)}
            >{title}</Text>
            <Text style={cardText}>{address.split(';')[0]} {"\n"}{address.split(';')[1]}</Text>
          </View>
          <View style={[distance, { height: this.state.height}]}>
            <Text style={distanceText}>{this.state.distance}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const localStyles = StyleSheet.create({
  card: {
    width: '116%',
    backgroundColor: 'white',
    margin: 3
  },
  innerCard: {
    flexDirection: 'row',
  },
  textArea: {
    margin: 20,
    width: '70%',
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
