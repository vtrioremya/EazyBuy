/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
var {height, width} = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import WelcomeText from '../Components/WelcomeText'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


export default class Swipers extends Component<Props> {

  static navigationOptions = {
    header: null
  }

  open(){
    this.props.navigation.navigate('HomeScreen');
  }

  home(){
    this.props.navigation.navigate('HomeScreen');
  }

  render() {
    return (
      <View style={styles.container}>

        <Swiper style={{width:width}}

                dot= {
                  <View style={{backgroundColor:'#9796a4', width: 8, height: 8,borderRadius: 4, marginLeft: 10, marginRight: 10, marginTop: 3, marginBottom: 3,}}  />
                }
                activeDot= {
                  <View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 10, marginRight: 10, marginTop: 3, marginBottom: 3,}} />
                }
                loop={false}>


            <WelcomeText
            bg={require('../Images/welcome-bg-1.jpg')}
            picture={require('../Images/welcome-1.jpg')}
            text='QUALITY ASSURED'
            buttonColor='#fbbc00'
            open={this.open.bind(this)}
            skip={this.home.bind(this)}/>



              <WelcomeText
              bg={require('../Images/welcome-bg-2.jpg')}
              picture={require('../Images/welcome-2.jpg')}
              text='CUSTOMER SATISFACTION'
              buttonColor='#2f2c49'
              open={this.open.bind(this)}
              skip={this.home.bind(this)}/>



            <WelcomeText
            bg={require('../Images/welcome-bg-1.jpg')}
            picture={require('../Images/welcome-3.jpg')}
            text='GREAT OFFERS'
            buttonColor='#fbbc00'
            open={this.open.bind(this)}
            skip={this.home.bind(this)}/>



        </Swiper>


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
    marginTop:20,
    backgroundColor: '#fbbc00',
    width: width/1.25,
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
  partOne: {
    backgroundColor:'#fff',
    width: width,
    height: height/2.5
  },
  partTwo: {
    backgroundColor:'#271f51',
    width: width,
    height: height/1.5
  },
  qualityImage: {
    width:width/1.5,
    height:height/3,
    borderRadius:width/1.5 /2,
    borderWidth:1,
    margin:5
  },
  imageView: {
    position:'absolute',
    zIndex:1,
    top:150,
    justifyContent:'center',
    alignItems:'center',
  },
  qualityText: {
    width: width/1.25,
    // justifyContent:'center',
    marginTop:20,
  },
  quality: {
    textAlign: 'justify',
    color:'#fff',
    fontSize:18
  }
});
