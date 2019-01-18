/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Text, View, TextInput, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
var {height, width} = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = {};

export default class Account extends Component<Props> {

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


  render() {
    return (
      <KeyboardAwareScrollView>
      <View style={styles.container}>

        <View style={styles.proImage}>

          <View style={styles.textStyle}>
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <Text style={styles.text}>Your Name</Text>
              <TouchableOpacity style={styles.editButton} >
                <Image style={{width:30, height:30}}
                source={require('../Images/edit.png')}/>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{fontSize:18, color:'#6c6c6c'}}> Your Email</Text>
            </View>

            <View>
              <Text style={{fontSize:18, color:'#6c6c6c'}}>Your Mobile Number </Text>
            </View>

          </View>


          <View style={styles.Image}>
            <Image source={require('../Images/blank_profile_pic.png')}
              style={{width:150,height:150,borderColor:'#ffb013',borderWidth:1,borderRadius:80}}/>

          </View>

        </View>

        <View style={styles.delivery} >


          <View >
            <TouchableOpacity style={{alignItems:'center'}}>
              <View style={styles.deliveryAdd}>
                <Image source={require('../Images/delv-adres-icon-1.png')}
                style={{width:50, height:50}}/>
              </View>
              <Text style={styles.settingsText}>Delivery </Text>
              <Text style={styles.settingsText}> Address</Text>
            </TouchableOpacity>
          </View>


          <View >
            <TouchableOpacity style={{alignItems:'center'}}>
              <View style={styles.paymentIcon}>
                <Image source={require('../Images/payment-icon-2.png')}
                style={{width:50, height:50}}/>
              </View>
              <Text style={styles.settingsText}>Payment </Text>
              <Text style={styles.settingsText}> Option</Text>
            </TouchableOpacity>
          </View>

          <View >
            <TouchableOpacity style={{alignItems:'center'}}>
              <View style={styles.settings}>
                <Image source={require('../Images/settings-icon-3.png')}
                style={{width:50, height:50}}/>
              </View>
              <Text style={styles.settingsText}>Settings </Text>
              <Text style={styles.settingsText}> </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.addressTextArea}>

          <View style={styles.line1}>
            <TextInput placeholder='Delivery Address Line 1'
                       placeholderTextColor='#818181'
                       style={styles.lineText}/>
          </View>

          <View style={styles.line1}>
            <TextInput placeholder='Delivery Address Line 2'
                       placeholderTextColor='#818181'
                       style={styles.lineText}/>
          </View>

          <View style={styles.line1}>
            <TextInput placeholder='Delivery Address Line 3'
                       placeholderTextColor='#818181'
                       style={styles.lineText}/>
          </View>

          <View style={styles.postLine}>
            <TextInput placeholder='Post Code'
                       placeholderTextColor='#818181'
                       style={styles.lineText}/>
          </View>

        </View>

      </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  proImage:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    // backgroundColor:'red',
    margin:20
  },
  menuItem:{
    padding: 10,
    flexDirection:'row'
  },
  textStyle: {
    // marginTop:10,
    flexDirection:'column',
     justifyContent:'space-around'
  },
  text :{
    fontSize:23,
    color:'#000'
  },
  Image: {
    width: width/2.5
  },
  editButton: {
    width:40,
    alignItems:'center',
    // backgroundColor:'black'
  },
  textSize: {
    fontSize:19,
    marginLeft:10,
    color:'#000'
  },
  delivery: {
    marginTop:30,
    paddingBottom:50,
    flexDirection:'row',
    width:width,
    justifyContent:'space-around',
    alignItems:'center',
  },
  settings :{
    backgroundColor:'#b3b3b3',
    borderColor:'transparent',
    borderWidth:1,
    borderRadius: 50,
    padding:18
  },
  deliveryAdd: {
    backgroundColor:'#262050',borderColor:'transparent',
    borderWidth:1,
    borderRadius: 50,
    padding:18
  },
  paymentIcon: {
    backgroundColor:'#b3b3b3',borderColor:'transparent',
    borderWidth:1,
    borderRadius: 50,
    padding:18
  },
  settingsText: {
    fontSize:20,
    color:'#000',
  },
  addressTextArea: {
    justifyContent:'space-around',
    margin:20
  },
  line1: {
    borderWidth:1,
    borderColor:'#cccccc',
    borderRadius:10, marginBottom:10
  },
  lineText: {
    marginLeft:10,
    fontSize:19,
    color:'#818181'
  },
  postLine: {
    width:width/2,
    borderWidth:1,
    borderColor:'#cccccc',
    borderRadius:10, marginBottom:10
  }
});
