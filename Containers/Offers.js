/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation'
import Api from '../Services/AppServices'

type Props = {};

export default class Offers extends Component<Props> {

  constructor(props){
    super(props);

    this.state = {
      offers: [],
    };
  }

  // static navigationOptions = {
  //   headerTitle: 'OFFERS',
  //   headerStyle: {
  //     backgroundColor: '#39385a',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: '200',
  //   },
  //   headerLeft: (
  //     <View style={{marginLeft:10}}>
  //       <TouchableOpacity>
  //         <Image source={require('../Images/hamp.png')} style={{width:30,height:30}}/>
  //       </TouchableOpacity>
  //     </View>
  //   ),
  // }

  async componentDidMount(){

    var formData = new FormData();

    let offers = await Api.getCommonOffer(formData);
    console.log("offers",offers)

    this.setState({
      offers: offers.offer_list
    })
  }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    let price= Math.round(rowData.item.price)
    let special_price = Math.round(rowData.item.special_price)
    let per = Math.floor(rowData.item.offer_percentage * 100) / 100
    let list =[]
    list.push(
      <View style={styles.list}>
        <View>
          <Image source={{uri: rowData.item.image}} style={{width:width/2,height:height/4}}/>
        </View>

        <Text style={[styles.itemName,{fontWeight:'bold'}]}>{rowData.item.grocery_name}</Text>
        <Text style={styles.itemName}>{rowData.item.name}  </Text>
        <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>

          <Text style={styles.itemName}>₹{special_price}  </Text>
          <Text style={{textDecorationLine: 'line-through',color:'#000'}}>{price}  </Text>
          <Text style={{color:'green'}}> {per}% off </Text>
        </View>

      </View>
    )
    return(<View>{list}</View>);
  }



  render() {
    return (
      <View style={styles.container}>

        <View>
          <FlatList
            data={this.state.offers}
            renderItem={this._renderRow.bind(this)}
            contentContainerStyle={{ width:width}}
            numColumns={2}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-around',
    // alignItems: 'center',

    backgroundColor: '#fff',
    flexDirection: 'column',

  },
  head: {
    margin:10
  },
  list: {
    flexDirection:'column',
    width:width/2,
    alignItems:'center',
    justifyContent:'space-around',
  },
  price: {
    fontSize: 20,
    color: '#fff',
    backgroundColor:'#262050',
    padding:10,
    borderWidth:1,
    borderColor:'transparent',
    borderRadius: 20
  },
  itemName: {
    fontSize: 20,
    color: '#000',

  }

});
