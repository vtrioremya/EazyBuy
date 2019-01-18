/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, AsyncStorage, StyleSheet, Text, View, Alert, Image, Dimensions, TextInput, TouchableOpacity} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions, createStackNavigator } from 'react-navigation'
import EmailValidation from '../Components/EmailValidation'
import Api from '../Services/AppServices'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = {};
export default class Register extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      fName: '',
      lName:'',
      password: '',
      confirm: '',
      errorEmail:''
    }
  }

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
        headerTitle: 'REGISTER',
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

  async login(){

    console.log("login")

      var formData = new FormData();
      formData.append('firstname', this.state.fName);
      formData.append('lastname', this.state.lName);
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
      formData.append('telephone', this.state.mobile);
      formData.append('confirm', this.state.confirm);
      formData.append('agree', '1');

      console.log(formData)

      let fetchApiLogin = await Api.register(formData);
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

          this.props.navigation.navigate('Login');
          Alert.alert(fetchApiLogin.message);
        }
        else if(fetchApiLogin.status == 'error'){
          Alert.alert(fetchApiLogin.message);
        }
  }


  render() {
    return (
        <KeyboardAwareScrollView>
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
        <View style={{flexDirection:'row'}}>
          <TextInput
            placeholder = 'First Name'
            value={this.state.fName}
            onChangeText={(fName) => this.setState({fName})}
            placeholderTextColor = '#ababab'
            style={styles.textInputStyle2}
            underlineColorAndroid= '#cccccc'
          />

          <TextInput
            placeholder = 'Last Name'
            placeholderTextColor = '#ababab'
            value={this.state.lName}
            onChangeText={(lName) => this.setState({lName})}
            style={styles.textInputStyle2}
            underlineColorAndroid= '#cccccc'
          />

        </View>

        <TextInput
        placeholder = 'Enter Email'
        placeholderTextColor = '#ababab'
        value={this.state.email}
        onChangeText={(email) => this.setState({email})}
        style={styles.textInputStyle}
        underlineColorAndroid= '#cccccc'
        />

        <TextInput
        placeholder = 'Password'
        placeholderTextColor = '#ababab'
        value={this.state.password}
        secureTextEntry={true}
        onChangeText={(password) => this.setState({password})}
        style={styles.textInputStyle}
        underlineColorAndroid= '#cccccc'
        />

        <TextInput
        placeholder = 'Confirm Password'
        placeholderTextColor = '#ababab'
        secureTextEntry={true}
        value={this.state.confirm}
        onChangeText={(confirm) => this.setState({confirm})}
        style={styles.textInputStyle}
        underlineColorAndroid= '#cccccc'
        />

        <View style={{flexDirection:'row'}}>
          <TextInput
            placeholder = 'Select'
            placeholderTextColor = '#ababab'
            style={styles.textInputStyle3}
            underlineColorAndroid= '#cccccc'
          />

          <TextInput
            placeholder = 'Enter Mobile Number'
            placeholderTextColor = '#ababab'
            value={this.state.mobile}
            onChangeText={(mobile) => this.setState({mobile})}
            style={styles.textInputStyle4}
            underlineColorAndroid= '#cccccc'
          />

          </View>

        </View>

        <View>
          <TouchableOpacity style={styles.loginButton} onPress={this.login.bind(this)}>
            <Text style={styles.login}>LOGIN</Text>
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
    paddingTop:50,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    color:'#000',
    fontSize:22
  },
  textInputStyle : {
    width:width/1.19,
    fontSize:20,
    margin:10
  },
  textInputStyle2 : {
    width:width/2.5,
    fontSize:20,
    margin:10
  },
  textInputStyle3 : {
    width:width/3.5,
    fontSize:20,
    margin:10
  },
  textInputStyle4 : {
    width:width/2,
    fontSize:20,
    margin:10
  },
  loginButton : {
    marginTop:10,
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
