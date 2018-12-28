/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import {Platform, StyleSheet, Text, View, Alert, Image, Dimensions, TextInput, TouchableOpacity} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions, createStackNavigator } from 'react-navigation'

type Props = {};
export default class ProductCategory extends Component<Props> {

  static navigationOptions = {
    headerTitle:'kakak',
    headerStyle: {
      backgroundColor: '#39385a',
    },
    headerLeft: (
      <View style={{marginLeft:10}}>
        <TouchableOpacity >
          <Image source={require('../Images/back.png')} style={{width:30,height:30}}/>
        </TouchableOpacity>
      </View>
    ),
    headerRight: (<View />)
  }

  login(){
    this.props.navigation.navigate('HomeScreen');
  }



  render() {
    return (
      <View style={styles.container}>

      <View style={styles.searchView}>

        <View style={{width:'15%', alignItems:'center', }}>
          <Image source={require('../Images/footer-icon-3.png')} style={{width:20, height:20, justifyContent:'flex-start'}}/>
        </View>

        <View style={{width:'70%', alignItems:'center' }}>
          <TextInput
            placeholder='Search for Products'
            placeholderTextColor='#ababab'
            style={styles.textStyle}
          />
        </View>

      </View>

      <Swiper style={{width:width,height:200}}
              dotColor='#cfc8c1'
              activeDotColor='#ffb013'>
        <View>
          <Image  source={require('../Images/banner.jpg')} style={{width:width,height:150}}/>
        </View>
        <View>
          <Image  source={require('../Images/banner.jpg')} style={{width:width,height:150}}/>
        </View>
        <View>
          <Image  source={require('../Images/banner.jpg')} style={{width:width,height:200}}/>
        </View>
        <View>
          <Image  source={require('../Images/banner.jpg')} style={{width:width,height:200}}/>
        </View>
        <View>
          <Image  source={require('../Images/banner.jpg')} style={{width:width,height:200}}/>
        </View>
        <View>
          <Image  source={require('../Images/banner.jpg')} style={{width:width,height:200}}/>
        </View>
      </Swiper>






      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    color:'#ababab',
    fontSize:18
  },
  textInputStyle : {
    width:width -100,
    fontSize:20,
    margin:10
  },
  searchView: {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:5,
    marginRight:5,
    backgroundColor:'rgba(253,253,253,0.8)',
    width:width,
    height:60
  },
});
