/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,ToastAndroid, AsyncStorage, StyleSheet, Text, View, Alert, Image, Dimensions, TextInput, TouchableOpacity} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions, createStackNavigator } from 'react-navigation'
import EmailValidation from '../Components/EmailValidation'
import Api from '../Services/AppServices'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'

const countryC = ["AF","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BV","BR","IO","VG","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CK","CR","HR","CU","CW","CY","CZ","CD","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","CI","JM","JP","JE","JO","KZ","KE","KI","XK","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","KP","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","CG","RO","RU","RW","RE","BL","KN","LC","MF","PM","VC","WS","SM","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","KR","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","ST","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","VI","UY","UZ","VU","VA","VE","VN","WF","EH","YE","ZM","ZW","AX"]


type Props = {};
export default class Register extends Component<Props> {
  constructor(props){
    super(props);

    //country code
    const userCountryData = getAllCountries()
    .filter(country => countryC.includes(country.cca2))
    .pop()
    let callingCode = null
    // let cca2 = userLocaleCountryCode
    // if (!cca2 || !userCountryData) {
      cca2 = 'AE'
    //   callingCode = '1'
    // } else {
      callingCode = userCountryData.callingCode
    // }

    this.state = {
      email: '',
      fName: '',
      countries: countryC,
      value:'United Arab Emirates',
      lName:'',
      password: '',
      confirm: '',
      errorEmail:'',
      printall: userCountryData,
      cca2,
      callingCode
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

    // console.log("login")

      if(!this.state.fName && !this.state.lName && !this.state.email && !this.state.password && !this.state.confirm && !this.state.mobile){
        ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
        return;
      }

      if(!this.state.fName){
        ToastAndroid.show("Firstname can't be blank", ToastAndroid.SHORT);
        return;
      }

      if(!this.state.lName){
        ToastAndroid.show("Lastname can't be blank", ToastAndroid.SHORT);
        return;
      }

      if(!this.state.email){
        ToastAndroid.show("Email can't be blank", ToastAndroid.SHORT);
        return;
      }

      if(!this.state.password){
        ToastAndroid.show("Password can't be blank", ToastAndroid.SHORT);
        return;
      }

      if(!this.state.confirm){
        ToastAndroid.show("Confirm Password can't be blank", ToastAndroid.SHORT);
        return;
      }

      if(!this.state.mobile){
        ToastAndroid.show("Mobile can't be blank", ToastAndroid.SHORT);
        return;
      }



      var formData = new FormData();
      formData.append('firstname', this.state.fName);
      formData.append('lastname', this.state.lName);
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
      formData.append('telephone', this.state.mobile);
      formData.append('confirm', this.state.confirm);
      formData.append('nationality', this.state.value);
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
    // console.log("userCountryData",this.state.countries)
    // console.log("COUNTRY",countryC)
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

        <View style={{flexDirection:'row', borderBottomWidth:1, borderColor:'#d3d3d3' ,alignItems:'center', margin:10,width:width/1.19 }}>
          <Text style={{fontSize:20,marginRight:5, color:'#000'}}> {this.state.value}</Text>
          <CountryPicker
            countryList={this.state.countries}
            onChange={value => {
              this.setState({ value:value.name,cca2: value.cca2, callingCode: value.callingCode })
            }}
            cca2={this.state.cca2}
            translation="eng"
          />
        </View>

        <View style={{flexDirection:'row'}}>
          <TextInput
            placeholder = 'Select'
            value='+971'
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
            keyboardType={'numeric'}
            maxLength={13}
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
    margin:10,
    color:'#000'
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
