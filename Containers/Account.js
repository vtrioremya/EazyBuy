/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, FlatList, Text, View, TextInput, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
var {height, width} = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Api from '../Services/AppServices'
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from 'react-native-check-box'
import ModalDropdown from 'react-native-modal-dropdown';
import SwitchToggle from 'react-native-switch-toggle';

type Props = {};

export default class Account extends Component<Props> {

  constructor(props){
    super(props);
    this.state={
      firstname: '',
      lastname: '',
      email : '',
      phone: '',
      profile_pic:'',
      address_1: '',
      address_2 :'',
      address_3 :'',
      postcode:'',
      addressClick:true,
      paymentClick:false,
      settingsClick:false,
      editable: false,
      autoFocus:false,
      radioButton:'value1',
      cardcash: true,
      bg:'#b3b3b3',
      bga:'#262050',
      bgs: '#b3b3b3',
      cards: [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}],
      cardDet: false,
      switchOn1: false
    }
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
        <View>
          <Text>Account</Text>
        </View>
      </View>
    ),

  }

  async componentDidMount(){
    var token ='9bd316e1a9e455efac6a0bd9166779'
    let accountDetails = await Api.getAccount(token);
    // console.log("API account....", accountDetails)
    // console.log("name",accountDetails.firstname)
    this.setState({
      firstname: accountDetails.firstname != null ? accountDetails.firstname: 'First name',
      lastname: accountDetails.lastname!= null ? accountDetails.lastname: 'Last name',
      email : accountDetails.email!= null ? accountDetails.email: 'Your email',
      phone: accountDetails.telephone!= null ? accountDetails.telephone: 'Your telephone',
      profile_pic: accountDetails.profile_image ,
      address_1: accountDetails.address_1,
      address_2: accountDetails.address_2,
      address_3: accountDetails.city,
      postcode: accountDetails.postcode
  })
}

addPhoto(){
  ImagePicker.openPicker({
           compressImageMaxWidth: 640,
           compressImageMaxHeight: 480,
           compressImageQuality: 0.75,
           cropping: true
       }).then(image => {
           // console.log(image);
           let photo = {
               uri: image.path,
               type: 'image/jpeg',
               name: 'photo.jpg',
           };
           this.setState({
               profile_pic_new: image.path,
               profile_pic: image.path,
               url: photo
           })
       });

}

payment(){
  this.setState({
    addressClick:false,
    paymentClick: true,
    settingsClick: false,
    bga: '#b3b3b3',
    bgs: '#b3b3b3',
    bg: '#262050',
    cardcash: true,
    cardDet:false
  })
}

address(){
  this.setState({
    addressClick:true,
    settingsClick:false,
    paymentClick:false,
    bg: '#b3b3b3',
    bgs: '#b3b3b3',
    bga: '#262050'
  })
}

settings(){
  this.setState({
    addressClick:false,
    settingsClick:true,
    paymentClick:false,
    bg: '#b3b3b3',
    bgs: '#262050',
    bga: '#b3b3b3'
  })
}

editProfile(){
  this.setState({
    editable:true,
    autoFocus:true

  })
}
card(){
  this.setState({
    radioButton: 'value2',
    cardcash: false,
    cardDet:true
  })
}
cash(){
  this.setState({
    radioButton: 'value1'
  })
}

onPress1(){
  this.setState({
    switchOn1: !this.state.switchOn1
  })
}

