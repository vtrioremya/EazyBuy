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
import ToggleBox from 'react-native-show-hide-toggle-box'

type Props = {};

export default class Cart extends Component<Props> {

  constructor(props){
    super(props);
    // this.splash=this.splash.bind(this);
    this.state = {
      index:0,
      selectedTab: 0,
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

    renderHistory(rowData, sectionID, rowID, highlightRow){
      console.log(rowData)
      let history =rowData.item
      let list = []
      list.push(
          <View style={{flexDirection:'row',padding:20, justifyContent:'space-between'}}>
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
    console.log(rowData)
    let grocery =rowData.item
    let list = []
    console.log(grocery.key)

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

              <Text style={{fontSize:16, color:'#000'}}>1 Kg </Text>


              <View style={{flexDirection:'row', marginTop:5, justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                  <Text style={{fontSize:16, color:'#000'}}>AED 15 </Text>
                  <Text style={{fontSize:16,}}>(17% Off)</Text>
                </View>

                <View style={{width:100, right:0}}>
                  <TouchableOpacity style={styles.openNowButton}>
                    <Text style={{color:'#fff',fontSize:17}}>1 Units X AED 15</Text>
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
    console.log(this.props)
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
            <View style={{alignItems: 'center',height:200,marginBottom:20,
             backgroundColor: '#fff'}} arrowUpType='remove'>


              <TextInput placeholder='Enter coupon code' />

              <TouchableOpacity style={{width:width/2.5, padding:8, alignItems:'center',
                backgroundColor:'#fdc82a', justifyContent:'center', marginTop:10, borderRadius:8}}>
                <Text style={{color:'#fff', fontSize:18 }}>ADD</Text>
              </TouchableOpacity>
            </View>
          </ToggleBox>


          <ToggleBox label={<Text>Loyalty Points</Text>} expanded={false} arrowDownType='add'
          arrowUpType='remove' style={{borderColor:'#d6d6d6',backgroundColor: '#fff', borderBottomWidth: 1,fontSize:20}}>
            <View style={{alignItems: 'center', marginBottom:20,
             backgroundColor: '#fff'}}>

              <Text style={{fontSize:25, color:'#000'}}>105 Pts</Text>
              <Text style={{fontSize:18, marginTop:10}}>as of 10/12/2018</Text>
              <TouchableOpacity style={{width:width/2.5, padding:8, alignItems:'center',
                backgroundColor:'#fdc82a', justifyContent:'center', marginTop:10, borderRadius:8}}>
                <Text style={{color:'#fff', fontSize:18 }}>REDEEM</Text>
              </TouchableOpacity>

              <View style={{borderTopWidth:1,borderColor:'#e5e5e5', marginTop:20, width:width}}>
                <View style={{padding:20}}>
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
            <Text style={{fontSize:16,color:'#000'}}>Item Total</Text>
            <Text style={{fontSize:16,color:'#000'}}>AED 30</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontSize:16,color:'#000'}}>Service Fee</Text>
            <Text style={{fontSize:16,color:'#000'}}>AED 00</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
            <Text style={{fontSize:16,color:'#000'}}>VAT</Text>
            <Text style={{fontSize:16,color:'#000'}}>AEC 00</Text>
          </View>
        </View>

        <View style={{padding:20, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:25,color:'#000', fontWeight:'bold'}}>Order Total</Text>
          <View style={{alignItems:'flex-end', flexDirection:'column'}}>
            <Text style={{fontSize:25,color:'#000', fontWeight:'bold'}}>AED 30</Text>
            <Text style={{textDecorationLine: 'underline', color: '#7694ca', fontSize:16}}>Add an Item</Text>
          </View>
        </View>

        <View style={{ marginLeft:20, marginRight:20, borderTopWidth:1, borderBottomWidth:1, borderColor:'#d6d6d6'}}>
          <TextInput placeholder='Note to Merchant' placeholderTextColor='#8f8f8f' style={{fontSize:16}}/>
        </View>

        <View style={{ flexDirection:'row', marginTop:20, marginBottom:20}}>
          <View style={{width:width/2,alignItems:'center'}}>
            <TouchableOpacity style={{width:width/2.2, backgroundColor:'#39385a',borderRadius: width/3 /2,
              height:60, borderColor:'transparent', borderWidth:1,  justifyContent:'center'}}>
              <Text style={{fontSize:18, color:'#fff', textAlign:'center'}}
              onPress={()=> this.props.navigation.navigate('Checkout')}>ORDER NOW</Text>
            </TouchableOpacity>
          </View>

          <View style={{width:width/2,alignItems:'center'}}>
            <TouchableOpacity style={{width:width/2.2, backgroundColor:'#fdc82a', borderRadius: width/3 /2,
              height:60, borderColor:'transparent', borderWidth:1, justifyContent:'center'}}>
              <Text style={{fontSize:18, color:'#fff', textAlign:'center'}}>SCHEDULE</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>


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
    fontSize:15,
    color:'#000'
  },
  headerName: {
    fontSize:20,
    color:'#000'
  },
  textStyle: {
    alignItems:'center',
    fontSize:18
  },
  history: {
    fontSize:25
  },
  points:{
    fontSize:18,
    color:'#000'
  },
  date: {
    fontSize: 18,
    color:'#9b9b9b'
  },
  rate: {
    fontSize:18,
    color:'#000'
  },
  name: {
    fontSize: 18,
    color:'#9b9b9b'
  }
});
