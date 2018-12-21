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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


export default class Swiper extends Component<Props> {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>


        <View style={{position:'absolute', zIndex:0}}>
          <View style={styles.partOne}>
            <Text>hai</Text>
          </View>

          <View style={styles.partTwo}>

            <Text>jhdhs</Text>

          </View>
        </View>

        <View style={styles.imageView}>
          <Image source={require('../Images/banner-1.jpg')} style={styles.qualityImage}/>

          <TouchableOpacity style={styles.english}>
            <Text style={styles.englishText}>QUALITY ASSURED</Text>

          </TouchableOpacity>

          <View style={styles.qualityText}>
            <Text style={styles.quality}>Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
            </Text>
          </View>

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
    justifyContent:'center',
    marginTop:20,
  },
  quality: {
    textAlign: 'justify',
    color:'#fff',
    fontSize:18
  }
});