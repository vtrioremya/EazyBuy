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
import CounterApp from '../Containers/CounterApp'
import Offers from '../Containers/Offers'
import SuggestProduct from '../Containers/SuggestProduct'
import RNGooglePlaces from 'react-native-google-places';
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
      // fontSize: 18,
    },
    style: {
      // height:75,
      backgroundColor: '#2f2c49',
    },
  }
  }
}
})
export const HomeStack= createStackNavigator({


  Home:{screen:HomeScreen,navigationOptions:{header:null}

  },


})


export const Stack = createStackNavigator({
  Home: {screen:HomeStack,
    navigationOptions: ({ navigation }) => ({
      headerTile: 'dfhj',
    headerLeft: (
      <NavigationBar
        googlePlaces={() => {
          RNGooglePlaces.openPlacePickerModal()
          .then((place) => {
              console.log(place);
              // place represents user's selection from the
              // suggestions and it is a simplified Google Place object.
          })
          .catch(error => console.log(error.message));  // error is a Javascript Error object
        }}
       toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
        )
    })
  },
  Tabs: {screen : Tabs},
  Splash: {screen: Splash,
    navigationOptions: {
      drawerLockMode: 'locked-closed'
    }
  },
  Swipers: {screen: Swipers},
  CounterApp: {screen: CounterApp},
  Location: {screen: Location},
  Login: {screen: Login},
  Register: {screen: Register},
  ForgotPassword: {screen: ForgotPassword},
  ProductCategory: {screen: ProductCategory,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#39385a',
      },
      headerLeft: (
        <View style={{flex:1,flexDirection: 'row'}}>

          <View style={{width: 50, height: 50, justifyContent:'center'}}>
            <TouchableOpacity onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
              <Image source={require('../Images/hamp.png')}
              style={{marginLeft:10,width:25,height:25}}/>
            </TouchableOpacity>
          </View>

          <View style={{width: width/1.2, height: 50, flexDirection:'row'}}>

            <View style={{width: 21, height: 50,alignItems:'center',justifyContent:'center'}}>
              <Image source={require('../Images/map-1.png')} style={{width:21,height:30}}/>
            </View>

            <View style={{width: width/2, height: 50, flexDirection:'row'}} >
              <TextInput placeholder='Sample Address, Address Feild 1, Feild 2'
              placeholderTextColor= '#fff'
              style={{width:width/1.5, fontSize:12, color:'#fff'}}/>
              <TouchableOpacity style={{width:20, height:50, justifyContent:'center', alignItems:'center'}}>
                <Image source={require('../Images/drop-down-arrow.png')} style={{width:12, height:12}}/>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      ),
      headerRight: (
        <View style={{marginRight:5}}>
        <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
          <Image source={require('../Images/cart.png')} style={{width:30, height:30}} />
        </TouchableOpacity>
        </View>
      )

    })
  },
  ProductList: {screen: ProductList},
  ProductDetails: {screen: ProductDetails},
  MyOrders: {screen: MyOrders,
    navigationOptions: ({ navigation }) => ({
      headerTitle:'My Orders',
      headerStyle:{
        backgroundColor:'#39385a'
      },
      headerTintColor: '#fff',
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
      headerTitle:'Account',
      headerStyle:{
        backgroundColor:'#39385a'
      },
      headerTintColor: '#fff',
        headerLeft: (
          <DefaultBar toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
            ),
    })
  },
  PurchaseSuccess :{screen: PurchaseSuccess},
  Comparison :{screen: Comparison},
  Offers :{screen: Offers,
    navigationOptions: ({ navigation }) => ({
      headerTitle:'Offers',
      headerTintColor: '#fff',
      headerStyle:{
        backgroundColor:'#39385a'
      },
        headerLeft: (
          <DefaultBar toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
            ),
    })},
  SuggestProduct :{screen: SuggestProduct,
    navigationOptions: ({ navigation }) => ({
      headerTitle:'Suggest A Product',
      headerTintColor: '#fff',
      headerStyle:{
        backgroundColor:'#39385a'
      },
        headerLeft: (
          <DefaultBar toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
            ),
    })},
  ContactUs :{screen: ContactUs,
    navigationOptions: ({ navigation }) => ({
      headerTitle:'Contact Us',
      headerTintColor: '#fff',
      headerStyle:{
        backgroundColor:'#39385a',
      },
        headerLeft: (
          <DefaultBar toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
            ),
    })
  },

}
,{
    // headerMode: 'screen',
    initialRouteName: 'EazybuySplash',
    headerMode: 'screen',
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
