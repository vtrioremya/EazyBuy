
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

type Props = {};

export default class PurchaseSuccess extends Component<Props> {

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
    this.props.navigation.navigate('Swipers')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width:width, alignItems:'center'}}>
          <Image source={require('../Images/logo-splash.png')} style={{width: 120, height: 120}}/>
        </View>
        <View style={styles.tick}>
            <Image source={require('../Images/21-payment-success-tick.png')}
            style={{width: 70, height: 70}}/>
        </View>

        <View style={{margin:20, alignItems:'center'}}>
          <Text style={{fontSize:23, color:'#000', marginBottom:10}}>Your Order has been placed</Text>
          <Text style={{fontSize:18, color:'#000'}}>Order information was sent to your email</Text>
        </View>

        <TouchableOpacity style={styles.done}>
          <Text style={styles.doneText}>DONE</Text>
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
  tick: {
    backgroundColor: '#fdc82a',
    width: 150,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:75,
    borderWidth:1,
    borderColor:'transparent',
    height:150,
    marginTop: 40
  },
  englishText: {
    color: '#fff',
    fontSize: 20,
    textAlign:'center',
    alignItems:'center'
  },
  done: {
    backgroundColor: '#271f51',
    width: width/1.9,
    justifyContent:'center',
    borderRadius:30,
    borderWidth:1,
    borderColor:'transparent',
    height:60,
    marginTop:10
  },
  doneText: {
    color: '#fff',
    fontSize: 20,
    textAlign:'center',
    alignItems:'center'
  }
});
