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
export default class Register extends Component<Props> {

  static navigationOptions = {
    headerTitle: 'REGISTER',
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
        <View>
          <Text style={styles.textStyle}>Login with your Social Account?</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>

          <View style={{width:width/4,marginTop:30, marginBottom:30,alignItems:'center'}}>
            <Image source={require('../Images/facebook.png')} style={{width:60, height:60}}/>
          </View>

          <View style={{width:width/4, marginTop:30, marginBottom:30, alignItems:'center'}}>
            <Image source={require('../Images/google-plus.png')} style={{width:60, height:60}}/>
          </View>
        </View>

        <View>
          <Text style={styles.textStyle}>OR</Text>
        </View>

        <View style={{margin:20}}>
        <View style={{flexDirection:'row'}}>
          <TextInput
            placeholder = 'First Name'
            placeholderTextColor = '#ababab'
            style={styles.textInputStyle2}
            underlineColorAndroid= '#cccccc'
          />

          <TextInput
            placeholder = 'Last Name'
            placeholderTextColor = '#ababab'
            style={styles.textInputStyle2}
            underlineColorAndroid= '#cccccc'
          />

        </View>

        <TextInput
        placeholder = 'Enter Email'
        placeholderTextColor = '#ababab'
        style={styles.textInputStyle}
        underlineColorAndroid= '#cccccc'
        />

        <TextInput
        placeholder = 'Password'
        placeholderTextColor = '#ababab'
        style={styles.textInputStyle}
        underlineColorAndroid= '#cccccc'
        />

        <View style={{flexDirection:'row'}}>
          <TextInput
            placeholder = 'Select'
            placeholderTextColor = '#ababab'
            style={styles.textInputStyle3}
            underlineColorAndroid= '#cccccc'
          />

          <TextInput
            placeholder = 'Enter Mobile Number'
            placeholderTextColor = '#ababab'
            style={styles.textInputStyle4}
            underlineColorAndroid= '#cccccc'
          />

          </View>

        </View>

        <View>
          <TouchableOpacity style={styles.loginButton} onPress={this.login.bind(this)}>
            <Text style={styles.login}>LOGIN</Text>
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
    width:width/1.19,
    fontSize:20,
    margin:10
  },
  textInputStyle2 : {
    width:width/2.5,
    fontSize:20,
    margin:10
  },
  textInputStyle3 : {
    width:width/3.5,
    fontSize:20,
    margin:10
  },
  textInputStyle4 : {
    width:width/2,
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
