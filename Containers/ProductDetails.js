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
import Api from '../Services/AppServices'
import PropTypes from "prop-types";
import Fonts from '../Themes/Fonts'
import Loader from '../Components/Loader'

import { connect } from 'react-redux';

type Props = {};
class ProductDetails extends Component<Props> {

  constructor(props){
    super(props);
    // this.splash=this.splash.bind(this);
    this.state = {
      index:0,
      selectedTab: 0,
      groceries: [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}],
      details: [],
      loader:true,
      size: null,
      sliderImages:[],
      bannerImage:[]
    };
  }

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#39385a',

        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
          // textTransform: 'uppercase'
        },
          headerLeft: (
            <View style={{marginLeft:10, flexDirection:'row',flex:1}}>
              <TouchableOpacity style={{width:50}} onPress={()=> params.backbutton()}>
                <Image source={require('../Images/back.png')} style={{width:30,height:30}}/>
              </TouchableOpacity>
              <View style={{width:width/1.4,alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontWeight: '200',fontSize: 18,
                fontFamily:Fonts.base, color:'#fff', alignItems:'center', justifyContent:'center'}}>{params.heading}</Text>
              </View>
            </View>
          ),
          headerRight: (
            <View style={{marginRight:5}}>
              <TouchableOpacity onPress={()=> params.cartButton()}>
              <Image source={require('../Images/cart.png')} style={{width:30, height:30}} />
            </TouchableOpacity>
            </View>
          )
        }
    }

    async componentDidMount(){


      var storeId = this.props.navigation.state.params.storeId;

      let slider = await Api.getPromotionsSlide(storeId);

      this.setState({
        bannerImage: slider.slider
      })

      var prodId = this.props.navigation.state.params.prodId

      let fetchApiLogin = await Api.getProductDetails(prodId);

      this.setState({
        details : fetchApiLogin.products,
        loader:false,
        size: this.state.details.size,
        sliderImages: fetchApiLogin.images
      })
console.log(this.state.details)
      // var weights = this.state.size
      // var weightName = []
      // var weightId = []
      // var weightResult = []
      //
      // weights.map((size)=>{
      //
      //   weightName.push(size.name)
      //   weightId.push(size.option_value_id)
      //   var object = []
      //   object=[{'id': size.option_value_id,
      //       'value': size.name,
      //   }]
      //   weightResult.push(object)
      //
      // })

      this.props.navigation.setParams({
        backbutton: this.backbutton.bind(this),
            cartButton: this.cartButton.bind(this),
            heading: this.state.details.heading_title
        });

    }

    backbutton(){
      this.props.navigation.dispatch({
               type: NavigationActions.NAVIGATE,
               routeName: 'ProductList',
               action: {
                 type: NavigationActions.RESET,
                 index: 0,
                 actions: [{type: NavigationActions.NAVIGATE, routeName: 'ProductList'}]
               }
             })
    }
    cartButton(){
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



  render() {


    return (
      <View style={styles.container}>
      <Loader
        loading={this.state.loader} />
        <View style={{width:width,height:200}}>
          <Swiper style={{width:width,height:200}}
                  dotColor='#cfc8c1'
                  loop={false}
                  activeDotColor='#ffb013'>

                  {this.state.bannerImage.map((image)=>{
                    return(
                      <View>
                        <Image  source={{uri: image.image}} style={{width:width,height:150}}/>
                      </View>
                    )
                  })}

          </Swiper>
        </View>

        <ScrollView>
          <View>
            <View style={{alignItems:'center', justifyContent:'center', marginTop:10}}>
              <Image source={{uri: this.state.details.thumb}}
              style={{width: 100, height: 100}}/>
            </View>

            <View>
              <Text style={{fontSize: Fonts.nextRegular, fontFamily:Fonts.base,textAlign:'center', color:'#000'}}>{this.state.details.heading_title}</Text>
              <Text style={{fontSize: Fonts.mid,fontFamily:Fonts.base, textAlign:'center', color:'#000', fontWeight:'bold'}}>{this.state.details.discount_percentage}% Off</Text>
            </View>

            <View style={{width:width,
              height: 60, alignItems:'center', justifyContent:'center'}}>
              <View
                    style={{backgroundColor:'#fdc82a', width:width-50,
                    height: 50, alignItems:'center', justifyContent:'center',
                  borderRadius:50, borderColor:'transparent', borderWidth:1}}>
                <Text style={{fontFamily:Fonts.base,color:'#000', fontSize:Fonts.nextRegular}}>AED {this.state.details.price}</Text>
              </View>
            </View>

            <View style={{marginTop:20, marginBottom:20,flexDirection:'row',
             justifyContent:'space-around'}}>
              { this.state.size  ? <View style={{borderRadius:10, borderColor:'gray', borderWidth:1,
              width:width/4, height:40,alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:Fonts.nextRegular,fontFamily:Fonts.base, color:'#000'}}>1 Kg </Text>
              </View>:<View></View>}

              { this.state.size ? <View style={{borderRadius:10, borderColor:'gray', borderWidth:1,width:width/4, height:40,alignItems:'center',
              justifyContent:'center'}}>
                <Text style={{fontSize:Fonts.nextRegular,fontFamily:Fonts.base, color:'#000'}}>500 gms </Text>
              </View>:<View></View>}

              <View style={{width:width/4, height:40,}}>
                <TouchableOpacity style={{width:width/4.5, height:40,
                  alignItems:'center', backgroundColor:'#a9cf46',borderRadius:10, borderColor:'#a9cf46', borderWidth:1,
                  justifyContent:'center'}} onPress={() => this.props.navigation.navigate('Cart')}>
                  <Text style={{fontSize:Fonts.regular, fontFamily:Fonts.base, color:'#fff'}}>ADD +</Text>
                </TouchableOpacity>
              </View>

            </View>

            <View style={{marginLeft:20, marginRight:20}}>
              <Text style={{fontSize:Fonts.mid, color:'#525252'}}>
                {this.state.details.description}
              </Text>
            </View>

            <View style={{flexDirection:'row',margin:20,alignItems:'center' }}>
              <Image source={require('../Images/bullets.png')} style={{width:10, height:10}}/>
              <Text style={styles.specs}>  Virgin   </Text>
              <Image source={require('../Images/bullets.png')} style={{width:10, height:10}}/>
              <Text style={styles.specs}>  Unrefined   </Text>
              <Image source={require('../Images/bullets.png')} style={{width:10, height:10}}/>
              <Text style={styles.specs}>  Cold Pressed</Text>
            </View>

          </View>
        </ScrollView>


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
  specs: {
    fontSize:Fonts.mid,
    fontFamily:Fonts.base,
    color:'#7d8a44'
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

ProductDetails.propTypes = {
  product: PropTypes.func.isRequired,
  // authenticateUser: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
  // navigation: PropTypes.shape({
  //   navigate: PropTypes.func.isRequired
  // }).isRequired
};

ProductDetails.defaultProps = {
  // authenticateUser: null,
  // isAuthenticated: false,
  product: false,
  // navigation: null
};

const mapStateToProps = (state) => {
  const { counter } = state
  return { counter }
};

export default connect(mapStateToProps)(ProductDetails);
