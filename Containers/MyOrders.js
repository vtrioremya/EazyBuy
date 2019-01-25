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
import { NavigationActions, createMaterialTopTabNavigator } from 'react-navigation'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MaterialTabs from 'react-native-material-tabs';
import ModalDropdown from 'react-native-modal-dropdown';
import ToggleBox from 'react-native-show-hide-toggle-box'
import Api from '../Services/AppServices'

type Props = {};

export class OrderHistory extends Component<Props> {

  constructor(props){
    super(props);
    // this.splash=this.splash.bind(this);
    this.state = {
      index:0,
      selectedTab: 0,
      orders: [],
      routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#39385a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200',
    },
    headerLeft: (
      <View style={{marginLeft:10}}>
        <TouchableOpacity >
          <Image source={require('../Images/hamp.png')} style={{width:30,height:30}}/>
        </TouchableOpacity>
      </View>
    ),
  }

  // static navigationOptions =  {
  //   headerTitle: 'ORDERS',
  //   headerStyle: {
  //     backgroundColor: '#39385a',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: '200',
  //   },
  //     headerLeft: (
  //       <View style={{marginLeft:10}}>
  //         <TouchableOpacity >
  //           <Image source={require('../Images/back.png')} style={{width:30,height:30}}/>
  //         </TouchableOpacity>
  //       </View>
  //     ),
  //     headerRight: (
  //       <View style={{marginRight:5}}>
  //       <TouchableOpacity>
  //         <Image source={require('../Images/delete.png')} style={{width:30, height:30}} />
  //       </TouchableOpacity>
  //       </View>
  //     )
  //   }

  async componentDidMount(){

      var token ='9bd316e1a9e455efac6a0bd9166779'
      let orders = await Api.getOrders(token);
      // console.log(orders)
      // this.setState({
      //     orders: orders
      // })
  }

    productdetail = () => {
      // Alert.alert("splash");
      this.props.navigation.navigate('ProductDetails')
    }

    renderSeparator = () => (

      <View
        style={{
          backgroundColor: 'gray',
          height: 0.2,
          marginBottom:10
        }}
      />
    );

    renderRowOrders(rowData, sectionID, rowID, highlightRow){
      let list = []
      list.push(
        <ScrollView>
        <View style={styles.grocery}>

          <View style={styles.groceryDet}>
                <Text style={styles.headerName}>Coconut Oil</Text>


          </View>

          <View>
            <Text style={{fontSize:20, color:'#000'}}>AED 15 </Text>
          </View>


        </View>
        </ScrollView>
      );
      return(<View>{list}</View>)
    }



  renderRow(rowData, sectionID, rowID, highlightRow){
    // console.log(rowData)
    let grocery =rowData.item
    let lists = []
    let list= []
    // console.log(grocery.key)

    lists.push(
      <View style={styles.groceryOrder}>

        <View style={styles.plus}>
            <Image source={require('../Images/plus.png')} style={{width:20, height:20}}/>
        </View>
        <View style={styles.groceryDet}>
              <Text style={styles.headerName}>Families Hypermarket</Text>
              <Text style={{fontSize:16,marginBottom:5}}>16/04/2018</Text>
              <Text style={{fontSize:16,}}>Total Amount</Text>
              <Text style={{fontSize:20, color:'#000'}}>AED 15 </Text>
              <Text style={{fontSize:20, color:'green'}}>Success </Text>
        </View>

        <View style={{flexDirection:'column',width:width/3,alignItems:'center',
          justifyContent:'space-around',marginTop:15}}>
            <View style={{width:width/3}}>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={{color:'#fff',fontSize:17}}>DELETE</Text>
              </TouchableOpacity>
            </View>
            <View style={{width:width/3,}}>
              <TouchableOpacity style={styles.reorderButton}>
                <Text style={{color:'#fff',fontSize:17}}>RE-ORDER</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );

    list.push(
      <View style={styles.grocery}>



        <ScrollView>
          <ToggleBox label={lists} style={{backgroundColor: '#fff'}}>
            <View style={{ backgroundColor: '#fff' , }}>
            <View>
              <Text style={{margin:10,fontSize:23,fontWeight:'bold', color:'#000'}}>Products</Text>
            </View>
                <FlatList data={this.state.orders}
                 renderItem={this.renderRowOrders.bind(this)}
                 ItemSeparatorComponent={this.renderSeparator}
               />
            </View>
          </ToggleBox>
        </ScrollView>




      </View>
    );
    return (<View>{list}</View>)
  }


  render() {
    return (
      <View style={styles.container}>


        <View style={{width:width,marginBottom:40}}>

             <FlatList data={this.state.orders}
              renderItem={this.renderRow.bind(this)}
              ItemSeparatorComponent={this.renderSeparator}
            />

        </View>

      </View>
    );
  }
}

export class ScheduleOrder extends Component<Props> {

