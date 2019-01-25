/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,AsyncStorage, ScrollView, FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert, TextInput} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions, DrawerActions } from 'react-navigation'
import Swiper from 'react-native-swiper';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MaterialTabs from 'react-native-material-tabs';
import CartComponents from '../Components/CartComponents'
import NavigationBar from '../Components/NavigationBar'
import PropTypes from "prop-types";
import Api from '../Services/AppServices'

import { connect } from 'react-redux';

type Props = {};


class HomeScreen extends Component<Props> {

  constructor(props){
    super(props);
    // this.splash=this.splash.bind(this);
    this.state = {
      index:0,
      selectedTab: 0,
      groceries: [],
      bannerImage:[],
      routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
    };
  }

  static navigationOptions =  {
    headerLeft: (
      <NavigationBar toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
        )
  }
  //
  //     headerLeft: (
  //       <View style={{flex:1,flexDirection: 'row'}}>
  //
  //         <View style={{width: 50, height: 50, justifyContent:'center'}}>
  //           <TouchableOpacity>
  //             <Image source={require('../Images/ham.png')}
  //             style={{marginLeft:10,width:30,height:30}}/>
  //           </TouchableOpacity>
  //         </View>
  //
  //         <View style={{width: width/1.2, height: 50,borderWidth:1, borderColor:'#dfdfdf',
  //           borderRadius:width/1.2 /2, flexDirection:'row'}}>
  //
  //           <View style={{width: 50, height: 50,alignItems:'center',justifyContent:'center'}}>
  //             <Image source={require('../Images/map-1.png')} style={{width:20,height:30}}/>
  //           </View>
  //
  //           <View style={{width: width/2, height: 50}} >
  //             <TextInput placeholder='Search'
  //             style={{width:width/1.5}}/>
  //           </View>
  //
  //         </View>
  //
  //       </View>
  //     ),
  //
  //
  //   }
  // }
  async componentDidMount(){
    // this.props.navigation.setParams({ tabBarVisible: false });
    // AsyncStorage.getItem('user_object', (err, results) => {
    //    let user_object = JSON.parse(results);
    //    if (user_object) {
    //    }
    //  });

    let fetchBanner = await Api.getCommonOffer();
    // console.log("API offers....", fetchBanner)
    let i = 0
     var image= []
     for(i of fetchBanner.offer_list){
       image.push(i.image)
     }
     // console.log("image push", image)
     this.setState({
       bannerImage: image
     })
     // console.log(this.state.bannerImage)

    let fetchApiLogin = await Api.getGroceries();
    // console.log("API Stores....", fetchApiLogin)
     this.setState({
       groceries: fetchApiLogin
     })

  }



  onScroll(){
    // Alert.alert("hai")
    // this.props.navigation.setParams({ tabBarVisible: true });
  }

  onStop(){
    // Alert.alert("end")
    // this.props.navigation.setParams({ tabBarVisible: false });
  }

  product(storeId){
    // Alert.alert("splash");
    this.props.navigation.navigate('ProductCategory', {storeId: storeId})
  }


  renderRow(rowData, sectionID, rowID, highlightRow){
    // console.log(rowData)
    let grocery =rowData.item
    let list = []
    // console.log(grocery.key)

    list.push(
      <View style={styles.grocery}>

        <View style={{width:width/3.8}}>
          <Image source={require('../Images/shop-1.png')}
          style={{width:width/3.8, height:height/7.5 ,borderRadius:10}} />
          <Image source={require('../Images/star.png')}
          style={{width:40,height:40,position:'absolute',bottom:0}} />
        </View>

        <View style={styles.groceryDet}>
          <Text style={styles.headerName}>{grocery.name}</Text>
          <Text>{grocery.address_arabic}</Text>

          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginTop:15}}>
            <View style={{flexDirection:'row'}}>

                <Image source={require('../Images/map-1.png')}
                style={{width:15,height:20}} />
                <Text style={styles.ratandlocStyle}>{grocery.config_detime}</Text>

            </View>

            <View style={{flexDirection:'row'}}>

                <Image source={require('../Images/star-1.png')}
                style={{width:20,height:20}} />
                <Text style={styles.ratandlocStyle}>{grocery.rating}</Text>

            </View>

            <View>
              <TouchableOpacity style={styles.openNowButton}
              onPress={this.product.bind(this,grocery.store_id)}>
                <Text style={{color:'#fff',fontSize:17}}>Open Now</Text>
              </TouchableOpacity>
            </View>


          </View>

        </View>
      </View>
    );
    return (<View>{list}</View>)
  }

  Render_FlatList_Sticky_header = () => {

    var Sticky_header_View = (


      <View style={styles.header_style}>


      </View>

    );
      return Sticky_header_View;
  }


  render() {
    // console.log("state ot props",this.props.counter)
    return (
      <View style={styles.container}>
        <View style={{width:width,height:200}}>
          <Swiper style={{width:width,height:200}}
                  dotColor='#cfc8c1'
                  activeDotColor='#ffb013'>
            <View>
              <Image  source={{uri: this.state.bannerImage[0]}} style={{width:width,height:200}}/>
            </View>

            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

          </Swiper>
        </View>

        <View>
          <MaterialTabs
            items={['Groceries', 'Maid Services', 'Techservice']}
            selectedIndex={this.state.selectedTab}
            onChange={index => this.setState({ selectedTab: index })}
            barColor='#fff'
            indicatorColor='#eebd17'
            activeTextColor='#484848'
            inactiveTextColor='#a1a1a1'
            uppercase={false}
            textStyle={{fontSize:18}}
          />
        </View>

        <View style={{width:width,marginBottom:40}}>

             <FlatList data={this.state.groceries}
              renderItem={this.renderRow.bind(this)}
              ListFooterComponent={this.Render_FlatList_Sticky_header}
              onScroll={this.onScroll.bind(this)}
              onEndReached={this.onStop.bind(this)}
              onEndReachedThreshold={6}
            />

        </View>
        <CartComponents />

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
    marginTop:10,
    justifyContent:'center'
  },
  groceryDet: {
    flexDirection:'column',
    paddingLeft:10,
    width:width/1.5
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
  },
  header_style:{

    width: width,
    height:250,
    backgroundColor: 'transparent',

  }
});

HomeScreen.propTypes = {
  product: PropTypes.func.isRequired,
  // authenticateUser: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
  // navigation: PropTypes.shape({
  //   navigate: PropTypes.func.isRequired
  // }).isRequired
};

HomeScreen.defaultProps = {
  // authenticateUser: null,
  // isAuthenticated: false,
  product: false,
  // navigation: null
};

const mapStateToProps = (state) => {
  const { counter } = state
  return { counter }
};

export default connect(mapStateToProps)(HomeScreen);
