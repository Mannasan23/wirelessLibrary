import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SearchScreen from './screens/searchScreen';
import BookTransaction from './screens/bookTransaction';
import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component {
  render(){
    return(
      <AppContainer></AppContainer>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Transaction: {screen: BookTransaction}, Search: {screen: SearchScreen}
}, 
{defaultNavigationOptions: ({navigation})=>({
  tabBarIcon: ()=> {
    const routeName = navigation.state.routeName;
    console.log(routeName);
    if(routeName == "Transaction") {
      return(
        <Image source= {require("./assets/book.png")} style= {{width: 40, height: 40}}></Image>
      )
    }
    else if(routeName == "Search") {
      return(
        <Image source= {require("./assets/searchingbook.png")} style= {{width: 40, height: 40}}></Image>
      )
    }  
  }
})  
})

const SwitchNavigator = createSwitchNavigator({
  LoginScreen: {screen: LoginScreen}, TabNavigator: {screen: TabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
