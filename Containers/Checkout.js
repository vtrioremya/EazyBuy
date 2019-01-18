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
import CheckBox from 'react-native-check-box'

type Props = {};



export default class Checkout extends Component<Props> {

  constructor(props){
    super(props);
    this.splash=this.splash.bind(this);
    this.state = {
      isChecked: false,
      checked1: true
    };
  }

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
    headerTitle: 'CHECKOUT',
    headerStyle: {
      backgroundColor: '#39385a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200',
    },
      headerLeft: (
        <View style={{marginLeft:10}}>
          <TouchableOpacity onPress={()=> params.backbutton()}>
            <Image source={require('../Images/back.png')} style={{width:30,height:30}}/>
          </TouchableOpacity>
        </View>
      ),
      headerRight: (<View></View>),
    }
    }

    componentDidMount(){
      this.props.navigation.setParams({
          backbutton: this.backbutton.bind(this),
      });
    }

    backbutton(){
      this.props.navigation.dispatch({
               type: NavigationActions.NAVIGATE,
               routeName: 'Cart',
               action: {
                 type: NavigationActions.RESET,
                 index: 0,
                 actions: [{type: NavigationActions.NAVIGATE, routeName: 'Cart'}]
               }
             })
    }

  splash = () => {
    // Alert.alert("splash");
    this.props.navigation.navigate('Swipers')
  }

  Location() {
    // Alert.alert("splash");
    this.props.navigation.navigate('Location')
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.locationText}> Delivery Location</Text>
          <View style={styles.addressView}>
            <Text style={styles.address}> Dream House, 2nd Floor,</Text>
            <Text style={styles.address}> Al Sufouh Residency</Text>
            <Text style={styles.address}> Dubai, United Arab Emirates.</Text>
          </View>


        </View>

        <View style={{marginTop:20}}>
          <TouchableOpacity style={styles.change} onPress={this.Location.bind(this)}>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop:20}}>
          <Text style={styles.pay}>Payment Options</Text>
          <View style={styles.paymentMethod}>
          <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={()=>{
                this.setState({
                    isChecked:!this.state.isChecked
                })
              }}
              isChecked={this.state.isChecked}
              leftText={"Cash on Delivery"}
              leftTextStyle={{fontSize:20, color:'#000'}}
              checkedImage={<Image source={require('../Images/radio-but-chk.png')}
              style={{width: 30, height:30}}/>}
              unCheckedImage={<Image source={require('../Images/radio-but-un-chk.png')}
              style={{width: 30, height:30}}/>}
            />

            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>{
                  this.setState({
                      isChecked:!this.state.isChecked
                  })
                }}
                isChecked={this.state.checked1}
                leftText={"Card Payment"}
                leftTextStyle={{fontSize:20, color:'#000'}}
                checkedImage={<Image source={require('../Images/radio-but-chk.png')}
                style={{width: 30, height:30}}/>}
                unCheckedImage={<Image source={require('../Images/radio-but-un-chk.png')}
                 style={{width: 30, height:30}}/>}
              />
          </View>

          <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.payText}>PROCEED TO PAYMENT</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',

  },
  locationText :{
    fontSize: 22, color:'#000'

  },
  address : {
    fontSize: 22,
    marginTop:10, color:'#000'
  },
  change: {
    backgroundColor:'#fdc82a',
    width: width/3,
    padding:5,
    alignItems:'center',
    marginTop:20,
    borderRadius:5,

  },
  changeText: {
    color:'#fff',
    fontSize:20
  },
  addressView: {
    width: width,
    marginTop:20
  },
  pay: {
    fontSize: 20,
    color:'#000'
  },
  paymentMethod : {
    width: width/1.2,
     height:100,
     marginTop:20
  },
  paymentButton: {
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#262050',
    padding:20,
    width:width/1.5,
    borderRadius: width/1.5 /2,
    borderColor:'transparent',
    borderWidth:1
  },
  payText: {
    fontSize:18,
    color:'#fff'
  }

});
