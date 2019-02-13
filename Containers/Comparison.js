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

type Props = {};

export default class Comparison extends Component<Props> {

  constructor(props){
    super(props);

    this.state = {
      products: [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}],
    };
  }

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
    headerTitle: 'PRODUCT COMPARISON',
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
  }
}

  componentDidMount(){
    this.props.navigation.setParams({
      backbutton: this.backbutton.bind(this),
    });
  }

  backbutton(){
    this.props.navigation.dispatch({
             type: NavigationActions.NAVIGATE,
             routeName: 'ProductList',
             action: {
               type: NavigationActions.RESET,
               index: 0,
               actions: [{type: NavigationActions.NAVIGATE, routeName: 'ProductCategory'}]
             }
           })
  }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    let list =[]
    list.push(
      <View style={styles.list}>
        <View>
          <Image source={require('../Images/catgry-img-9.jpg')} style={{width:width/2,height:height/4}}/>
        </View>

        <Text style={styles.itemName}>Grocery name</Text>
        <Text style={styles.price}>AED 20</Text>
      </View>
    )
    return(<View>{list}</View>);
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={{fontSize:20, color:'#000'}}>Item : Item Name</Text>
        </View>
        <View>
          <FlatList
            data={this.state.products}
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
    padding:50,
    justifyContent:'space-around'
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
