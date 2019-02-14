import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View,TextInput, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { DrawerActions , NavigationActions} from 'react-navigation';
var {height, width} = Dimensions.get('window');
import Fonts from '../Themes/Fonts'


const NavigationBar = (props) => {
  return(
    <View style={{flex:1,flexDirection: 'row'}}>

      <View style={{width: 50, height: 50, justifyContent:'center'}}>
        <TouchableOpacity onPress={props.toggleDrawer}>
          <Image source={require('../Images/ham.png')}
          style={{marginLeft:10,width:25,height:25}}/>
        </TouchableOpacity>
      </View>

      <View style={{width: width/1.2, height: 50,borderWidth:1, borderColor:'#dfdfdf',
        borderRadius:width/1.2 /2, flexDirection:'row'}}>

        <View style={{width: 50, height: 50,alignItems:'center',justifyContent:'center'}}>
          <Image source={require('../Images/map-1.png')} style={{width:20,height:30}}/>
        </View>

        <View style={{width: width/2, height: 50}} >
          <TextInput placeholder='Sample Address, Address Feild 1, Feild 2'
          placeholderTextColor= '#000'
          style={{width:width/1.5, fontSize: Fonts.nextRegular, fontFamily:Fonts.base}}/>
        </View>

      </View>

    </View>
  );
};
export default NavigationBar;
