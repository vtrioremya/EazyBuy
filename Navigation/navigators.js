import {DrawerNavigator, StackNavigator, TabNavigator, createBottomTabNavigator} from 'react-navigation'
import React, { Component } from 'react'
import Splash from '../Containers/Splash'
import HomeScreen from '../Containers/HomeScreen'
import Swiper from '../Containers/Swiper'
import MyOrders from '../Containers/MyOrders'
import Account from '../Containers/Account'
import Search from '../Containers/Search'

import {Image, View, Text, TouchableOpacity, Dimensions, TextInput} from 'react-native';
var {height, width} = Dimensions.get('window');

export const Stack = StackNavigator({
  Splash : {screen: Splash},
  HomeScreen : {screen: HomeScreen},
  Swiper :{screen: Swiper},
  MyOrders :{screen: MyOrders},
  Account :{screen: Account},
  Search :{screen: Search},

},{
  initialRouteName: 'HomeScreen',
  headerMode: 'screen'
})

export const Tabs =createBottomTabNavigator({
  HomeScreen : {screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: (
            <Image style={{ width: 25, height: 25 }} source={require('../Images/footer-icon-1.png')}/>
      )
    }
  },
  MyOrders :{screen: MyOrders,
    navigationOptions: {
      tabBarLabel: 'My Orders',
      tabBarIcon: (
            <Image style={{ width: 25, height: 25 }} source={require('../Images/footer-icon-2.png')}/>
      )
    }
  },Search :{screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: (
            <Image style={{ width: 25, height: 25 }} source={require('../Images/footer-icon-3.png')}/>
      )
    }
  },Account :{screen: Account,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarIcon: (
            <Image style={{ width: 25, height: 25 }} source={require('../Images/footer-icon-4.png')}/>
      )
    }
  },
},{
  tabBarOptions: {
  activeTintColor: '#e91e63',
  inactiveTintColor:'#fff',
  labelStyle: {
    fontSize: 18,
  },
  style: {
    height:75,
    backgroundColor: '#2f2c49',
  },
}

})
