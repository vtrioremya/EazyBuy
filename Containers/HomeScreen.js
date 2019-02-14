/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,TouchableHighlight,Modal,AsyncStorage, ScrollView, FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert, TextInput} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions, DrawerActions } from 'react-navigation'
import Swiper from 'react-native-swiper';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MaterialTabs from 'react-native-material-tabs';
import CartComponents from '../Components/CartComponents'
import Loader from '../Components/Loader'
import NavigationBar from '../Components/NavigationBar'
import AlertMessage from '../Components/AlertMessage'
import PropTypes from "prop-types";
import Api from '../Services/AppServices'
import {getToken} from '../Services/lib'
import Fonts from '../Themes/Fonts'
import { Rating } from 'react-native-ratings';

import { connect } from 'react-redux';

type Props = {};


class HomeScreen extends Component<Props> {

  constructor(props){
    super(props);
    // this.splash=this.splash.bind(this);
    this.state = {
      index:0,
      deleteLoader:true,
      nothingtoDisplay: 'nodisplay',
      selectedTab: 0,
      groceries: [],
      bannerImage:[],
      cart:null,
      modalVisible:false,
      storeId:'',
      ratings:3
    };
  }

  static navigationOptions =  {
    headerLeft: (
      <NavigationBar toggleDrawer={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>
        )
  }


  async componentDidMount(){
    try{
      let token = await getToken()
      let cart = await Api.getCartItems(token);

      if(cart.status == 'success'){
        this.setState({
          cart:cart.cart_item
        })
      }
      else{

      }

    }
    catch(e){
      console.log(e)
    }
      let fetchBanner = await Api.getCommonOffer();




      this.setState({
        bannerImage: fetchBanner.offer_list
      })



      let fetchApiLogin = await Api.getGroceries();
      console.log("API Stores....", fetchApiLogin)
      if(fetchApiLogin.length == 0 || fetchApiLogin.length == null){
        this.setState({
          groceries:fetchApiLogin,
          deleteLoader:false,
          nothingtoDisplay:true
        })
      }
      else{
         this.setState({
           groceries: fetchApiLogin,
           deleteLoader:false,
           nothingtoDisplay:true
         })
       }


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

  starRating(storeId){
    this.setState({
      modalVisible: true,
      storeId:storeId
    })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async saveRating(){
    this.setState({
      modalVisible:false
    })
    // try{
      let token = await getToken()
      console.log(token)
      var formData = new FormData();
      formData.append('store_id', this.state.storeId);
      formData.append('token', token);
      formData.append('service_quality', this.state.ratings);
      formData.append('comments', '');
      console.log(formData)
      let rating = await Api.addStoreRating(formData)
      console.log("rating api", rating.message)
      Alert.alert(rating.message)
    // }
    // catch(e){
    //   this.props.navigation.navigate('Login')
    // }
  }

  finished(rating){
    console.log(rating)

    this.setState({
      ratings: rating
    })

  }

  renderRow(rowData, sectionID, rowID, highlightRow){
    console.log(rowData)
    let grocery =rowData.item
    let list = []
    var avg = Math.floor(grocery.rating_avg.avg * 100) / 100
    // console.log(grocery.key)

    list.push(
      <View style={{flex:1, alignItems:'center',justifyContent:'center',width:width, padding:5}}>
        <TouchableOpacity key={rowData.index} onPress={this.product.bind(this,grocery.store_id)}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

            <View style={{width:width/3, alignItems:'center', justifyContent:'center'}}>

            {grocery.store_image ? <View style={{width:width/3.8, height:height/7.5 }}>
              <Image source={{uri: grocery.store_image}}
              style={{width:width/3.8, height:height/7.5 ,borderRadius:10}} />

              <TouchableOpacity style={{width:40,height:40,position:'absolute',bottom:0,left:0}}
              onPress={this.starRating.bind(this, grocery.store_id)}>
                <View>
                  <Image source={require('../Images/star.png')}
                  style={{width:40,height:40}} />
                </View>
              </TouchableOpacity>

              </View>
            :
              <View></View>}

            </View>

            <View style={{width:width/1.5,justifyContent:'center',marginRight:10  }}>

            <Text style={styles.headerName}>{grocery.name}</Text>
            <Text style={{fontFamily:Fonts.base}}>{grocery.address_arabic}</Text>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row'}}>

                  <Image source={require('../Images/map-1.png')}
                  style={{width:15,height:20}} />
                  <Text style={styles.ratandlocStyle} numberOfLines={1}>{grocery.config_detime}</Text>

              </View>

              <View style={{flexDirection:'row'}}>

                  <Image source={require('../Images/star-1.png')}
                  style={{width:20,height:20}} />
                  <Text style={styles.ratandlocStyle}>{avg}</Text>

              </View>


                <View style={styles.openNowButton}>
                  <Text style={{color:'#fff',fontSize:Fonts.mid,fontFamily:Fonts.base}} numberOfLines={1}>{grocery.config_open_status}</Text>
                </View>



            </View>

            </View>

          </View>
        </TouchableOpacity>

      </View>


    );
    return (<View>{list}</View>)
  }

  _keyExtractor = (item, index) => index;

  Render_FlatList_Sticky_header = () => {

    var Sticky_header_View = (


      <View style={styles.header_style}>


      </View>

    );
      return Sticky_header_View;
  }


  render() {

    return (
      <View style={styles.container}>

      <Loader
        loading={this.state.deleteLoader} />
        {(this.state.nothingtoDisplay=='true')?
        [
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <AlertMessage title="No groceries to display!"/>
            </View>
        ]:[
          <View>
        <View style={{width:width,height:150}}>
          <Swiper style={{width:width,height:150}}
                  dotColor='#cfc8c1' loop={false}
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
            textStyle={{fontSize:18, fontFamily:Fonts.base}}
          />
        </View>

        <View style={{width:width, height: height/1.95}}>

             <FlatList
              data={this.state.groceries}
              renderItem={this.renderRow.bind(this)}
              ListFooterComponent={this.Render_FlatList_Sticky_header}
              onEndReached={this.onStop.bind(this)}
              onEndReachedThreshold={6}
              keyExtractor={() => this._keyExtractor}
            />

        </View>
      </View>]}
      {this.state.cart? <CartComponents cart={()=>this.props.navigation.navigate('Cart')}/> : <View></View>}


        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }} style={styles.outerModal}>

            <View style={styles.modalView}>
              <View style={{width:width/2,  justifyContent:'center'}}>

                <Text style={{textAlign:'center',fontSize:10, fontWeight:'bold'}}>
                      RATE ME
                </Text>

                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={40}
                  ratingColor={'yellow'}
                  showRating
                  onFinishRating={this.finished.bind(this)}
                />

                <TouchableOpacity style={styles.saveButton}
                        onPress={this.saveRating.bind(this)}>
                  <Text style={styles.saveText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>

          </TouchableHighlight>

        </Modal>
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
    justifyContent:'center',
    height:height/4
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
    fontSize: Fonts.mid,
    // top:5
  },
  headerName: {
    fontSize: Fonts.nextRegular,
    color:'#000',
    fontFamily:'Helventica-Bold'
  },
  header_style:{

    width: width,
    height:50,
    backgroundColor: 'transparent',

  },
  outerModal: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  modalView :{
    alignItems:'center',
    elevation: 2,
    borderWidth:1,
    borderColor:'#000',
    // borderRadius:10,
    justifyContent:'center',
    backgroundColor:'#fff',
    width: width/1.5,
    height: height/3,
    shadowColor:'#000'
  },
  saveButton: {
    alignItems:'center',
    padding:15,
    backgroundColor:'#262050',
    borderColor:'transparent',
    borderRadius:50,
    borderWidth:1
  },
  saveText: {
    color:'#fff',
    fontSize:Fonts.verySmall
  }
});

HomeScreen.propTypes = {
  // product: PropTypes.func.isRequired,
  // authenticateUser: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
  // navigation: PropTypes.shape({
  //   navigate: PropTypes.func.isRequired
  // }).isRequired
};

HomeScreen.defaultProps = {
  // authenticateUser: null,
  // isAuthenticated: false,
  // product: false,
  // navigation: null
};

const mapStateToProps = (state) => {
  const { counter } = state
  return { counter }
};

export default connect(mapStateToProps)(HomeScreen);
