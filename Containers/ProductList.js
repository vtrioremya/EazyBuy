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

type Props = {};

export default class ProductList extends Component<Props> {

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

  static navigationOptions =  {
    headerTitle: 'GROCERY & STAPLES',
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



  renderRow(rowData, sectionID, rowID, highlightRow){
    console.log(rowData)
    let grocery =rowData.item
    let list = []
    console.log(grocery.key)

    list.push(
      <View style={styles.grocery}>
        <View style={{ justifyContent:'center'}}>
          <Image source={require('../Images/product-1.jpg')}
          style={{width:100,height:80 ,borderRadius:10}} />
          <Image source={require('../Images/fav.png')}
          style={{width:20,height:20,position:'absolute',top:0}} />
        </View>

        <View style={styles.groceryDet}>
          <View>
            <View style={{flexDirection:'row', justifyContent:'space-between',}}>
              <Text style={styles.headerName}>Coconut Oil</Text>
              <Text style={{color:'#000', fontSize:15}}>Compare Price</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16, color:'#000'}}>AED 15 </Text>
              <Text style={{fontSize:16,}}>(17% Off)</Text>
            </View>
          </View>

          <View style={{flexDirection:'row',width:width/1.8,alignItems:'center', justifyContent:'space-between',marginTop:15}}>


                <ModalDropdown options={['option 1', 'option 2']}
                  style={{borderColor:'gray', borderWidth:0.5,height:30,borderRadius:5 }}
                  dropdownStyle={{borderColor:'gray', borderWidth:1, borderRadius:5, width:50}}
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

                <TouchableOpacity style={{width:40, alignItems:'center',justifyContent:'center'}}>
                  <Image source={require('../Images/minus.png')}
                    style={{width:15,height:15}} />
                </TouchableOpacity>

                <View style={{alignItems:'center',width:30, borderColor:'gray', borderWidth:0.5, borderRadius:5}}>
                  <Text style={styles.ratandlocStyle}>0</Text>
                </View>

                <TouchableOpacity style={{width:40,  alignItems:'center',justifyContent:'center'}}>
                  <Image source={require('../Images/plus.png')}
                    style={{width:15,height:15}} />
                </TouchableOpacity>

            </View>

            <View style={{width:50}}>
              <TouchableOpacity style={styles.openNowButton}>
                <Text style={{color:'#fff',fontSize:17}}>ADD</Text>
              </TouchableOpacity>
            </View>


          </View>

        </View>
      </View>
    );
    return (<View>{list}</View>)
  }


  render() {
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
            items={['All Items', 'Salt & Sugar', 'Atta & Other Flours']}
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
