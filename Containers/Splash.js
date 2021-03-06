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


export default class Splash extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  static navigationOptions = {
    header: null
  }

  english () {

    this.props.navigation.navigate('Swipers',{lang: 1})
  }

  arabic  ()  {

    this.props.navigation.navigate('Swipers',{lang: 2})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width:width, alignItems:'center'}}>
          <Image source={require('../Images/logo-splash.png')} style={{width: 150, height: 150}}/>
        </View>
        <TouchableOpacity style={styles.english} onPress={this.english.bind(this)}>
          <Text style={styles.englishText}>ENGLISH</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.arabic} onPress={this.arabic.bind(this)}>
          <Text style={styles.arabicText}>ARABIC</Text>
        </TouchableOpacity>
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
    height:60,
    marginTop: 40
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
