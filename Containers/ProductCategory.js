/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import {Platform, StyleSheet, Text, View, FlatList, Alert, Image, Dimensions, TextInput, TouchableOpacity} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions, createStackNavigator } from 'react-navigation'
import Api from '../Services/AppServices'

type Props = {};
export default class ProductCategory extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      category: [],
      bannerImage: [],
      catName:''
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#39385a',
    },
    headerLeft: (
      <View style={{flex:1,flexDirection: 'row'}}>

        <View style={{width: 50, height: 50, justifyContent:'center'}}>
          <TouchableOpacity >
            <Image source={require('../Images/hamp.png')}
            style={{marginLeft:10,width:25,height:25}}/>
          </TouchableOpacity>
        </View>

        <View style={{width: width/1.2, height: 50, flexDirection:'row'}}>

          <View style={{width: 21, height: 50,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../Images/map-1.png')} style={{width:21,height:30}}/>
          </View>

          <View style={{width: width/2, height: 50, flexDirection:'row'}} >
            <TextInput placeholder='Sample Address, Address Feild 1, Feild 2'
            placeholderTextColor= '#fff'
            style={{width:width/1.5, fontSize:18, color:'#fff'}}/>
            <TouchableOpacity style={{width:20, height:50, justifyContent:'center', alignItems:'center'}}>
              <Image source={require('../Images/drop-down-arrow.png')} style={{width:12, height:12}}/>
            </TouchableOpacity>
          </View>

        </View>

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

  async componentDidMount(){

    let fetchApiLogin = await Api.getCategory();
    // console.log("CATEGORY....", fetchApiLogin)

        this.setState({
          category: fetchApiLogin,
        })

        var formData = new FormData();
        formData.append('store_id', 44);
        // formData.append('store_id', this.props.navigation.state.params.storeId);

        let fetchBanner = await Api.getCommonOffer(formData);
        // console.log("API offers....", fetchBanner)


        let i = 0
         var image= []
         for(i of fetchBanner.offer_list){
           image.push(i.image)
         }
         // console.log("image push", image)
         this.setState({
           bannerImage: image
         })
         // console.log(this.state.bannerImage)

  }

  login(){
    this.props.navigation.navigate('HomeScreen');
  }

  productlist(catId, catName) {
    // console.log("catId",catId)
    // Alert.alert("splash");
    this.props.navigation.navigate('ProductList', {catId:catId, catName: catName})
  }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    // console.log("render", rowData)
    let list = []
    let i = 0
    let cat = rowData.item
    list.push(

      <View style={{width:width/3,height:height/6,alignItems:'center', marginTop:10, marginBottom:10}}>
        <TouchableOpacity style={{width:width/3,height:height/6,
          alignItems:'center', marginTop:10, marginBottom:10}}
          onPress={this.productlist.bind(this, cat.category_id, cat.name)}>
          <Image source={{uri: cat.image}}
          style={{width: width/3.8, height:80}}/>
          <Text style={{width:100, textAlign:'center', fontSize:18,
          color:'#000'}}>{cat.name}</Text>
        </TouchableOpacity>
      </View>
    );

    return (<View>{list}</View>)
  }

  renderSeparator = () => (

    <View
      style={{
        backgroundColor: 'gray',
        height: 0.2,
        // margin:20
      }}
    />
  );



  render() {
    // console.log("store id",this.props.navigation.state.params.storeId)
    return (
      <View style={styles.container}>

      <View style={styles.searchView}>

        <View style={{width:'15%', alignItems:'center', }}>
          <Image source={require('../Images/footer-icon-3.png')} style={{width:20, height:20, justifyContent:'flex-start'}}/>
        </View>

        <View style={{width:'70%', alignItems:'center' }}>
          <TextInput
            placeholder='Search for Products'
            placeholderTextColor='#ababab'
            style={styles.textStyle}
          />
        </View>

      </View>

      <View style={{width:width,height:height/4.7}}>
        <Swiper style={{width:width,height:height/4.7}}
                dotColor='#cfc8c1'
                activeDotColor='#ffb013'>

          <View>
            <Image  source={{uri: this.state.bannerImage[0]}} style={{width:width,height:150}}/>
          </View>
          <View>
            <Image  source={require('../Images/banner.jpg')} style={{width:width,height:150}}/>
          </View>
          <View>
            <Image  source={require('../Images/banner.jpg')} style={{width:width,height:150}}/>
          </View>
          <View>
            <Image  source={require('../Images/banner.jpg')} style={{width:width,height:150}}/>
          </View>
          <View>
            <Image  source={require('../Images/banner.jpg')} style={{width:width,height:150}}/>
          </View>
          <View>
            <Image  source={require('../Images/banner.jpg')} style={{width:width,height:150}}/>
          </View>
        </Swiper>
      </View>



        <FlatList
          data={this.state.category}
          renderItem={this._renderRow.bind(this)}
          contentContainerStyle={{ width:width}}
          numColumns={3}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor= {(item, index) => item.id}
        />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    // flexDirection:'column'
  },
  textStyle: {
    color:'#ababab',
    fontSize:18
  },
  textInputStyle : {
    width:width -100,
    fontSize:20,
    margin:10
  },
  searchView: {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:5,
    marginRight:5,
    backgroundColor:'rgba(253,253,253,0.8)',
    width:width,
    height:60
  },
});
