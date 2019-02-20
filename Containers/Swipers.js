/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
var {height, width} = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import WelcomeText from '../Components/WelcomeText'
import Api from '../Services/AppServices'
import OfflineNotice from '../Components/OfflineNotice'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


export default class Swipers extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      welcome1_title:'',
      welcome2_title:'',
      welcome3_title:'',
      welcome1_description:'',
      welcome2_description:'',
      welcome3_description:'',
    }
  }

  static navigationOptions = {
    header: null
  }

  async componentDidMount(){
    var lang = this.props.navigation.state.params.lang
      var content_wel1 = 2

      let welcome1 = await Api.getEazybuySplash(lang,content_wel1);


      var content_wel2 = 3

      let welcome2 = await Api.getEazybuySplash(lang,content_wel2);


      var content_wel3 = 4

      let welcome3 = await Api.getEazybuySplash(lang,content_wel3);


      this.setState({
        welcome1_title: welcome1.content.description,
        welcome2_title: welcome2.content.description,
        welcome3_title: welcome3.content.description,
        welcome1_description: welcome1.content.sub_description,
        welcome2_description: welcome2.content.sub_description,
        welcome3_description: welcome3.content.sub_description,

      })
  }



  home(){
    this.props.navigation.navigate('Location');
  }

  render() {
    
    return (
      <View style={styles.container}>
      <OfflineNotice />
        <Swiper style={{width:width}}
                showsButtons={true}
                dot= {
                  <View style={{backgroundColor:'#9796a4', width: 8, height: 8,borderRadius: 4, marginLeft: 10, marginRight: 10, marginTop: 3, marginBottom: 3,}}  />
                }
                activeDot= {
                  <View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 10, marginRight: 10, marginTop: 3, marginBottom: 3,}} />
                }
                loop={false}
                nextButton={
                  <View style={{ width:50, height:50}}>
                      <Image source={require('../Images/next.png')} style={{width:30, height:30}}/>
                    </View>
                }
                prevButton={<View></View>}>


                <WelcomeText
                bg={require('../Images/welcome-bg-1.jpg')}
                picture={require('../Images/welcome-1.jpg')}
                text={this.state.welcome1_title}
                description={this.state.welcome1_description}
                buttonColor='#fbbc00'
                skip={this.home.bind(this)}/>



                  <WelcomeText
                  bg={require('../Images/welcome-bg-2.jpg')}
                  picture={require('../Images/welcome-2.jpg')}
                  text={this.state.welcome2_title}
                  description={this.state.welcome2_description}
                  buttonColor='#2f2c49'
                  skip={this.home.bind(this)}/>



                <WelcomeText
                bg={require('../Images/welcome-bg-1.jpg')}
                picture={require('../Images/welcome-3.jpg')}
                text={this.state.welcome3_title}
                description={this.state.welcome3_description}
                buttonColor='#fbbc00'
                skip={this.home.bind(this)}/>



        </Swiper>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  english: {
    marginTop:20,
    backgroundColor: '#fbbc00',
    width: width/1.25,
    justifyContent:'center',
    borderRadius:30,
    borderWidth:1,
    borderColor:'transparent',
    height:60
  },
  englishText: {
    color: '#fff',
    fontSize: 20,
    textAlign:'center',
    alignItems:'center'
  },
  partOne: {
    backgroundColor:'#fff',
    width: width,
    height: height/2.5
  },
  partTwo: {
    backgroundColor:'#271f51',
    width: width,
    height: height/1.5
  },
  qualityImage: {
    width:width/1.5,
    height:height/3,
    borderRadius:width/1.5 /2,
    borderWidth:1,
    margin:5
  },
  // imageView: {
  //   position:'absolute',
  //   zIndex:1,
  //   top:150,
  //   justifyContent:'center',
  //   alignItems:'center',
  // },
  qualityText: {
    width: width/1.25,
    // justifyContent:'center',
    marginTop:20,
  },
  quality: {
    textAlign: 'justify',
    color:'#fff',
    fontSize:18
  }
});
