/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, Dimensions, TextInput, TouchableOpacity} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions, createStackNavigator } from 'react-navigation'
import Api from '../Services/AppServices'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = {};
export default class ForgotPassword extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      email: '',
    }
  }

  static navigationOptions= ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
        headerTitle: 'FORGOT PASSWORD',
        headerStyle: {
          backgroundColor: '#39385a'
        },
        headerTitleStyle: {
          textAlign: 'center',alignSelf:'center'
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
        headerRight: (<View />)
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
             routeName: 'Login',
             action: {
               type: NavigationActions.RESET,
               index: 0,
               actions: [{type: NavigationActions.NAVIGATE, routeName: 'Login'}]
             }
           })
  }

  async send(){
    
    if(!this.state.email){
      Alert.alert("Email should not be blank.")
      return;
    }

    var formData = new FormData();
    formData.append('email', this.state.email);
    console.log(formData)

    let fetchApiLogin = await Api.forgot(formData);
    console.log("API forgot....", fetchApiLogin)
      if(fetchApiLogin.status == 'success'){

        this.props.navigation.navigate('Login');
        Alert.alert(fetchApiLogin.message);
      }
      else if(fetchApiLogin.status == 'fail'){
        Alert.alert(fetchApiLogin.message);
      }
      Alert.alert(fetchApiLogin.message);
  }



  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>

          <View style={{alignItems:'center', width:width/1.2,justifyContent:'center', marginTop:40}}>
            <View style={{marginTop:20}}>
              <Image source={require('../Images/warning.png')} style={{width:70, height:70}} />
            </View>

            <View style={{margin:20}}>
              <Text style={{fontSize:20, lineHeight: 40,color:'#000', textAlign:'center'}}>Enter your email address here to receive further instructions.</Text>
            </View>
          </View>

          <View style={{marginTop:30}}>
            <TextInput
              placeholder = 'Enter Email'
              placeholderTextColor = '#ababab'
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
              style={styles.textInputStyle}
              underlineColorAndroid= '#cccccc'
            />

          </View>

          <View style={{marginTop:30}}>
            <TouchableOpacity style={styles.loginButton} onPress={this.send.bind(this)}>
              <Text style={styles.login}>SEND</Text>
            </TouchableOpacity>
          </View>



        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height:height
  },
  textStyle: {
    color:'#000',
    fontSize:22
  },
  textInputStyle : {
    width:width -100,
    fontSize:20,
    margin:10
  },
  loginButton : {
    marginTop:30,
    width: width/1.8,
    height:60,
    backgroundColor: '#262050',
    borderColor:'transparent',
    borderRadius: width/1.8 /2,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  login : {
    color:'#fff',
    fontSize: 18,
  },
  forgotPassword: {
    color:'#aeaeae',
    fontSize:20
  },
  forgotView: {
    marginTop:20
  },
  account: {
    color:'#000',
    fontSize:22
  },
  accountView :{
    marginTop:30
  }
});
