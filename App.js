import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import BookTransaction from './screens/BookTransaction.js';
import Search from './screens/Search.js';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  BookTransaction: {
    screen: BookTransaction, 
    navigationOptions: {
      tabBarIcon: () => (<Image style = {styles.image} source = {require('./assets/book.png')} />)}},
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarIcon: () => (<Image style = {styles.image} source = {require('./assets/searchingbook.png')} />)
    }
  }
})

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  image:{
    width: 40,
    height: 40
  }
})