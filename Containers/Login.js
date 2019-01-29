/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,AsyncStorage, StyleSheet, Text, View, Alert, Image, Dimensions, TextInput, TouchableOpacity} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions, createStackNavigator } from 'react-navigation'
import Api from '../Services/AppServices'

type Props = {};
export default class Login extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
        headerTitle: 'LOGIN',
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
             routeName: 'HomeScreen',
             action: {
               type: NavigationActions.RESET,
               index: 0,
               actions: [{type: NavigationActions.NAVIGATE, routeName: 'HomeScreen'}]
             }
           })
  }

  async login(){

    var formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    // formData.append('email', 'remya1@vtrio.com');
    // formData.append('password', 'remya1238');

    let fetchApiLogin = await Api.login(formData);
    // console.log("API RESULT....", fetchApiLogin)
      if(fetchApiLogin.status == 'success'){

         var result = fetchApiLogin
        let user_object = {
          isLoggedIn: true,
          userId: result.user_id,
          token: result.token,
          pro_pic: result.profile_image
        }

        AsyncStorage.setItem('user_object', JSON.stringify(user_object));
        console.log(user_object)

        this.props.navigation.navigate('HomeScreen');
        Alert.alert(fetchApiLogin.message);
      }
      else if(fetchApiLogin.status == 'error'){
        Alert.alert(fetchApiLogin.message);
      }

  }

  register(){
    this.props.navigation.navigate('Register');
  }

  forgot(){
    this.props.navigation.navigate('ForgotPassword');
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textStyle}>Login with your Social Account?</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>

          <View style={{width:width/4,marginTop:30, marginBottom:30,alignItems:'center'}}>
            <Image source={require('../Images/facebook.png')} style={{width:60, height:60}}/>
          </View>

          <View style={{width:width/4, marginTop:30, marginBottom:30, alignItems:'center'}}>
            <Image source={require('../Images/google-plus.png')} style={{width:60, height:60}}/>
          </View>
        </View>

        <View>
          <Text style={styles.textStyle}>OR</Text>
        </View>

        <View style={{margin:20}}>
          <TextInput
            placeholder = 'Enter Username'
            placeholderTextColor = '#ababab'
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            style={styles.textInputStyle}
            underlineColorAndroid= '#cccccc'
          />

          <TextInput
          placeholder = 'Enter Password'
          placeholderTextColor = '#ababab'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          style={styles.textInputStyle}
          underlineColorAndroid= '#cccccc'
          />
        </View>

        <View>
          <TouchableOpacity style={styles.loginButton} onPress={this.login.bind(this)}>
            <Text style={styles.login}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.forgotView}>
          <TouchableOpacity onPress={this.forgot.bind(this)}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.accountView}>
          <TouchableOpacity  onPress={this.register.bind(this)}>
            <Text style={styles.account}>Don't have an Account?'</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
