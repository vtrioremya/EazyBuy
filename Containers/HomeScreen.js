/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert, TextInput} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


export default class HomeScreen extends Component<Props> {

  constructor(props){
    super(props);
    this.splash=this.splash.bind(this);
    this.state = {

    };
  }

  static navigationOptions = ({ navigation }) => {
    return {

      headerLeft: (
        <View style={{width:width/7,backgroundColor:'red'}}>
          <Image source={require('../Images/ham.png')} style={{marginLeft:10,width:30,height:30}}/>
        </View>
      ),
      headerRight: (
        <View style={{width:width/1.15,backgroundColor:'blue',marginLeft:5}}>
          <TextInput placeholder='Search' style={{marginRight:10,width:width/1.15, borderColor:'gray', borderWidth: 1}}/>
        </View>
      )

    }
  }

  splash = () => {
    Alert.alert("splash");
    this.props.navigation.navigate('Swiper')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  english: {
    backgroundColor: '#fbbc00',
    width: width/1.5,
    justifyContent:'center',
    borderRadius:30,
    borderWidth:1,
    borderColor:'transparent',
    height:60
  },
  englishText: {
    color: '#fff',
    fontSize: 20,
    textAlign:'center',
    alignItems:'center'
  },
  arabic: {
    backgroundColor: '#271f51',
    width: width/1.5,
    justifyContent:'center',
    borderRadius:30,
    borderWidth:1,
    borderColor:'transparent',
    height:60,
    marginTop:10
  },
  arabicText: {
    color: '#fff',
    fontSize: 20,
    textAlign:'center',
    alignItems:'center'
  }
});
