import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View,TextInput, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { DrawerActions , NavigationActions} from 'react-navigation';
var {height, width} = Dimensions.get('window');


const DefaultBar = (props) => {
  return(
    <View style={{flex:1,flexDirection: 'row'}}>

      <View style={{width: 50, height: 50, justifyContent:'center'}}>
        <TouchableOpacity onPress={props.toggleDrawer}>
          <Image source={require('../Images/hamp.png')}
          style={{marginLeft:10,width:25,height:25}}/>
        </TouchableOpacity>
      </View>



    </View>
  );
};
export default DefaultBar;
