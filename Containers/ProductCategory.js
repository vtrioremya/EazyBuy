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
import Fonts from '../Themes/Fonts'
import Loader from '../Components/Loader'

type Props = {};
export default class ProductCategory extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      category: [],
      deleteLoader:true,
      bannerImage: [],
      catName:''
    };
  }

//   static navigationOptions = ({ navigation }) => {
//       const { params = {} } = navigation.state;
//       return {
//     headerStyle: {
//       backgroundColor: '#39385a',
//     },
//     headerLeft: (
//       <View style={{flex:1,flexDirection: 'row'}}>
//
//         <View style={{width: 50, height: 50, justifyContent:'center'}}>
//           <TouchableOpacity >
//             <Image source={require('../Images/hamp.png')}
//             style={{marginLeft:10,width:25,height:25}}/>
//           </TouchableOpacity>
//         </View>
//
//         <View style={{width: width/1.2, height: 50, flexDirection:'row'}}>
//
//           <View style={{width: 21, height: 50,alignItems:'center',justifyContent:'center'}}>
//             <Image source={require('../Images/map-1.png')} style={{width:21,height:30}}/>
//           </View>
//
//           <View style={{width: width/2, height: 50, flexDirection:'row'}} >
//             <TextInput placeholder='Sample Address, Address Feild 1, Feild 2'
//             placeholderTextColor= '#fff'
//             style={{width:width/1.5, fontSize:12, color:'#fff'}}/>
//             <TouchableOpacity style={{width:20, height:50, justifyContent:'center', alignItems:'center'}}>
//               <Image source={require('../Images/drop-down-arrow.png')} style={{width:12, height:12}}/>
//             </TouchableOpacity>
//           </View>
//
//         </View>
//
//       </View>
//     ),
//     headerRight: (
//       <View style={{marginRight:5}}>
//       <TouchableOpacity onPress={()=> params.cartButton()}>
//         <Image source={require('../Images/cart.png')} style={{width:30, height:30}} />
//       </TouchableOpacity>
//       </View>
//     )
//   }
// }

  async componentDidMount(){

    let fetchApiLogin = await Api.getCategory();

console.log(fetchApiLogin)
        this.setState({
          category: fetchApiLogin,
          deleteLoader:false,
        })

        var formData = new FormData();
        // formData.append('store_id', 44);
        let storeId = this.props.navigation.state.params.storeId;

        let fetchBanner = await Api.getPromotionsSlide(storeId);



 console.log(fetchBanner)
         this.setState({
           bannerImage: fetchBanner.slider
         })

         this.props.navigation.setParams({
             cartButton: this.cartButton.bind(this),
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

  login(){
    this.props.navigation.navigate('HomeScreen');
  }

  productlist(catId, catName) {

    // Alert.alert("splash");
    this.props.navigation.navigate('ProductList', {catId:catId, catName: catName, storeId:this.props.navigation.state.params.storeId})
  }

  _renderRow(rowData, sectionID, rowID, highlightRow){

    let list = []
    let i = 0
    let cat = rowData.item
    console.log(cat.name)
    var catname = cat.name.toString()
    list.push(

      <View style={{width:width/3,height:height/6,alignItems:'center', marginTop:5, marginBottom:5}}>
        <TouchableOpacity style={{width:width/3,height:height/6,
          alignItems:'center', }}
          onPress={this.productlist.bind(this, cat.category_id, cat.name)}>
            <Image source={{uri: cat.image}}
            style={{width: width/3.8, height:80}}/>
            <Text numberOfLines={2} style={{width:100, marginTop:5, textAlign:'center', fontSize:Fonts.verySmall,fontFamily:Fonts.base,
            color:'#000'}}>{catname}</Text>
        </TouchableOpacity>
      </View>
    );

    return (<View>{list}</View>)
  }





  render() {

    return (
      <View style={styles.container}>
      <Loader
        loading={this.state.deleteLoader} />

      <View style={styles.searchView}>

        <View style={{width:'15%', alignItems:'center', }}>
          <Image source={require('../Images/footer-icon-3.png')} style={{width:20, height:20, justifyContent:'flex-start'}}/>
        </View>

        <View style={{width:'70%', alignItems:'center' }}>
          <TextInput
            placeholder='Search for Products/categories'
            placeholderTextColor='#ababab'
            style={styles.textStyle}
          />
        </View>

      </View>

      <View style={{width:width,height:height/4.7}}>
        <Swiper style={{width:width,height:height/4.7}}
                dotColor='#cfc8c1'
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



        <FlatList
          data={this.state.category}
          renderItem={this._renderRow.bind(this)}
          contentContainerStyle={{ width:width}}
          numColumns={3}
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
    fontSize:Fonts.small,
    fontFamily:Fonts.base
  },
  textInputStyle : {
    width:width -100,
    fontSize:15,
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
