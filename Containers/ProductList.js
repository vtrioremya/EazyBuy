/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,ToastAndroid, ScrollView, FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert, TextInput} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MaterialTabs from 'react-native-material-tabs';
import ModalDropdown from 'react-native-modal-dropdown';
import Api from '../Services/AppServices'
import PropTypes from 'prop-types';
import Fonts from '../Themes/Fonts'
import Loader from '../Components/Loader'
import AlertMessage from '../Components/AlertMessage'
import {getToken} from '../Services/lib'
// import {addToCart} from '../Services/lib';


import { connect } from 'react-redux';
type Props = {};

class ProductList extends Component<Props> {

  constructor(props){
    super(props);
    // this.addItemToCart=this.addItemToCart.bind(this);

    this.state = {
      index:0,
      count:0,
      favImage:'',
      selectedTab: 0,
      deleteLoader:true,
      groceries: [],
      subCat: [],
      weightValue: 'Qty',
      nothingtoDisplay:'noDisplay',
      subName: [],
      kg: [],
      sub_cat:[{key:'a'},{key:'b'}]
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
      fontFamily:Fonts.base
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
    async shouldUpdateComponent(){
      var formData = new FormData();
      formData.append('category_id', catId);

      let fetchApiLogin = await Api.getProducts(formData);
console.log(fetchApiLogin)
        if(fetchApiLogin.length == 0 || fetchApiLogin.length == null){
          this.setState({
            groceries: fetchApiLogin,
            deleteLoader:false,
            nothingtoDisplay:'true'
          })
        }
        else{
          this.setState({
            groceries: fetchApiLogin,
            deleteLoader:false,
            nothingtoDisplay:'false'
          })
        }
    }

    async componentDidMount(){
      const { navigation } = this.props;

      var catId= navigation.state.params.catId;

      //gms and kg fontSize

      // let fetchBanner = await Api.getCommonOffer();


      //sub categories api
      let subCategory = await Api.getSubCategory(catId);

      this.setState({
        subCat: subCategory.categories,

      })

      var subNames=[]
      this.state.subCat.map((name) => {

        subNames.push(name.name)

      })
      this.setState({
        subName: subNames
      })

      //list api
      var formData = new FormData();
      formData.append('category_id', catId);

      let fetchApiLogin = await Api.getProducts(formData);
console.log(fetchApiLogin)
        if(fetchApiLogin.length == 0 || fetchApiLogin.length == null){
          this.setState({
            groceries: fetchApiLogin,
            deleteLoader:false,
            nothingtoDisplay:'true'
          })
        }
        else{
          this.setState({
            groceries: fetchApiLogin,
            deleteLoader:false,
            nothingtoDisplay:'false'
          })
        }

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
      this.props.navigation.navigate('ProductDetails',{prodId:prodId, storeId:this.props.navigation.state.params.storeId})
    }



    // updateCart = (grocery) => {

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

    _dropdownList(index,value){

        this.setState({
          weightValue: value
        })
    }

    addItemToCart(){
        // let response1 = await addToCart(data)
        ToastAndroid.show("Item added to cart", ToastAndroid.SHORT);
    }

    renderRowSubCat(rowData, sectionID, rowID, highlightRow){
      let subCat =rowData.item
      let list = []


      list.push(
        <TouchableOpacity>
          <View  style={{borderBottomWidth:2,borderColor:'yellow',justifyContent:'space-around', alignItems:'center', width:width/2.5}}>
            <Text style={{fontFamily:Fonts.base}}>{subCat.name}</Text>

          </View>
        </TouchableOpacity>
      );

      return( <View>{list}</View>);

    }
    Render_FlatList_Sticky_header = () => {

      var Sticky_header_View = (


        <View style={styles.header_style}>


        </View>

      );
        return Sticky_header_View;
    }

    async addFavorite(id){
      try{
        let token = await getToken()

        var formData = new FormData();
        formData.append('token', token);
        formData.append('product_id', id);


        let favorites=  await Api.addFav(formData);
        // console.log(favorites)
        if(favorites.status == 'success'){

          this.setState({
            favImage: require('../Images/fav.png')
          })
          Alert.alert(favorites.message)
        }
        else{
          this.props.navigation.navigate('Login')
        }
      }
      catch(err){
        console.log(err)
      }
    }

    removeFavorite(){

    }

    decreaseCounter(rowID, rowData){
      console.log(rowID)
      console.log(rowData)

      this.setState({
          count : this.state.count- 1
        },()=>{
          if(this.state.count <= 1){
            this.setState({
              count : 1
            })
          }
        },()=>{
          this.setState({
            groceries:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(array)
          })
        })
    }



  renderRow(rowData, sectionID, rowID, highlightRow){

    let grocery =rowData.item


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
    if(grocery.wishlist == 0){
      this.setState({
        favImage: require('../Images/heart.png')
      })
    }
    else{
      this.setState({
        favImage: require('../Images/fav.png')
      })
    }

    let list = []


    list.push(
      <View style={styles.grocery}>
      <TouchableOpacity style={styles.groceryView} onPress={this.productdetail.bind(this,grocery.product_id)}>
        <View style={{ justifyContent:'center'}}>
          <Image source={{uri: grocery.image}}
          style={{width:width/4.5,height:height/9 ,borderRadius:10}} />

          {grocery.wishlist == 0 ? <TouchableOpacity
            onPress={this.addFavorite.bind(this,grocery.product_id)} style={{width:20,height:20,position:'absolute',top:0}}>
              <Image source={this.state.favImage}
              style={{width:20,height:20,position:'absolute',top:0}} />
          </TouchableOpacity>: <TouchableOpacity
            onPress={this.removeFavorite.bind(this,grocery.product_id)} style={{width:20,height:20,position:'absolute',top:0}}>
              <Image source={this.state.favImage}
              style={{width:20,height:20,position:'absolute',top:0}} />
          </TouchableOpacity>}
        </View>

        <View style={styles.groceryDet}>
          <View>
            <View style={{flexDirection:'row', justifyContent:'space-between',}}>
              <Text style={styles.headerName}>{grocery.name}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:Fonts.verySmall, color:'#000', fontFamily:Fonts.base}}>AED {grocery.price} </Text>
              <Text style={{fontSize:Fonts.verySmall, fontFamily:Fonts.base}}>({grocery.discount_percentage}% Off)</Text>
            </View>
          </View>

          <View style={{flexDirection:'row',width:width/1.8,alignItems:'center',
          justifyContent:'space-between'}}>


                <ModalDropdown options={weightName}
                  style={{borderColor:'gray',borderWidth:0.5,height:30,borderRadius:5,fontSize:Fonts.verySmall, fontFamily:Fonts.base}}
                  dropdownTextStyle={{fontSize:Fonts.verySmall, fontFamily:Fonts.base}}
                  onSelect={(idx, value) => this._dropdownList(idx, value)}
                  dropdownStyle={{borderColor:'gray', borderWidth:1, borderRadius:5, width:90}}
                >

                <View style={{width:70,alignItems:'center',marginLeft:5,marginRight:5,flexDirection:'row',
                justifyContent:'space-between'}}>
                  <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={styles.ratandlocStyle}>{this.state.weightValue}</Text>
                  </View>

                  <View style={{width:30, alignItems:'center'}}>
                    <Image source={require('../Images/drop-down-arrow.png')}
                    style={{width:10,height:10}} />
                  </View>

                </View>
                </ModalDropdown>



            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                <TouchableOpacity style={{width:40, alignItems:'center',justifyContent:'center'}}
              onPress={this.decreaseCounter.bind(this,rowID,grocery)}>
                  <Image source={require('../Images/minus.png')}
                    style={{width:15,height:15}} />
                </TouchableOpacity>

                <View style={{alignItems:'center',width:25, borderColor:'gray',
                borderWidth:0.5, borderRadius:5, justifyContent:'center'}}>
                  <Text style={styles.ratandlocStyle}>{this.state.count}</Text>
                </View>

                <TouchableOpacity style={{width:40,  alignItems:'center',justifyContent:'center'}}
                onPress={() => this.props.increaseCounter()}>
                  <Image source={require('../Images/plus.png')}
                    style={{width:15,height:15}} />
                </TouchableOpacity>

            </View>

            <View style={{width:50}}>
              <TouchableOpacity style={styles.openNowButton} onPress={this.addItemToCart.bind(this)}>
                <Text style={{color:'#fff',fontSize:Fonts.mid, fontFamily:Fonts.base}}>ADD</Text>
              </TouchableOpacity>
            </View>


          </View>

        </View>
        </TouchableOpacity>

        <View style={{width:width,backgroundColor:'#d3d3d3', alignItems:'flex-end',}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Comparison')}>
              <View style={{ marginRight:10}}>
                <Text style={{color:'#000', fontSize:Fonts.mid, fontWeight:'bold', fontFamily:Fonts.base}} >
                Compare Price</Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    );
    return (<View>{list}</View>)
  }


  render() {
    const { navigation } = this.props;



    return (
      <View style={styles.container}>
      <Loader
        loading={this.state.deleteLoader} />


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


        <View style={{flexDirection:'row'}}>
          <View><Text>All Items</Text></View>
          <FlatList
            data={this.state.subCat}
            ListFooterComponent={this.Render_FlatList_Sticky_header}
            renderItem={this.renderRowSubCat.bind(this)}
            horizontal={true}
          />
        </View>

        {(this.state.nothingtoDisplay=='true')?
        [
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <AlertMessage title="No products to display!"/>
            </View>
        ]:[

        <View style={{width:width,marginBottom:40}}>

             <FlatList data={this.state.groceries}
              renderItem={this.renderRow.bind(this)}
            />

        </View>
        ]}
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
    flexDirection: 'column',
    // padding:10,
    margin:5,
    marginRight:5,
    width:width-50,
    justifyContent:'space-between'
  },
  groceryView: {
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
    marginLeft:5,
    fontSize:Fonts.verySmall,
     fontFamily:Fonts.base,
    color:'#000',
    textAlign:'center',
    alignSelf:'center'
  },
  headerName: {
    fontSize:Fonts.nextRegular,
    fontFamily: Fonts.base,
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
  header_style:{

    width: width,
    height:50,
    backgroundColor: 'transparent',

  },
  textStyle: {
    alignItems:'center',
    fontSize:Fonts.input,
    fontFamily:Fonts.base
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
