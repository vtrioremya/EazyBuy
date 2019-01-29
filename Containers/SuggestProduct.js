/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Platform, TextInput, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert} from 'react-native';
var {height, width} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation'
import Api from '../Services/AppServices'
import ModalDropdown from 'react-native-modal-dropdown';

type Props = {};

export default class SuggestProduct extends Component<Props> {

  constructor(props){
    super(props);
    this.splash=this.splash.bind(this);
    this.state = {
      description:'',
      category: [],
      cat:[],
      defaultValue: 'Category',
      catId:[],
      categoryId:''
    };
  }

  // static navigationOptions = {
  //   headerTitle: 'SUGGEST A PRODUCT',
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
    let cat = await Api.getCategory();


        this.setState({
          cat: cat,
        })

        var catName=[]
        var catId=[]
        this.state.cat.map((name) =>{
          catName.push(name.name)
          catId.push(name.category_id)
      })
      this.setState({
        category: catName,
        catId:catId
      })



  }

_dropdownList(index,value){

  this.setState({
    defaultValue: value,
    categoryId: this.state.catId[index].category_id
  })
  }

  async send(){

    if(!this.state.description){
      Alert.alert("Description can't be blank")
      return;
    }

    var formData = new FormData();
    formData.append('token', '9bd316e1a9e455efac6a0bd9166779');
    formData.append('category_id', this.state.categoryId);
    formData.append('product', this.state.description);

    let suggest = await Api.suggest(formData);
    // console.log("suggest",suggest)

      Alert.alert(suggest.message)
      this.props.navigation.navigate('HomeScreen')
  }

  splash = () => {
    // Alert.alert("splash");
    this.props.navigation.navigate('Swipers')
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View >
        <View style={{width:width, alignItems:'center'}}>
          <Image source={require('../Images/logo-splash.png')} style={{width: 100, height: 100}}/>
        </View>
        <View style={{alignItems:'center'}}>
          <TextInput placeholder='Enter a Product Name'
                     style={styles.feedback}
                     value={this.state.description}
                     onChangeText={(description) => this.setState({description})}
                     />

        <ModalDropdown options={this.state.category}
                      onSelect={(idx, value) => this._dropdownList(idx, value)}
                       style={{borderWidth:1,
                       borderRadius:10,height:50,width:width/1.2,
                       borderColor:'transparent',
                       backgroundColor:'#d8d8d8',marginTop:10,width:width/1.2 }}
                       dropdownTextStyle={{fontSize:18}}
                       dropdownStyle={{width:width/1.2,borderColor:'gray', borderWidth:1, borderRadius:5, }}
                     >

          <View style={{alignItems:'center', width:width/1.2,marginLeft:5,marginRight:5,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{alignItems:'center',justifyContent:'space-between'}}>
              <Text>{this.state.defaultValue}</Text>
            </View>

            <View style={{width:30,height:30, alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../Images/drop-down-arrow.png')}
                         style={{width:10,height:10}} />
          </View>

        </View>
        </ModalDropdown>
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
          <TouchableOpacity style={styles.send} onPress={this.send.bind(this)}>
            <Text style={styles.sendText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  send: {
    backgroundColor: '#271f51',
    justifyContent:'center',
    padding:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'transparent',
    width:width/2
  },
  sendText: {
    color: '#fff',
    fontSize: 20,
    textAlign:'center',
  },
  feedback: {
    borderWidth:1,
    borderRadius:10,
    borderColor:'transparent',
    // justifyContent:'center',
    backgroundColor:'#d8d8d8',
    width:width/1.2,
    textAlignVertical: "top"
  }
});
