import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View,TextInput, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { DrawerActions } from 'react-navigation';
var {height, width} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation'


const WelcomeText = (props) => {

  return(
    <View style={{position:'absolute', zIndex:0, alignItems:'center',flexDirection:'column'}}>
      <View style={styles.partOne}/>

      <View style={styles.partTwo}/>


      <View style={styles.imageView}>
        <Image source={props.picture} style={styles.qualityImage}/>

        <TouchableOpacity style={styles.english} onPress={props.open}>
          <Text style={styles.englishText}>{props.text}</Text>

        </TouchableOpacity>

        <View style={styles.qualityText}>
          <Text style={styles.quality}>Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.
          </Text>
        </View>

      </View>

        <View style={{position:'absolute',bottom:10,
        left:0,backgroundColor:'red', width:100, alignItems:'center',}}>
          <Text>SKIP</Text>
        </View>

    </View>
  );
};
export default WelcomeText;

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
