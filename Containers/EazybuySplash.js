/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


export default class EazybuySplash extends Component<Props> {

  constructor(props){
    super(props);
    this.splash=this.splash.bind(this);
    this.state = {

    };
  }

  static navigationOptions = {
    header: null
  }

  splash = () => {
    // Alert.alert("splash");
    this.props.navigation.navigate('Splash')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width:width, alignItems:'center'}}>
          <Image source={require('../Images/logo-splash.png')}
          style={{width: 150, height: 150}}/>
        </View>
        <TouchableOpacity style={styles.english} onPress={this.splash}>
          <Text style={styles.englishText}>EVERYDAY YOU GET OUR BEST</Text>
        </TouchableOpacity>

        <View>
          <Image source={require('../Images/catgry-img-1.jpg')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    height:40,
    marginTop: 40
  },
  englishText: {
    color: '#fff',
    fontSize: 15,
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