  constructor(props){
    super(props);
    // this.splash=this.splash.bind(this);
    this.state = {
      show: false,
      index:0,
      selectedTab: 0,
      orders: [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}],
      stores: [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}],
      routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#39385a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200',
    },
    headerLeft: (
      <View style={{marginLeft:10}}>
        <TouchableOpacity >
          <Image source={require('../Images/hamp.png')} style={{width:30,height:30}}/>
        </TouchableOpacity>
      </View>
    ),
  }


  // static navigationOptions =  {
  //   headerTitle: 'ORDERS',
  //   headerStyle: {
  //     backgroundColor: '#39385a',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: '200',
  //   },
  //     headerLeft: (
  //       <View style={{marginLeft:10}}>
  //         <TouchableOpacity >
  //           <Image source={require('../Images/back.png')} style={{width:30,height:30}}/>
  //         </TouchableOpacity>
  //       </View>
  //     ),
  //     headerRight: (
  //       <View style={{marginRight:5}}>
  //       <TouchableOpacity>
  //         <Image source={require('../Images/delete.png')} style={{width:30, height:30}} />
  //       </TouchableOpacity>
  //       </View>
  //     )
  //   }

    renderSeparator = () => (

      <View
        style={{
          backgroundColor: 'gray',
          height: 0.2,
          marginBottom:10
        }}
      />
    );

    show(){
      this.setState({
        show: !this.state.show
      })
    }

    renderRowOrders(rowData, sectionID, rowID, highlightRow){
      let list = []
      list.push(
        <ScrollView>
        <View style={styles.grocery}>
          <View style={styles.groceryDet}>
                <Text style={styles.headerName}>Coconut Oil</Text>

          </View>
          <View>
            <Text style={{fontSize:20, color:'#000'}}>AED 15 </Text>
          </View>


        </View>
        </ScrollView>
      );
      return(<View>{list}</View>)
    }


  renderRow(rowData, sectionID, rowID, highlightRow){
    // console.log(rowData)
    let grocery =rowData.item
    let list = []
    let lists = (

      <View style={{flexDirection:'row'}}>
      <View style={styles.plus}>
          <Image source={require('../Images/plus.png')} style={{width:20, height:20}}/>
      </View>
      <View style={styles.groceryDet}>
            <Text style={styles.headerName}>Families Hyper Market</Text>
            <Text style={{fontSize:16,marginBottom:5}}>16/04/2018</Text>
            <Text style={{fontSize:16,}}>Total Amount</Text>
            <Text style={{fontSize:20, color:'#000'}}>AED 15 </Text>
            <Text style={{fontSize:20, color:'green'}}>Success </Text>
      </View>

      <View style={{flexDirection:'column',width:width/3,alignItems:'center',
        justifyContent:'center',marginTop:15}}>
          <View style={{width:width/3}}>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={{color:'#fff',fontSize:17}}>DELETE</Text>
            </TouchableOpacity>
          </View>

      </View>
      </View>
    )
    // console.log(grocery.key)

    list.push(
      <View style={styles.grocery}>



        <ScrollView>
          <ToggleBox label={lists} style={{backgroundColor: '#fff'}}>
            <View style={{ backgroundColor: '#fff' , }}>
              <View>
                <Text style={{margin:10,fontSize:23,fontWeight:'bold', color:'#000'}}>Products</Text>
              </View>
                <FlatList data={this.state.orders}
                 renderItem={this.renderRowOrders.bind(this)}
                 ItemSeparatorComponent={this.renderSeparator}
               />
            </View>
          </ToggleBox>
        </ScrollView>




      </View>
    );
    return (<View>{list}</View>)
  }


  render() {
    return (
      <View style={styles.container}>


        <View style={{width:width,marginBottom:40}}>

             <FlatList data={this.state.stores}
              renderItem={this.renderRow.bind(this)}
              ItemSeparatorComponent={this.renderSeparator}
            />

        </View>

      </View>
    );
  }
}


export default createMaterialTopTabNavigator({
  ScheduleOrder: {screen: ScheduleOrder,
    navigationOptions: {
      tabBarOptions: {
        tabBarLabel:'Scheduled Order',
        activeTintColor:'#fcbd00',
        inactiveTintColor: '#e6e6e6',
        upperCaseLabel: false,
        labelStyle: {
          fontSize: 18,
          color:'#000',

        },
        tabStyle: {
          // width: 100,
        },
        style: {
          backgroundColor: '#fff',
        },
      }
    }
  },
  OrderHistory: {screen: OrderHistory,
    navigationOptions: {
      tabBarOptions: {
        activeTintColor:'#fcbd00',
        inactiveTintColor: '#e6e6e6',
        tabBarLabel:'Order History',
        upperCaseLabel: false,
        labelStyle: {
          fontSize: 18,
          color:'#000',

        },
        tabStyle: {
          // width: 100,
        },
        style: {
          backgroundColor: '#fff',
        },
      }
    }
  }
},{
  navigationOptions: {
    tabBarOptions: {
    }
  }
})

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
    // margin:20,
    // marginRight:10,
    // backgroundColor:'red',
    width:width,
    justifyContent:'space-around'
  },
  groceryOrder: {
    flex:1,
    flexDirection: 'row',
    // padding:10,
    // margin:20,
    // marginRight:10,
    width:width-50,
    justifyContent:'space-between'
  },
  groceryDet: {
    flexDirection:'column',
    // paddingLeft:5,
    justifyContent:'space-between',
    width:width/2
  },
  deleteButton: {
    backgroundColor:'#262050',
    width:width/3,
    height:35,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
    // borderWidth:1
  },
  reorderButton: {
    backgroundColor:'#fdc82a',
    width:width/3,
    height:35,
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
  plus :{
    alignItems:'center',
    marginTop:5,
    marginRight:5
  }
});
