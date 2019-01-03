/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, ScrollView, FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert, TextInput} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation'
import Swiper from 'react-native-swiper';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MaterialTabs from 'react-native-material-tabs';


type Props = {};
export default class ProductDetails extends Component<Props> {

  constructor(props){
    super(props);
    // this.splash=this.splash.bind(this);
    this.state = {
      index:0,
      selectedTab: 0,
      groceries: [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}],
      routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
    };
  }

  static navigationOptions = {
    headerTitle: 'COCONUT OIL',
    headerStyle: {
      backgroundColor: '#39385a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200',
    },
      headerLeft: (
        <View style={{marginLeft:10}}>
          <Image source={require('../Images/back.png')} style={{width:30,height:30}}/>
        </View>
      ),
      headerRight: (
        <View style={{marginRight:5}}>
        <TouchableOpacity>
          <Image source={require('../Images/cart.png')} style={{width:30, height:30}} />
        </TouchableOpacity>
        </View>
      )
    }




  render() {
    return (
      <View style={styles.container}>
        <View style={{width:width,height:150}}>
          <Swiper style={{width:width,height:150}}
                  dotColor='#cfc8c1'
                  activeDotColor='#ffb013'>
            <View>
              <Image  source={require('../Images/product-banner.jpg')} style={{width:width,height:150}}/>
            </View>

            <View>
              <Image  source={require('../Images/product-banner.jpg')} style={{width:width,height:150}}/>
            </View>

            <View>
              <Image  source={require('../Images/product-banner.jpg')} style={{width:width,height:150}}/>
            </View>

            <View>
              <Image  source={require('../Images/product-banner.jpg')} style={{width:width,height:150}}/>
            </View>

            <View>
                <Image  source={require('../Images/product-banner.jpg')} style={{width:width,height:150}}/>
            </View>

            <View>
              <Image  source={require('../Images/product-banner.jpg')} style={{width:width,height:150}}/>
            </View>

          </Swiper>
        </View>

        <View>
          <View style={{alignItems:'center', justifyContent:'center', marginTop:10}}>
            <Image source={require('../Images/product-1.jpg')} style={{width: width/2, height: height/6}}/>
          </View>

          <View>
            <Text style={{fontSize: 25, textAlign:'center', color:'#000'}}>Nutiva Coconut Oil</Text>
            <Text style={{fontSize: 22, textAlign:'center', color:'#000', fontWeight:'bold'}}>19% Off</Text>
          </View>

          <View style={{width:width,
            height: 60, alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity
                  style={{backgroundColor:'#fdc82a', width:width-50,
                  height: 60, alignItems:'center', justifyContent:'center',
                borderRadius:50, borderColor:'transparent', borderWidth:1}}>
              <Text style={{color:'#000', fontSize:30}}>AED 15</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop:20, marginBottom:20,flexDirection:'row',
           justifyContent:'space-around'}}>
            <View style={{borderRadius:10, borderColor:'gray', borderWidth:1,
            width:width/4, height:40,alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:20, color:'#000'}}>1 Kg </Text>
            </View>

            <View style={{borderRadius:10, borderColor:'gray', borderWidth:1,width:width/4, height:40,alignItems:'center',
            justifyContent:'center'}}>
              <Text style={{fontSize:20, color:'#000'}}>500 gms </Text>
            </View>

            <View style={{width:width/4, height:40,}}>
              <TouchableOpacity style={{width:width/4.5, height:40,
                alignItems:'center', backgroundColor:'#a9cf46',borderRadius:10, borderColor:'#a9cf46', borderWidth:1,
                justifyContent:'center'}}>
                <Text style={{fontSize:20, color:'#fff'}}>ADD +</Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={{marginLeft:20, marginRight:20}}>
            <Text style={{fontSize:16, color:'#525252'}}>
              Coconut is one of the worlds most nourishing superfoods. Nutiva Organic Virgin Coconut Oil has a
              creamy taste of the tropics and is great for sauteing , baking, enchancing your favorite recepies, and body care.
            </Text>
          </View>

          <View style={{flexDirection:'row',margin:20 }}>
            <Text style={{fontSize:16,color:'#7d8a44'}}>{'\u2022'} Virgin</Text>
            <Text style={{fontSize:16,color:'#7d8a44'}}> {'\u2022'} Unrefined</Text>
            <Text style={{fontSize:16,color:'#7d8a44'}}> {'\u2022'} Cold Pressed</Text>
          </View>

        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
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
    backgroundColor: '#fbbc00',
    width: width/1.5,
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
  arabic: {
    backgroundColor: '#271f51',
    width: width/1.5,
    justifyContent:'center',
    borderRadius:30,
    borderWidth:1,
    borderColor:'transparent',
    height:60,
    marginTop:10
  },
  arabicText: {
    color: '#fff',
    fontSize: 20,
    textAlign:'center',
    alignItems:'center'
  },
  grocery: {
    flex:1,
    flexDirection: 'row',
    padding:10
  },
  groceryDet: {
    flexDirection:'column',
    paddingLeft:10
  },
  openNowButton: {
    backgroundColor:'#a9cf46',
    width:width/4,
    height:30,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
    // borderWidth:1
  },
  ratandlocStyle: {
    marginLeft:5,
    fontSize:17
  },
  headerName: {
    fontSize:20,
    color:'#000'
  }
});
