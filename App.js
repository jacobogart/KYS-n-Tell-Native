import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import { ContactsScreen } from './screens/ContactsScreen';
import { rootReducer } from './reducers';
import ResultsScreen from './screens/ResultsScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen, 
    Search: SearchScreen,
    Contacts: ContactsScreen,
    Results: ResultsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

const store = createStore(rootReducer)
export default class App extends Component {
  render() {
    return ( 
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
