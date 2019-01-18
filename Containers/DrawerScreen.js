/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Share, AsyncStorage, Text, View, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { DrawerActions, NavigationActions } from 'react-navigation';
var {height, width} = Dimensions.get('window');
// import Share from 'react-native-share';

type Props = {};

export default class DrawerScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      hide:true
    }
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
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

  componentDidMount(){
    AsyncStorage.getItem('user_object', (err, results) => {
       let user_object = JSON.parse(results);
       // if (user_object.isLoggedIn == true) {
       //   this.setState({
       //     hide: false
       //   })
       // }
     });
  }

  refer(){
    // const shareOptions = {
    //     title: 'Share via',
    //     url: 'some share url',
    //     social: Share.Social.WHATSAPP
    // };
    //
    // Share.shareSingle(shareOptions);
    Share.share({
    message: 'BAM: we\'re helping your business with awesome React Native apps',
    url: 'http://bam.tech',
    title: 'Wow, did you see that?'
  }, {
    // Android only:
    dialogTitle: 'Share BAM goodness',
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  })
  }

  render () {
    return (
      <View style={styles.container}>

        <View style={styles.proImage}>
          <View style={styles.Image}>
            <Image source={require('../Images/blank_profile_pic.png')}
            style={{width:100,height:100,borderColor:'#ffb013',borderWidth:1,borderRadius:50}}/>
          </View>

          <View style={styles.textStyle}>
            <View style={{flexDirection:'row',marginBottom:5}}>
              <Text style={styles.text}>Your Name</Text>
              <TouchableOpacity style={styles.editButton} >
                <Image style={{width:30, height:30}} source={require('../Images/edit.png')}/>
              </TouchableOpacity>
            </View>

            <Text>Your Mobile Number </Text>
            <Text> Your Email</Text>
          </View>
        </View>

        <ScrollView>
          <View style={{marginTop:20}}>
            {this.state.hide ?[<View style={styles.menuItem}>
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
              <Text style={styles.textSize} >
               Offers
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/settings.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize}>
              Settings
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/rate.png')} style={{width:30, height:30}} />
              <Text  style={styles.textSize}>
                Rate Us
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/suggest.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize}>
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
              <Text  style={styles.textSize} onPress={this.navigateToScreen('Account')}>
                My Account
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Image source={require('../Images/signout.png')} style={{width:30, height:30}} />
              <Text style={styles.textSize} >
               Sign Out
              </Text>
            </View>
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
    padding: 10,
    flexDirection:'row'
  },
  textStyle: {
    marginTop:10,
    flexDirection:'column'
  },
  text :{
    fontSize:20,
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
    fontSize:19,
    marginLeft:10,
    color:'#000'
  }
});
