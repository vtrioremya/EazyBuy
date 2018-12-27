/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
var {height, width} = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Location extends Component<Props> {

  static navigationOptions = {
    headerTitle: 'SELECT DELIVERY LOCATION',
    headerStyle: {
      backgroundColor: '#39385a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200',
    },
    headerLeft: (
      <View style={{marginLeft:10}}>
        <Image source={require('../Images/back.png')} style={{width:30,height:30}}/>
      </View>
    ),
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.searchView}>

          <View style={{width:'15%', alignItems:'center', }}>
            <Image source={require('../Images/footer-icon-3.png')} style={{width:30, height:30, justifyContent:'flex-start'}}/>
          </View>

          <View style={{width:'70%', alignItems:'center' }}>
            <TextInput
              placeholder='Enter Delivery Address'
              placeholderTextColor='#000'
              style={styles.textStyle}
            />
          </View>

        </View>

        <MapView
        style={{position:'absolute',top:0,left:0,right:0,bottom:0}}
         initialRegion={{
           latitude: 10.0159,
           longitude: 76.3419,
           latitudeDelta: 0.1,
           longitudeDelta: 0.1,
         }}
        >

          <MapView.Marker
            coordinate={{
              latitude: 10.0159,
              longitude: 76.3419
            }}
            title={'Kakkanad'}
            description={'My default Location'}
          />
        </MapView>

        <View style={styles.confirm}>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={{color:'#fff', fontSize:18}}>CONFIRM</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
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
  searchView: {
    flexDirection:'row',
    alignItems:'center',
    position:'absolute',
    marginLeft:5,
    marginRight:5,
    zIndex:2,
    top:0,
    right:0,
    left:0,
    backgroundColor:'rgba(253,253,253,0.8)',
    width:width,
    height:70
  },
  textStyle: {
    alignItems:'center',
    fontSize:18
  },
  confirm: {
    bottom:60,
    position:'absolute'
  },
  confirmButton: {
    backgroundColor:'#262050',
    width:width/2,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    borderColor:'transparent',
    borderRadius:width/2 /2,
    borderWidth:1
  }
});
