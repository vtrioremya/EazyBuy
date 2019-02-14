/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, ToastAndroid, Share, AsyncStorage,Alert, Text, View, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { DrawerActions, NavigationActions } from 'react-navigation';
var {height, width} = Dimensions.get('window');
// import Share from 'react-native-share';
import Api from '../Services/AppServices'
import {getToken} from '../Services/lib'
import Fonts from '../Themes/Fonts'

type Props = {};

export default class DrawerScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      hide:true,
      signout:true,
      account:null,
      email: 'Your email',
      phone:'Your phone', name: 'Your name'
    }
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  navigateToScreenParams(settings){

    const navigateAction = NavigationActions.navigate({
      routeName: 'Account',
      params: {settings: settings}
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }


  press(){
    // console.log(this.props.navigation.goBack())

      const navigateAction = NavigationActions.navigate({
      routeName: 'Location',

      params: {},

      action: NavigationActions.navigate({ routeName: 'Location' }),
      });

      this.props.navigation.dispatch(navigateAction);
  }

  async componentDidMount(){
    // var token ='9bd316e1a9e455efac6a0bd9166779';
    let token = await getToken()
    let accountDetails = await Api.getAccount(token);
    console.log("API account....", accountDetails)

    this.setState({
      account:accountDetails
    })
    // console.log("name",accountDetails.firstname)
    // let user_object = {
    //   firstname: accountDetails.firstname,
    //   lastname: accountDetails.lastname,
    //   phone: accountDetails.telephone,
    //   email: accountDetails.email,
    //   pic: accountDetails.profile_image
    // }
    // AsyncStorage.mergeItem('user_object', JSON.stringify(user_object));
    //
    // let obj = await AsyncStorage.getItem('user_object');
    // console.log("account",JSON.parse(obj))
  }

   async shouldComponentUpdate(){
     let token = await getToken()
     let accountDetails = await Api.getAccount(token);
     // console.log("API account....", accountDetails)

     this.setState({
       account:accountDetails
     })
    // let obj = await AsyncStorage.getItem('user_object');
    //
    //    let account= JSON.parse(obj)
    //    if(account){
    //    if (account.isLoggedIn == true) {
    //
    //      this.setState({
    //        hide: false,
    //        signout: true,
    //        phone: account.telephone != null ? account.telephone: 'Your Mobile Number',
    //        email: account.email !=null ? account.email :'Your Email',
    //        name: account.firstname != null ? account.firstname: 'Your Name',
    //        pic: account.profile_image
    //      })
    //    }
    //    else{
    //
    //      this.setState({
    //        hide: true,
    //        signout: false,
    //        phone: 'Your Mobile Number',
    //        email: 'Your Email',
    //        name: 'Your Name'
    //      })
    //    }
    //  }


     return true;
  }

  refer(){

    Share.share({
    message: 'BAM: we\'re helping your business with awesome React Native apps',
    url: '',
    title: 'Wow, did you see that?'
  }, {
    // Android only:
    dialogTitle: 'Share EazyBuy',
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  })
  }

  async signout(){
    // Alert.alert("signoput")
    var formData = new FormData();
    let token = await getToken()
    formData.append('token', token);
    formData.append('device_id', '637568hh');

    let logoutApi = await Api.logout(formData);
    // console.log("logout",logoutApi)

    console.log(logoutApi.message)
    ToastAndroid.show(logoutApi.message, ToastAndroid.SHORT);

    await AsyncStorage.clear()
    const navigateAction = NavigationActions.navigate({
      routeName: 'HomeScreen'
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  editImage(){
    const navigateAction = NavigationActions.navigate({
    routeName: 'Account',

    params: {},

    action: NavigationActions.navigate({ routeName: 'Account' }),
    });

    this.props.navigation.dispatch(navigateAction)
  }

  render () {
    return (
      <View style={styles.container}>

        {this.state.account ? <View style={styles.proImage}>
          <View style={styles.Image}>
            <TouchableOpacity onPress={this.editImage.bind(this)}>
              <Image source={{uri: this.state.account.profile_image}}
                style={{width:100,height:100,borderColor:'#ffb013',borderWidth:1,
                borderRadius:50}}/>
            </TouchableOpacity>
          </View>

          <View style={styles.textStyle}>
            <View style={{flexDirection:'row',marginBottom:5,}}>
              <Text numberOfLines={1} style={styles.text}>{this.state.account.firstname.length>0 ? this.state.account.firstname+' '+ this.state.account.lastname: 'Your name'}</Text>
              <TouchableOpacity style={styles.editButton} onPress={this.editImage.bind(this)}>
                <Image style={{width:30, height:30}} source={require('../Images/edit.png')}/>
              </TouchableOpacity>
            </View>

            <Text numberOfLines={1} style={{fontFamily:Fonts.base}}>{this.state.account.telephone.length>0 ? this.state.account.telephone : 'Your Phone'}</Text>
            <Text numberOfLines={1} style={{fontFamily:Fonts.base}}>{this.state.account.email.length>0 ?this.state.account.email : 'Your email'}</Text>
          </View>
        </View> :
        <View style={styles.proImage}>
          <View style={styles.Image}>
            <Image source={require('../Images/blank_profile_pic.png')}
            style={{width:100,height:100,borderColor:'#ffb013',borderWidth:1,borderRadius:50}}/>
          </View>

          <View style={styles.textStyle}>
            <View style={{flexDirection:'row',marginBottom:5}}>
              <Text style={styles.text}>Your name</Text>
              <TouchableOpacity style={styles.editButton} onPress={this.navigateToScreen('Accounts')}>
                <Image style={{width:30, height:30}} source={require('../Images/edit.png')}/>
              </TouchableOpacity>
            </View>

            <Text style={{fontFamily:Fonts.base}}>Your Phone</Text>
            <Text style={{fontFamily:Fonts.base}}>Your email</Text>
          </View>
        </View>}

        <ScrollView>
          <View style={{marginTop:20}}>
            {!this.state.account ?[<View style={styles.menuItem}>
              <Image source={require('../Images/left_menu-icon-13.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize} onPress={this.navigateToScreen('Login')}>
                Sign in
              </Text>
            </View>]:[]}
            <View style={styles.menuItem}>
              <Image source={require('../Images/search.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize} onPress={this.navigateToScreen('HomeScreen')}>
                Browse All
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/contact.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize} onPress={this.refer.bind(this)}>
               Refer a Friend
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/location.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize} onPress={this.navigateToScreen('Location')}>
              Change My Address
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/orders.png')} style={{width:30, height:30}} />
              <Text  style={styles.textSize} onPress={this.navigateToScreen('MyOrders')}>
                My Orders
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/offfers.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize} onPress={this.navigateToScreen('Offers')} >
               Offers
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/settings.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize} onPress={this.navigateToScreenParams.bind(this,'yes')}>
              Settings
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/rate.png')} style={{width:30, height:30}} />
              <Text  style={styles.textSize} >
                Rate Us
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/suggest.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize} onPress={this.navigateToScreen('SuggestProduct')}>
               Suggest a Product
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/call.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize} onPress={this.navigateToScreen('ContactUs')}>
              Contact Us
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/account.png')} style={{width:30, height:30}} />
              <Text  style={styles.textSize} onPress={this.navigateToScreenParams.bind(this,'no')}>
                My Account
              </Text>
            </View>
            {this.state.account ? <View style={styles.menuItem}>
              <Image source={require('../Images/signout.png')} style={{width:30, height:30}} />
              <Text  style={styles.textSize} onPress={this.signout.bind(this)}>
                Signout
              </Text>
            </View> : <View></View>}

          </View>
        </ScrollView>
      </View>
    );
  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding:20
  },
  proImage:{
    flexDirection:'row',
    alignItems:'center'
  },
  menuItem:{
    padding: 5,
    flexDirection:'row',
    alignItems:'center',
  },
  textStyle: {
    marginTop:10,
    flexDirection:'column',
     width:width/4,
  },
  text :{
    fontSize:Fonts.input,
    fontFamily:Fonts.base,
    color:'#000'
  },
  Image: {
    width: width/3.5
  },
  editButton: {
    width:40,
    alignItems:'center'
  },
  textSize: {
    fontSize:17,
    fontFamily:Fonts.base,
    marginLeft:10,
    color:'#000'
  }
});
