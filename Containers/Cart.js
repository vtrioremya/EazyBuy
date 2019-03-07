/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Modal,TouchableHighlight, ScrollView, FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert, TextInput} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MaterialTabs from 'react-native-material-tabs';
import ModalDropdown from 'react-native-modal-dropdown';
import ToggleBox from 'react-native-show-hide-toggle-box'
import {connect} from 'react-redux'
import Fonts from '../Themes/Fonts'
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

type Props = {};
var newDate = moment(new Date()).format('DD-MM-YYYY');
class Cart extends Component<Props> {

  constructor(props){
    super(props);
    // this.splash=this.splash.bind(this);
    this.state = {
      index:0,
      selectedTab: 0,
      date:newDate ,
      coupon:'',
      modalVisible:false,
      groceries: [{key: 'a'}, {key: 'b'}],
      history: [{key: 'a'}, {key: 'b'}],
      routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
    };
  }

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
    headerTitle: 'YOUR CART',
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
        <TouchableOpacity>
          <Image source={require('../Images/delete.png')} style={{width:30, height:30}} />
        </TouchableOpacity>
        </View>
      )
    }
    }

    componentDidMount(){
      this.props.navigation.setParams({
        backbutton: this.backbutton.bind(this)
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

    productdetail = () => {
      // Alert.alert("splash");
      this.props.navigation.navigate('ProductDetails')
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    renderHistory(rowData, sectionID, rowID, highlightRow){
      // console.log(rowData)
      let history =rowData.item
      let list = []
      list.push(
          <View style={{flexDirection:'row',padding:5, justifyContent:'space-between'}}>
            <View style={{justifyContent:'space-around'}}>
              <Text style={styles.points}>20 Pts</Text>
              <Text style={styles.date}>11/05/2018</Text>
            </View>

            <View>
              <Text style={styles.name}>Purchase</Text>
              <Text style={styles.rate}>AED 200</Text>
            </View>
          </View>
      );

      return (<View>{list}</View>);
    }



  renderRow(rowData, sectionID, rowID, highlightRow){
    // console.log(rowData)
    let grocery =rowData.item
    let list = []
    // console.log(grocery.key)

    list.push(
      <View style={styles.grocery}>
        <TouchableOpacity style={styles.grocery} onPress={this.productdetail}>

          <View style={{ justifyContent:'center'}}>
            <Image source={require('../Images/product-1.jpg')}
            style={{width:100,height:80 ,borderRadius:10}} />
            <Image source={require('../Images/fav.png')}
            style={{width:20,height:20,position:'absolute',top:0}} />
          </View>

          <View style={styles.groceryDet}>

              <View style={{flexDirection:'row',width:width/1.8,justifyContent:'space-between',}}>
                <View style={{width:width/1.8 /1.5}}>
                  <Text style={styles.headerName}>Coconut Oil</Text>
                </View>

                <View style={{flexDirection:'row',
                justifyContent:'space-between'}}>

                    <TouchableOpacity style={{width:40, alignItems:'center',
                    justifyContent:'center'}}>
                      <Image source={require('../Images/minus.png')}
                        style={{width:15,height:15}} />
                    </TouchableOpacity>

                    <View style={{alignItems:'center',width:30,
                    borderColor:'gray', borderWidth:0.5, borderRadius:5}}>
                      <Text style={styles.ratandlocStyle}>0</Text>
                    </View>

                    <TouchableOpacity style={{width:40,  alignItems:'center',justifyContent:'center'}}>
                      <Image source={require('../Images/plus.png')}
                        style={{width:15,height:15}} />
                    </TouchableOpacity>

                </View>

              </View>

              <Text style={{fontSize:Fonts.nextRegular,fontFamily:Fonts.base, color:'#000'}}>1 Kg </Text>


              <View style={{flexDirection:'row', marginTop:5, justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                  <Text style={{fontSize:Fonts.medium, fontFamily:Fonts.base,color:'#000'}}>AED 15 </Text>
                  <Text style={{fontSize:Fonts.medium,fontFamily:Fonts.base}}>(17% Off)</Text>
                </View>

                <View style={{width:100, right:0}}>
                  <TouchableOpacity style={styles.openNowButton}>
                    <Text style={{color:'#fff',fontSize:Fonts.mid,fontFamily:Fonts.base}} numberOfLines={1}>1 Units X AED 15</Text>
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
    // console.warn("date",this.state.date)
    // console.log("REDUX PROPS",this.props)
    // console.log("REDUX cart",this.props.cartItems)
    return (
      <ScrollView>
      <View style={styles.container}>

        <View style={{width:width}}>

             <FlatList data={this.state.groceries}
              renderItem={this.renderRow.bind(this)}
            />

        </View>

        <ScrollView style={{width:width}}>

          <ToggleBox label={<Text>Add Coupon Code</Text>}  expanded={false} arrowDownType='add'
          arrowUpType='remove' style={{borderColor:'#d6d6d6',backgroundColor: '#fff', borderBottomWidth: 1,fontSize:20}}>
            <View style={{alignItems: 'center',height:100,marginBottom:20,
             backgroundColor: '#fff'}} arrowUpType='remove'>


              <TextInput style={{borderColor:'#d3d3d3',borderWidth:1,borderRadius:10,
              fontFamily:Fonts.base, width:width/1.5}}
              placeholder='Enter coupon code' value={this.state.coupon}
              onChangeText={(coupon)=>this.setState({coupon})}/>

              <TouchableOpacity style={{width:width/2.5, fontFamily:Fonts.base,padding:8, alignItems:'center',
                backgroundColor:'#fdc82a', justifyContent:'center', marginTop:10, borderRadius:8}}>
                <Text style={{color:'#fff', fontSize:Fonts.regular,fontFamily:Fonts.base }}>ADD</Text>
              </TouchableOpacity>
            </View>
          </ToggleBox>


          <ToggleBox label={<Text>Loyalty Points</Text>} expanded={false} arrowDownType='add'
          arrowUpType='remove' style={{borderColor:'#d6d6d6',backgroundColor: '#fff',
          borderBottomWidth: 1,fontSize:20}}>
            <View style={{alignItems: 'center', marginBottom:20,
             backgroundColor: '#fff'}}>

              <Text style={{fontSize:Fonts.input, fontFamily:Fonts.base,color:'#000'}}>105 Pts</Text>
              <Text style={{fontSize:Fonts.nextRegular, fontFamily:Fonts.base,marginTop:10}}>as of 10/12/2018</Text>
              <TouchableOpacity style={{width:width/2.5, padding:8, alignItems:'center',
                backgroundColor:'#fdc82a', justifyContent:'center', marginTop:10, borderRadius:8}}>
                <Text style={{color:'#fff', fontSize:Fonts.nextRegular,fontFamily:Fonts.base }}>REDEEM</Text>
              </TouchableOpacity>

              <View style={{borderTopWidth:1,borderColor:'#e5e5e5', marginTop:10, width:width}}>
                <View style={{paddingTop:10, paddingLeft:10}}>
                  <Text style={styles.history}>HISTORY</Text>
                </View>

                <View>
                  <FlatList data={this.state.history}
                   renderItem={this.renderHistory.bind(this)}
                 />
                </View>
              </View>

            </View>
          </ToggleBox>


        </ScrollView>


        <View>
        <View style={{flexDirection:'column', justifyContent:'space-between', marginLeft:20, marginRight:20}}>
          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontSize:Fonts.mid,fontFamily:Fonts.base,color:'#000'}}>Item Total</Text>
            <Text style={{fontSize:Fonts.Maid,fontFamily:Fonts.base,color:'#000'}}>AED 30</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontSize:Fonts.mid,fontFamily:Fonts.base,color:'#000'}}>Delivery Fee</Text>
            <Text style={{fontSize:Fonts.mid,fontFamily:Fonts.base,color:'#000'}}>AED 00</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
            <Text style={{fontSize:Fonts.mid,fontFamily:Fonts.base,color:'#000'}}>VAT</Text>
            <Text style={{fontSize:Fonts.mid,fontFamily:Fonts.base,color:'#000'}}>AEC 00</Text>
          </View>
        </View>

        <View style={{padding:20, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:20,color:'#000', fontWeight:'bold'}}>Order Total</Text>
          <View style={{alignItems:'flex-end', flexDirection:'column'}}>
            <Text style={{fontSize:20,color:'#000', fontWeight:'bold'}}>AED 30</Text>
            <Text style={{textDecorationLine: 'underline',marginTop:10,fontFamily:Fonts.base, color: '#7694ca',
            fontSize:Fonts.mid}} >Add an Item</Text>
          </View>
        </View>

        <View style={{ marginLeft:20, marginRight:20, borderTopWidth:1, borderBottomWidth:1, borderColor:'#d6d6d6'}}>
          <TextInput placeholder='Note to Merchant' placeholderTextColor='#8f8f8f' style={{fontFamily:Fonts.base,fontSize:Fonts.mid}}/>
        </View>

        <View style={{ flexDirection:'row', marginTop:20, marginBottom:20}}>
          <View style={{width:width/2,alignItems:'center'}}>
            <TouchableOpacity style={{width:width/2.2, backgroundColor:'#39385a',borderRadius: width/3 /2,
              height:60, borderColor:'transparent', borderWidth:1,  justifyContent:'center'}}>
              <Text style={{fontFamily:Fonts.base,fontSize:Fonts.input, color:'#fff', textAlign:'center'}}
              onPress={()=> this.props.navigation.navigate('Checkout')}>ORDER NOW</Text>
            </TouchableOpacity>
          </View>

          <View style={{width:width/2,alignItems:'center'}}>
            <TouchableOpacity style={{width:width/2.2, backgroundColor:'#fdc82a', borderRadius: width/3 /2,
              height:60, borderColor:'transparent', borderWidth:1, justifyContent:'center'}}>
              <Text style={{fontSize:Fonts.input, fontFamily:Fonts.base,color:'#fff',
              textAlign:'center'}} onPress={() => {
                this.setModalVisible(true);
              }}>SCHEDULE</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>

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
              <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="datetime"
                placeholder="select date"
                format="DD-MM-YYYY ,h:mm:ss"

                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({date: date})}}
              />

              </View>
            </View>

          </TouchableHighlight>

        </Modal>


      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    flexDirection: 'column',

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
    paddingLeft:10,
  },
  openNowButton: {
    backgroundColor:'#a9cf46',
    width:width/3,
    height:30,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
    // borderWidth:1
  },
  ratandlocStyle: {
    margin:5,
    fontSize:Fonts.mid,
    fontFamily:Fonts.base,
    color:'#000'
  },
  headerName: {
    fontSize:Fonts.nextRegular,
    fontFamily:Fonts.base,
    color:'#000'
  },
  textStyle: {
    alignItems:'center',
    fontSize:Fonts.mid,
    fontFamily:Fonts.base
  },
  history: {
    fontSize:Fonts.input,
    fontFamily:Fonts.base
  },
  points:{
    fontSize:Fonts.mid,
    color:'#000',
    fontFamily:Fonts.base
  },
  date: {
    fontSize: Fonts.mid,
    color:'#9b9b9b',
    fontFamily:Fonts.base
  },
  rate: {
    fontSize:Fonts.mid,
    fontFamily:Fonts.base,
    color:'#000'
  },
  name: {
    fontSize: Fonts.mid,
    fontFamily:Fonts.base,
    color:'#9b9b9b'
  },
  outerModal: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  modalView :{
    alignItems:'center',
    elevation: 4,
    borderColor:'gray',
    borderRadius:20,
    justifyContent:'center',
    backgroundColor:'#fff',
    width: width/1.5,
    height: height/4.5,
    shadowColor:'#000'
  },
});

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems
  }
}
export default connect(mapStateToProps)(Cart)
