/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, Dimensions, TextInput, TouchableOpacity} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions, createStackNavigator } from 'react-navigation'

type Props = {};
export default class ForgotPassword extends Component<Props> {

  static navigationOptions = {
    headerTitle: 'FORGOT PASSWORD',
    headerStyle: {
      backgroundColor: '#39385a'
    },
    headerTitleStyle: {
      textAlign: 'center',alignSelf:'center'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200',
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

        <View style={{alignItems:'center', width:width/1.2,justifyContent:'center', marginTop:40}}>
          <View style={{marginTop:20}}>
            <Image source={require('../Images/warning.png')} style={{width:70, height:70}} />
          </View>

          <View style={{margin:20}}>
            <Text style={{fontSize:20, lineHeight: 40,color:'#000', textAlign:'center'}}>Enter your email address here to receive further instructions.</Text>
          </View>
        </View>

        <View style={{marginTop:30}}>
          <TextInput
            placeholder = 'Enter Email'
            placeholderTextColor = '#ababab'
            style={styles.textInputStyle}
            underlineColorAndroid= '#cccccc'
          />

        </View>

        <View style={{marginTop:30}}>
          <TouchableOpacity style={styles.loginButton} onPress={this.login.bind(this)}>
            <Text style={styles.login}>SEND</Text>
          </TouchableOpacity>
        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    color:'#000',
    fontSize:22
  },
  textInputStyle : {
    width:width -100,
    fontSize:20,
    margin:10
  },
  loginButton : {
    marginTop:30,
    width: width/1.8,
    height:60,
    backgroundColor: '#262050',
    borderColor:'transparent',
    borderRadius: width/1.8 /2,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  login : {
    color:'#fff',
    fontSize: 18,
  },
  forgotPassword: {
    color:'#aeaeae',
    fontSize:20
  },
  forgotView: {
    marginTop:20
  },
  account: {
    color:'#000',
    fontSize:22
  },
  accountView :{
    marginTop:30
  }
});
