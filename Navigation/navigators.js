import {createDrawerNavigator,createTopTabNavigator, createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import React, { Component } from 'react'
import { DrawerActions } from 'react-navigation';
import Splash from '../Containers/Splash'
import HomeScreen from '../Containers/HomeScreen'
import Swipers from '../Containers/Swipers'
import MyOrders from '../Containers/MyOrders'
import Account from '../Containers/Account'
import Search from '../Containers/Search'
import Location from '../Containers/Location'
import Login from '../Containers/Login'
import Register from '../Containers/Register'
import ForgotPassword from '../Containers/ForgotPassword'
import ProductCategory from '../Containers/ProductCategory'
import ProductDetails from '../Containers/ProductDetails'
import ProductList from '../Containers/ProductList'
import EazybuySplash from '../Containers/EazybuySplash'
import Cart from '../Containers/Cart'
import Checkout from '../Containers/Checkout'
import PurchaseSuccess from '../Containers/PurchaseSuccess'
import Comparison from '../Containers/Comparison'
import ContactUs from '../Containers/ContactUs'
import DrawerScreen from '../Containers/DrawerScreen'
import NavigationBar from '../Components/NavigationBar'
import DefaultBar from '../Components/DefaultBar'

import {Image, View, Text, TouchableOpacity, Dimensions, TextInput} from 'react-native';
var {height, width} = Dimensions.get('window');


export const Tabs = createBottomTabNavigator({
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
  navigationOptions: ({ navigation }) => {
  const routeParams = navigation.state.params;

  return {
    tabBarLabel: 'Demo',
    // tabBarVisible: routeParams && routeParams.tabBarVisible,
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
  }
}



})





export const Stack = createStackNavigator({
  Tabs: {screen : Tabs},
  Splash: {screen: Splash,
    navigationOptions: {
      drawerLockMode: 'locked-closed'
    }
  },
  Swipers: {screen: Swipers},
  Location: {screen: Location},
  Login: {screen: Login},
  Register: {screen: Register},
  ForgotPassword: {screen: ForgotPassword},
  ProductCategory: {screen: ProductCategory},
  ProductList: {screen: ProductList},
  ProductDetails: {screen: ProductDetails},
  MyOrders: {screen: MyOrders,
    navigationOptions: ({ navigation }) => ({
      headerTitle:'ORDERS',
      headerStyle:{
        backgroundColor:'#39385a'
      },
        headerLeft: (
          <DefaultBar toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
            ),
    })
  },
  EazybuySplash: {screen: EazybuySplash},
  Cart: {screen: Cart},
  Checkout: {screen: Checkout},
  Account :{screen: Account,
    navigationOptions: ({ navigation }) => ({
      headerTitle:'ACCOUNT',
      headerStyle:{
        backgroundColor:'#39385a'
      },
        headerLeft: (
          <DefaultBar toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
            ),
    })
  },
  PurchaseSuccess :{screen: PurchaseSuccess},
  Comparison :{screen: Comparison},
  ContactUs :{screen: ContactUs,
    navigationOptions: ({ navigation }) => ({
      headerTitle:'CONTACT US',
      headerStyle:{
        backgroundColor:'#39385a'
      },
        headerLeft: (
          <DefaultBar toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
            ),
    })
  },

}
,{
    // headerMode: 'screen',
    initialRouteName: 'MyOrders',
    navigationOptions: ({ navigation }) => ({
    headerLeft: (
      <NavigationBar toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
        )
    })
})

export const Drawer = createDrawerNavigator({
  Stack: {screen : Stack},
  // TabsOrder: {screen : TabsOrder}
},
{
    drawerWidth: 300,
    contentComponent: DrawerScreen,
    // drawerType: 'slide'
});

export default Drawer;
