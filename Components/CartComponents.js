import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View,TextInput, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { DrawerActions , NavigationActions} from 'react-navigation';
var {height, width} = Dimensions.get('window');


const CartComponents = (props) => {
  return(
    <View style={{flexDirection: 'row',bottom:0,justifyContent:'space-between',
    backgroundColor:'rgba(57, 56, 90, 0.8)',position :'absolute', width:width, padding:10}}>

      <View style={{ justifyContent:'center'}}>
        <Text style={{color:'white'}}>1 Item | ₹201</Text>
      </View>

      <View style={{justifyContent:'center'}}>

        <TouchableOpacity>
          <Text style={{color:'white'}}>View Cart</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};
export default CartComponents;