renderRow(rowData, sectionID, rowID, highlightRow){
  let list =[]
  list.push(
    <View style={styles.list}>
        <Image source={require('../Images/catgry-img-9.jpg')} style={{width:50,height:50}}/>
    </View>
  )
  return(<View>{list}</View>);
}


  render() {
    return (
      <KeyboardAwareScrollView>
      <View style={styles.container}>

        <View style={styles.proImage}>

        <View style={styles.Image}>
          <TouchableOpacity onPress={this.addPhoto.bind(this)}>
            <Image source={{uri: this.state.profile_pic}}
            style={{width:150,height:150,borderColor:'#ffb013',borderWidth:1,borderRadius:80}}/>
          </TouchableOpacity>
        </View>

          <View style={styles.textStyle}>
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <TextInput autoFocus={this.state.autoFocus}
                         editable={this.state.editable}
                         style={styles.text}
                         value={this.state.firstname}/>
              <TouchableOpacity style={styles.editButton} onPress={this.editProfile.bind(this)}>
                <Image style={{width:30, height:30}}
                source={require('../Images/edit.png')}/>
              </TouchableOpacity>
            </View>

            <View>
              <TextInput editable={this.state.editable} style={{fontSize:18, color:'#6c6c6c'}} value={this.state.email}/>
            </View>

            <View>
              <TextInput editable={this.state.editable} style={{fontSize:18, color:'#6c6c6c'}} value={this.state.phone}/>
            </View>

          </View>

        </View>

        <View style={styles.delivery} >


          <View >
            <TouchableOpacity style={{alignItems:'center'}}onPress={this.address.bind(this)}>
              <View style={[styles.deliveryAdd,{backgroundColor:this.state.bga}]}>
                <Image source={require('../Images/delv-adres-icon-1.png')}
                style={{width:50, height:50}}/>
              </View>
              <Text style={styles.settingsText}> Delivery </Text>
              <Text style={styles.settingsText}> Address</Text>
            </TouchableOpacity>
          </View>


          <View >
            <TouchableOpacity style={{alignItems:'center'}} onPress={this.payment.bind(this)}>
              <View style={[styles.paymentIcon,{backgroundColor:this.state.bg}]}>
                <Image source={require('../Images/payment-icon-2.png')}
                style={{width:50, height:50}}/>
              </View>
              <Text style={styles.settingsText}>Payment </Text>
              <Text style={styles.settingsText}> Option</Text>
            </TouchableOpacity>
          </View>

          <View >
            <TouchableOpacity style={{alignItems:'center'}} onPress={this.settings.bind(this)}>
              <View style={[styles.settings,{backgroundColor:this.state.bgs}]}>
                <Image source={require('../Images/settings-icon-3.png')}
                style={{width:50, height:50}}/>
              </View>
              <Text style={styles.settingsText}>Settings </Text>
              <Text style={styles.settingsText}> </Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.state.addressClick && <View style={styles.addressTextArea}>

          <View style={styles.line1}>
            <TextInput placeholder='Delivery Address Line 1'
                       placeholderTextColor='#818181'
                       style={styles.lineText}
                       value={this.state.address_1}/>
          </View>

          <View style={styles.line1}>
            <TextInput placeholder='Delivery Address Line 2'
                       placeholderTextColor='#818181'
                       style={styles.lineText}
                       value={this.state.address_2}/>
          </View>

          <View style={styles.line1}>
            <TextInput placeholder='Delivery Address Line 3'
                       placeholderTextColor='#818181'
                       style={styles.lineText}
                       value={this.state.address_3}/>
          </View>

          <View style={styles.postLine}>
            <TextInput placeholder='Post Code'
                       placeholderTextColor='#818181'
                       style={styles.lineText}
                       value={this.state.postcode}/>
          </View>

        </View>}

          {this.state.paymentClick && <View style={styles.addressTextArea}>
          {(this.state.cardcash) && <View>
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={this.cash.bind(this)}
                isChecked={this.state.radioButton === 'value1'}
                leftText={"Cash Payment"}
                leftTextStyle={{fontSize:20, color:'#000'}}
                checkedImage={<Image source={require('../Images/radio-but-chk.png')}
                style={{width: 30, height:30}}/>}
                unCheckedImage={<Image source={require('../Images/radio-but-un-chk.png')}
                 style={{width: 30, height:30}}/>}
              />
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={this.card.bind(this)}
              isChecked={this.state.radioButton === 'value2'}
              leftText={"Card Payment"}
              leftTextStyle={{fontSize:20, color:'#000'}}
              checkedImage={<Image source={require('../Images/radio-but-chk.png')}
              style={{width: 30, height:30}}/>}
              unCheckedImage={<Image source={require('../Images/radio-but-un-chk.png')}
               style={{width: 30, height:30}}/>}
            />
              </View>}

              { this.state.cardDet && <View>

                <View style={{backgroundColor:'#d3d3d3'}}>
                  <Text style={styles.textPay}>We Accept</Text>
                </View>

                <View>
                  <FlatList
                    data={this.state.cards}
                    renderItem={this.renderRow.bind(this)}
                    horizontal={true}
                  />
                </View>

                <View style={{backgroundColor:'#d3d3d3'}}>
                  <Text style={styles.textPay}>Card Number</Text>
                </View>

                <View>
                  <TextInput
                    placeholder='Enter your card number'
                  />
                </View>

                <View style={{backgroundColor:'#d3d3d3'}}>
                  <Text style={styles.textPay}>Card Expiry Date</Text>
                </View>

                <View style={styles.expiryDate}>
                  <ModalDropdown options={['option 1', 'option 2']}
                    style={styles.month}
                    dropdownTextStyle={{fontSize:18}}
                    dropdownStyle={styles.monthDropdown}
                  >

                  <View style={styles.monthText}>
                    <View>
                      <Text style={styles.ratandlocStyle}>MM</Text>
                    </View>

                    <View style={styles.arrow}>
                      <Image source={require('../Images/drop-down-arrow.png')}
                      style={{width:10,height:10}} />
                    </View>

                  </View>
                  </ModalDropdown>

                  <ModalDropdown options={['option 1', 'option 2']}
                    style={styles.month}
                    dropdownTextStyle={{fontSize:18}}
                    dropdownStyle={styles.monthDropdown}
                  >

                  <View style={styles.monthText}>
                    <View>
                      <Text style={styles.ratandlocStyle}>YY</Text>
                    </View>

                    <View style={styles.arrow}>
                      <Image source={require('../Images/drop-down-arrow.png')}
                      style={{width:10,height:10}} />
                    </View>

                  </View>
                  </ModalDropdown>
                </View>

                <View style={{backgroundColor:'#d3d3d3'}}>
                  <Text style={styles.textPay}>CVV Code</Text>
                </View>

                <View>
                  <TextInput
                    placeholder='Enter your cvv code'
                  />
                </View>

                <View style={{alignItems:'center'}}>
                  <TouchableOpacity style={{backgroundColor:'#262050',padding:10, width:100, alignItems:'center'}}>
                    <Text style={{color:'#fff'}}>Pay Now</Text>
                  </TouchableOpacity>
                </View>

              </View>}
        </View>}

          {this.state.settingsClick && <View style={styles.addressTextArea}>



          <View style={styles.line1}>
            <TextInput
              placeholder='Enter your user name'
              style={styles.username}
              style={styles.lineText}
              value={this.state.address_1}
            />
          </View>



          <View style={styles.line1}>
            <TextInput
              placeholder='Enter your password'
              style={styles.password}
              style={styles.lineText}
              value={this.state.address_1}
            />
          </View>



          <View style={styles.line1}>
            <ModalDropdown options={['English', 'Arabic']}
              style={styles.language}
              dropdownTextStyle={{fontSize:18}}
              dropdownStyle={styles.languageDropdown}
            >

            <View style={styles.langText}>
              <View>
                <Text style={{fontSize:18}}>Language</Text>
              </View>

              <View style={styles.arrow}>
                <Image source={require('../Images/drop-down-arrow.png')}
                style={{width:10,height:10}} />
              </View>

            </View>
            </ModalDropdown>
          </View>

          <View style={[styles.notification,{flexDirection:'row', justifyContent:'space-between'}]}>
              <Text style={styles.textPay}> Notification</Text>
              <SwitchToggle
              switchOn={this.state.switchOn1}
              onPress={this.onPress1.bind(this)}
              circleColorOff='#d3d3d3'
              circleColorOn='#232050'
              />
          </View>


        </View>}


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
  },
  proImage:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    // backgroundColor:'red',
    margin:20
  },
  menuItem:{
    padding: 10,
    flexDirection:'row'
  },
  textStyle: {
    // marginTop:10,
    flexDirection:'column',
     justifyContent:'space-around'
  },
  text :{
    fontSize:23,
    color:'#000'
  },
  Image: {
    width: width/2.5
  },
  editButton: {
    width:40,
    alignItems:'center',
    // backgroundColor:'black'
  },
  textSize: {
    fontSize:19,
    marginLeft:10,
    color:'#000'
  },
  delivery: {
    marginTop:30,
    paddingBottom:50,
    flexDirection:'row',
    width:width,
    justifyContent:'space-around',
    alignItems:'center',
  },
  settings :{
    borderColor:'transparent',
    borderWidth:1,
    borderRadius: 50,
    padding:18
  },
  deliveryAdd: {
    borderColor:'transparent',
    borderWidth:1,
    borderRadius: 50,
    padding:18
  },
  paymentIcon: {
    borderColor:'transparent',
    borderWidth:1,
    borderRadius: 50,
    padding:18
  },
  settingsText: {
    fontSize:20,
    color:'#000',
  },
  addressTextArea: {
    justifyContent:'space-around',
    margin:20
  },
  line1: {
    borderWidth:1,
    borderColor:'#cccccc',
    borderRadius:10, marginBottom:10
  },
  lineText: {
    marginLeft:10,
    fontSize:19,
    color:'#818181'
  },
  postLine: {
    width:width/2,
    borderWidth:1,
    borderColor:'#cccccc',
    borderRadius:10, marginBottom:10
  },
  list: {
    flexDirection:'column',
    width:40,
    alignItems:'center',
    padding:50,
    justifyContent:'space-around'
  },
  ratandlocStyle: {
    margin:5,
    fontSize:17,
    color:'#000'
  },
  expiryDate :{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    padding:5
  },
  month: {
    borderColor:'gray',
    borderWidth:0.5,
    height:30,
    borderRadius:5
  },
  monthDropdown: {
    borderColor:'gray',
    borderWidth:1,
    borderRadius:5,
    width:90
  },
  monthText: {
    width:70,
    marginLeft:5,
    marginRight:5,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  arrow: {
    width:30,
    height:30,
    alignItems:'center'
  },
  textPay: {
    marginLeft:10,
    fontSize:19,
  },
  language: {
    padding:10


  },
  languageDropdown: {
    borderColor:'gray',
    borderWidth:1,
    borderRadius:5,
    width:width -50
  },
  langText: {
    // width:70,
    marginLeft:5,
    marginRight:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  username: {
    fontSize: 18,
    color:'black',
    borderColor:'gray',
    borderWidth:1,
    borderRadius:5,
  },
  name: {
    backgroundColor:'#d3d3d3',
  },
  password: {
    borderColor:'gray',
    borderWidth:1,
    borderRadius:5,
  },
  notification: {
    borderWidth:1,
    padding:10,
    borderColor:'#cccccc',
    borderRadius:10, marginBottom:10,
    backgroundColor:'#d3d3d3',marginTop:10
  }

});
