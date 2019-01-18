/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, TextInput, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation'

type Props = {};

export default class ContactUs extends Component<Props> {

  constructor(props){
    super(props);
    this.splash=this.splash.bind(this);
    this.state = {

    };
  }

  static navigationOptions = {

    headerStyle: {
      backgroundColor: '#39385a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200',
    },
    headerLeft: (
      <View style={{marginLeft:10}}>
        <TouchableOpacity >
          <Image source={require('../Images/hamp.png')} style={{width:30,height:30}}/>
        </TouchableOpacity>
      </View>
    ),
  }

  splash = () => {
    // Alert.alert("splash");
    this.props.navigation.navigate('Swipers')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width:width, alignItems:'center'}}>
          <Image source={require('../Images/logo-splash.png')} style={{width: 100, height: 100}}/>
        </View>
        <View style={{alignItems:'center'}}>
          <TextInput multiline={true} placeholder='Write your Feedback..'
                     style={styles.feedback}
                     numberOfLines = {20}/>
        </View>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity style={styles.send}>
            <Text style={styles.sendText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  send: {
    backgroundColor: '#271f51',
    justifyContent:'center',
    padding:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'transparent',
    width:width/2
  },
  sendText: {
    color: '#fff',
    fontSize: 20,
    textAlign:'center',
  },
  feedback: {
    borderWidth:1,
    borderRadius:10,
    borderColor:'transparent',
    // justifyContent:'center',
    backgroundColor:'#d8d8d8',
    width:width/1.2,
    textAlignVertical: "top"
  }
});
