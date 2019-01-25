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
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MaterialTabs from 'react-native-material-tabs';
import ModalDropdown from 'react-native-modal-dropdown';
import Api from '../Services/AppServices'
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
type Props = {};

class ProductList extends Component<Props> {

  constructor(props){
    super(props);
    // this.addItemToCart=this.addItemToCart.bind(this);

    this.state = {
      index:0,
      selectedTab: 0,
      groceries: [],
      subCat: [],
      subName: [],
      kg: [],
      routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
    };
    // this.loadUserItems=this.loadUserItems.bind(this);

  }



  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
    headerTitle: params.heading,
    headerStyle: {
      backgroundColor: '#39385a',
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
      const { navigation } = this.props;

      var catId= navigation.state.params.catId;

      //gms and kg fontSize

      // let fetchBanner = await Api.getCommonOffer();
      // console.log("API kg and gms....", fetchBanner)

      //sub categories api
      let subCategory = await Api.getSubCategory(catId);
      // console.log("sub cat....", subCategory)
      this.setState({
        subCat: subCategory.categories
      })

      var subNames=[]
      this.state.subCat.map((name) => {

        subNames.push(name.name)

      })
      this.setState({
        subName: subNames
      })
      // console.log(this.state.subName)
      //list api
      var formData = new FormData();
      formData.append('category_id', catId);

      let fetchApiLogin = await Api.getProducts(formData);
      // console.log("PROD LIST....", fetchApiLogin)

          this.setState({
            groceries: fetchApiLogin,
          })

      this.props.navigation.setParams({
        backbutton: this.backbutton.bind(this),
          cartButton: this.cartButton.bind(this),
          heading:this.props.navigation.state.params.catName
      });
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

    backbutton(){
      this.props.navigation.dispatch({
               type: NavigationActions.NAVIGATE,
               routeName: 'ProductCategory',
               action: {
                 type: NavigationActions.RESET,
                 index: 0,
                 actions: [{type: NavigationActions.NAVIGATE, routeName: 'ProductCategory'}]
               }
             })
    }


    productdetail(prodId){
      // Alert.alert("splash");
      this.props.navigation.navigate('ProductDetails',{prodId:prodId})
    }

    add(){
      this.setState({
        counter: this.state.counter+1
      })
    }

    // updateCart = (grocery) => {
    //   console.log("carttt", grocery)
    //   this.addItemToCart()
      // var cart_items = [{
      //   "product_id": "56",
      //   "quantity": "2",
      //   "option": {
      //     "product_option_id": "232",
      //     "product_option_value_id": "28" ,
      //     "side_dish":"item side dish",
      //     "size":"M",
      //     "special_request":"customer request"
      //
      // }]
      // this.props.counter.push(cart_items)
      // console.log("cart items",this.props.cartItems)

    //   this.props.updateCart({name:'ahokd'})
      // AsyncStorage.setItem
      // "cart_items": [{
      //   "product_id": "56",
      //   "quantity": "2",
      //   "option": {
      //     "product_option_id": "232",
      //     "product_option_value_id": "28" ,
      //     "side_dish":"item side dish",
      //     "size":"M",
      //     "special_request":"customer request"
      //   }
      // }]
    // }



  renderRow(rowData, sectionID, rowID, highlightRow){
    // console.log("render cart",this.props.addItemToCart(rowData.item))
    let grocery =rowData.item
    // console.log("options",grocery.options)

    var weights = grocery.options
    var weightName = []
    var weightId = []
    var weightResult = []

    weights.map((size)=>{

      weightName.push(size.name)
      weightId.push(size.option_value_id)
      var object = []
      object=[{'id': size.option_value_id,
          'value': size.name,
      }]
      weightResult.push(object)

    })

    // console.log("weightName",weightName)
    // console.log(weightId)
    // console.log(weightResult)
    let list = []


    list.push(
      <View style={styles.grocery}>
      <TouchableOpacity style={styles.grocery} onPress={this.productdetail.bind(this,grocery.product_id)}>
        <View style={{ justifyContent:'center'}}>
          <Image source={{uri: grocery.image}}
          style={{width:100,height:100 ,borderRadius:10}} />
          <Image source={require('../Images/fav.png')}
          style={{width:20,height:20,position:'absolute',top:0}} />
        </View>

        <View style={styles.groceryDet}>
          <View>
            <View style={{flexDirection:'row', justifyContent:'space-between',}}>
              <Text style={styles.headerName}>{grocery.name}</Text>
              <Text style={{color:'#000', fontSize:15}} onPress={()=>this.props.navigation.navigate('Comparison')}>Compare Price</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16, color:'#000'}}>AED {grocery.price} </Text>
              <Text style={{fontSize:16,}}>({grocery.discount_percentage}% Off)</Text>
            </View>
          </View>

          <View style={{flexDirection:'row',width:width/1.8,alignItems:'center', justifyContent:'space-between',marginTop:15}}>


                <ModalDropdown options={weightName}
                  style={{borderColor:'gray',borderWidth:0.5,height:30,borderRadius:5 }} dropdownTextStyle={{fontSize:18}}
                  dropdownStyle={{borderColor:'gray', borderWidth:1, borderRadius:5, width:90}}
                >

                <View style={{width:70,marginLeft:5,marginRight:5,flexDirection:'row',justifyContent:'space-between'}}>
                  <View>
                    <Text style={styles.ratandlocStyle}>1 Kg</Text>
                  </View>

                  <View style={{width:30,height:30, alignItems:'center'}}>
                    <Image source={require('../Images/drop-down-arrow.png')}
                    style={{width:10,height:10}} />
                  </View>

                </View>
                </ModalDropdown>



            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                <TouchableOpacity style={{width:40, alignItems:'center',justifyContent:'center'}}
              >
                  <Image source={require('../Images/minus.png')}
                    style={{width:15,height:15}} />
                </TouchableOpacity>

                <View style={{alignItems:'center',width:30, borderColor:'gray', borderWidth:0.5, borderRadius:5}}>
                  <Text style={styles.ratandlocStyle}>0</Text>
                </View>

                <TouchableOpacity style={{width:40,  alignItems:'center',justifyContent:'center'}}
                onPress={this.add.bind(this)}>
                  <Image source={require('../Images/plus.png')}
                    style={{width:15,height:15}} />
                </TouchableOpacity>

            </View>

            <View style={{width:50}}>
              <TouchableOpacity style={styles.openNowButton} onPress={()=>this.props.addItemToCart(rowData.item)}>
                <Text style={{color:'#fff',fontSize:17}}>ADD</Text>
              </TouchableOpacity>
            </View>


          </View>

        </View>
        </TouchableOpacity>
      </View>
    );
    return (<View>{list}</View>)
  }


  render() {
    const { navigation } = this.props;
    // console.log("CAT ID",navigation.state.params.catId)
    console.log("REDUX PROPS",this.props)
    // console.log("REDUX cart length",this.props.cart.length)

    // this.props.items && this.props.items.length > 0 ? console.log(this.props.items[0].type) : ''


    return (
      <View style={styles.container}>

          <View style={styles.searchView}>

            <View style={{width:'15%', alignItems:'center', }}>
              <Image source={require('../Images/footer-icon-3.png')} style={{width:30, height:30, justifyContent:'flex-start'}}/>
            </View>

            <View style={{width:'70%', alignItems:'center' }}>
              <TextInput
                placeholder='Search for Products'
                placeholderTextColor='#9c9c9c'
                style={styles.textStyle}
              />
            </View>

          </View>


        <View>
          <MaterialTabs
            items={['allitems','akkdsj']}
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
            />

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
    // padding:10,
    margin:5,
    // marginRight:10,
    width:width-50,
    justifyContent:'space-between'
  },
  groceryDet: {
    flexDirection:'column',
    paddingLeft:5,
  },
  openNowButton: {
    backgroundColor:'#a9cf46',
    width:width/6,
    height:30,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
    // borderWidth:1
  },
  ratandlocStyle: {
    margin:5,
    fontSize:17,
    color:'#000'
  },
  headerName: {
    fontSize:20,
    color:'#000'
  },
  searchView: {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:5,
    marginRight:5,
    zIndex:2,
    top:0,
    right:0,
    left:0,
    backgroundColor:'rgba(253,253,253,0.8)',
    width:width,
    height:70
  },
  textStyle: {
    alignItems:'center',
    fontSize:18
  },
});

// const mapStateToProps = state => ({
//   items: state.counter,
// })

const mapStateToProps = (state) => {
  return {
    cartItems: state
  }
}

const mapDispatchToProps = (dispatch)=> {
    return {
      addItemToCart : (products) => dispatch({
        type: 'ADD_TO_CART',
         payload: products
      })
    }
  }





export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
