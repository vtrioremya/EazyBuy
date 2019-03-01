/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,ScrollView, ToastAndroid,KeyboardAvoidingView, AsyncStorage,Alert, FlatList, Text, View, TextInput, StyleSheet,
  Image, Dimensions, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
var {height, width} = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Api from '../Services/AppServices'
import {getToken, uploadPhoto} from '../Services/lib'
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from 'react-native-check-box'
import ModalDropdown from 'react-native-modal-dropdown';
import SwitchToggle from 'react-native-switch-toggle';
import PasswordInputText from 'react-native-hide-show-password-input';
import Loader from '../Components/Loader'
import Fonts from '../Themes/Fonts'

type Props = {};

export default class Account extends Component<Props> {

  constructor(props){
    super(props);
    // this.uploadPhoto=this.uploadPhoto.bind(this)
    this.state={
      firstname: 'Your name',
      lastname: '',
      email : 'Your email',
      phone: 'Your Phone',
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
      switchOn1: false,
      value:'Language',
      month:'MM',
      year:'YY',
      loader:true,
      token:null,
      allSave:false,
      cardNo:'',
      keyboardSet: -195
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


componentWillMount(){
  console.log("will")
}

   componentDidMount(){
     console.log("did")
      this.retrieveCurrentUser();
    // if(this.props.navigation.state.params.settings == 'yes'){
    //   this.setState({
    //     loader:false,
    //     addressClick:false,
    //     settingsClick:true,
    //     paymentClick:false,
    //     bg: '#b3b3b3',
    //     bgs: '#262050',
    //     bga: '#b3b3b3'
    //   })
    // }
    // else{
    //   this.setState({
    //     loader:false,
    //     addressClick:true,
    //     settingsClick:false,
    //     paymentClick:false,
    //     bg: '#b3b3b3',
    //     bgs: '#b3b3b3',
    //     bga: '#262050'
    //   })
    // }

}
async retrieveCurrentUser(token){

    try{
      // Alert.alert("hai")
      // console.log('hai')
      let token = await getToken()
      this.setState({
        token: token
      })
      let accountDetails = await Api.getAccount(token);
      let list = await Api.listAddress(token);
      // console.log("account",accountDetails)
      let lists =list.address

      this.setState({
        loader:false,
        firstname: accountDetails.firstname != null ? accountDetails.firstname: 'First name',
        lastname: accountDetails.lastname!= null ? accountDetails.lastname: 'Last name',
        email : accountDetails.email!= null ? accountDetails.email: 'Your email',
        phone: accountDetails.telephone!= null ? accountDetails.telephone: 'Your telephone',
        profile_pic: accountDetails.profile_image != null ? accountDetails.profile_image: '',
        address_1: lists[0].address_1,
        address_2: lists[0].address_2,
        address_3: lists[0].city,
        postcode: lists[0].postcode,
        addressId: lists[0].address_id
    })
  }
  catch(err){
    console.log(err)
    this.setState({loader:false})
    this.props.navigation.navigate('Login')

  }
}

 // shouldComponentUpdate(nextProps, nextState, nextContext){
 //   return true;
 // }

 componentWillReceiveProps(nextProps) {
   console.log("recevie")
   if (nextProps.navigation.state.params.token) {
     this.retrieveCurrentUser(this.props.navigation.state.params.token);
   }
 }

  async saveAll(){
    console.log("save address click")
    var formData = new FormData();
    formData.append('token', '9bd316e1a9e455efac6a0bd9166779');
    formData.append('address_1', this.state.address_1);
    formData.append('address_2', this.state.address_2);
    formData.append('city', this.state.address_3);
    formData.append('country_id', '');
    formData.append('zone_id', '');
    formData.append('postcode', this.state.postcode);
    formData.append('address_tag', '');
    console.log(formData)
    let addressApi = await Api.saveAddress(formData);
    console.log("response address",addressApi)

     ToastAndroid.show(addressApi.message, ToastAndroid.SHORT);

      let token = await getToken()
      let accountDetails = await Api.getAccount(token);

      this.setState({
        firstname: accountDetails.firstname != null ? accountDetails.firstname: 'First name',
        lastname: accountDetails.lastname!= null ? accountDetails.lastname: 'Last name',
        email : accountDetails.email!= null ? accountDetails.email: 'Your email',
        phone: accountDetails.telephone!= null ? accountDetails.telephone: 'Your telephone',
        profile_pic: accountDetails.profile_image != null ? accountDetails.profile_image: '',
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
           cropping: true,
           includeBase64:true
       }).then(async(image) => {
           console.log(image);
           let photo = {
               uri: image.path,
               type: 'image/jpeg',
               name: 'photo.jpg',
               data: image.data
           };
           console.log(image.data)

           let token = await getToken()
           var formData = new FormData()
           formData.append('file',image.data)
           formData.append('token',token)


           let imageUpload = await Api.uploadPhoto(formData)
           // console.log("uploaded", imageUpload)

            // this.retrieveCurrentUser()

             ToastAndroid.show(imageUpload.message, ToastAndroid.SHORT);
             // this.setState({
             //   profile_pic_new: image.path,
             //   profile_pic: image.path,
             //   url: photo,
             // })

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
    autoFocus:true,
    allSave: true,
    keyboardSet:-155

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
  // this.props.navigation.navigate('Checkout')
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

_dropdownListMonth(id, value){
  // console.log(value)
  // console.log(id)
  this.setState({
    month: value
  })
}

_dropdownListYear(id, value){
  // console.log(value)
  // console.log(id)
  this.setState({
    year: value
  })
}

  render() {
    return (

        <KeyboardAvoidingView behavior={'padding'} style={{flex:1}}
        keyboardVerticalOffset={this.state.keyboardSet} >
          <ScrollView>
            <View style={styles.container}>

            <Loader
              loading={this.state.loader} />

              <View style={styles.proImage}>

                <View style={styles.Image}>
                  <TouchableOpacity onPress={this.addPhoto}>
                    { (this.state.profile_pic) ?
                      <Image source={{uri: this.state.profile_pic}}
                    style={{width:width/3.5,height:height/6,borderColor:'#ffb013',
                    borderWidth:1,borderRadius:80}}/>
                    :
                    <Image source={require('../Images/blank_profile_pic.png')}
                    style={{width:width/3.5,height:height/6,borderColor:'#ffb013',
                    borderWidth:1,borderRadius:80}}/>
                  }
                  </TouchableOpacity>
                </View>

                <View style={styles.textStyle}>
                  <View style={{flexDirection:'row', width:width/2.2}}>
                    <TextInput autoFocus={this.state.autoFocus}
                          maxLength={10}
                          editable={this.state.editable}
                          style={styles.text}
                          autoCapitalize='words'
                          value={this.state.firstname}
                          onChangeText={(firstname) => this.setState({firstname})}/>
                    <TouchableOpacity style={styles.editButton} onPress={this.editProfile.bind(this)}>
                      <Image style={{width:30, height:30}}
                      source={require('../Images/edit.png')}/>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TextInput
                      onChangeText={(email) => this.setState({email})}
                      editable={this.state.editable}
                      style={{fontSize:Fonts.nextRegular,fontFamily: Fonts.base, color:'#6c6c6c',
                      width:width/2.2}}
                      value={this.state.email}/>
                  </View>

                  <View>
                    <TextInput
                    onChangeText={(phone) => this.setState({phone})}
                    keyboardType='numeric'
                    maxLength={12}
                    editable={this.state.editable} style={{fontFamily: Fonts.base,fontSize:Fonts.nextRegular, color:'#6c6c6c', width:width/2.5}}
                    value={this.state.phone}/>
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
                             onChangeText={(address_1) => this.setState({address_1})}
                             value={this.state.address_1}/>
                </View>

                <View style={styles.line1}>
                  <TextInput placeholder='Delivery Address Line 2'
                             placeholderTextColor='#818181'
                             style={styles.lineText}
                             onChangeText={(address_2) => this.setState({address_2})}
                             value={this.state.address_2}/>
                </View>

                <View style={styles.line1}>
                  <TextInput placeholder='Delivery Address Line 3'
                             placeholderTextColor='#818181'
                             style={styles.lineText}
                             onChangeText={(address_3) => this.setState({address_3})}
                             value={this.state.address_3}/>
                </View>

                <View style={styles.postLine}>
                  <TextInput placeholder='Post Code'
                             placeholderTextColor='#818181'
                             style={styles.lineText}
                             onChangeText={(postcode) => this.setState({postcode})}
                             value={this.state.postcode}/>
                </View>
                 <View style={{ height: 60 }} />
              </View>}

                {this.state.paymentClick && <View style={styles.addressTextArea}>
                {(this.state.cardcash) && <View>

                  <CheckBox
                      style={{flex: 1, padding: 10}}
                      onClick={this.cash.bind(this)}
                      isChecked={this.state.radioButton === 'value1'}
                      leftText={"Cash Payment"}
                      leftTextStyle={{fontSize:Fonts.nextRegular,fontFamily: Fonts.base, color:'#000'}}
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
                    leftTextStyle={{fontSize:Fonts.nextRegular, fontFamily: Fonts.base,color:'#000'}}
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
                          style={{fontFamily: Fonts.base}}
                          value={this.state.cardNo}
                        />
                      </View>

                      <View style={{backgroundColor:'#d3d3d3'}}>
                        <Text style={styles.textPay}>Card Expiry Date</Text>
                      </View>

                      <View style={styles.expiryDate}>
                        <ModalDropdown options={['1(JAN)','2(FEB)','3(MAR)','4(APR)','5(MAY)','6(JUN)','7(JUL)','8(AUG)','9(SEPT)','10(OCT)','11(NOV)','12(DEC)']}
                          style={styles.month}
                          dropdownTextStyle={{fontSize:Fonts.nextRegular}}
                          dropdownStyle={styles.monthDropdown}
                        >

                        <View style={styles.monthText}>
                          <View>
                            <Text style={styles.ratandlocStyle}>{this.state.month}</Text>
                          </View>

                          <View style={styles.arrow}>
                            <Image source={require('../Images/drop-down-arrow.png')}
                            style={{width:10,height:10}} />
                          </View>

                        </View>
                        </ModalDropdown>

                        <ModalDropdown options={['2019', '2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030',
                        '2031','2032','2033','2034','2035','2036','2037','2038','2039','2040','2041','2042','2043','2044',
                        '2045','2046','2047','2048','2049']}
                          style={styles.month}
                          dropdownTextStyle={{fontSize:18}}
                          dropdownStyle={styles.monthDropdown}
                          onSelect={(idx, value) => this._dropdownList(idx, value)}
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
                          style={{fontFamily:Fonts.base}}
                        />
                      </View>

                      <View style={{alignItems:'center'}}>
                        <TouchableOpacity style={{backgroundColor:'#262050',padding:10, width:100, alignItems:'center'}}>
                          <Text style={{color:'#fff',fontFamily:Fonts.base}}>Pay Now</Text>
                        </TouchableOpacity>
                      </View>

                    </View>}
              </View>}

                {this.state.settingsClick && <View style={styles.addressTextArea}>

                <View style={{backgroundColor:'#d3d3d3'}}>
                  <Text style={styles.textPay}>User Name</Text>
                </View>

                <View>
                  <TextInput
                    placeholder='Your email'
                    style={{fontFamily:Fonts.base}}
                    value = {this.state.email}
                  />
                </View>

                <View style={{backgroundColor:'#d3d3d3'}}>
                  <Text style={styles.textPay}>Password</Text>
                </View>

                <View style={{marginLeft:10,marginRight:10}}>
                  <PasswordInputText
                    style={{fontFamily:Fonts.base}}
                    placeholder='Your password'
                    value={this.state.password}
                  />
                </View>

                <View style={{backgroundColor:'#d3d3d3'}}>
                  <Text style={styles.textPay}>Language</Text>
                </View>

                <View style={styles.languageBar}>
                  <ModalDropdown options={['English', 'Arabic']}
                    style={styles.language}
                    defaultValue={this.state.value}
                    onSelect={(idx, value) => this.setState({value: value})}
                    dropdownTextStyle={{fontSize:Fonts.nextRegular,fontFamily:Fonts.base}}
                    dropdownStyle={styles.languageDropdown}
                  >

                  <View style={styles.langText}>
                    <View>
                      <Text style={{fontSize:Fonts.regular,fontFamily:Fonts.base}}>{this.state.value}</Text>
                    </View>

                    <View style={styles.arrow}>
                      <Image source={require('../Images/drop-down-arrow.png')}
                      style={{width:10,height:10}} />
                    </View>

                  </View>
                  </ModalDropdown>
                </View>

                <View style={{backgroundColor:'#d3d3d3'}}>
                  <Text style={styles.textPay}>Notification</Text>
                </View>

                <View style={[styles.notification,{flexDirection:'row', justifyContent:'space-between'}]}>
                    { this.state.switchOn1 ? <Text style={styles.textPay}> On</Text>:
                    <Text style={styles.textPay}> Off</Text>}
                    <SwitchToggle
                    switchOn={this.state.switchOn1}
                    onPress={this.onPress1.bind(this)}
                    circleColorOff='#202000'
                    circleColorOn='#232050'
                    />
                </View>




              </View>}


              <View style={{height:40}}/>

            </View>
            </ScrollView>
            {this.state.allSave && <View style={{flexDirection:'row',height:50,bottom:0, position:'absolute'}}>
              <TouchableOpacity style={{backgroundColor:
              '#262050',width:width/2, alignItems:'center',justifyContent:'center'}} onPress={this.saveAll.bind(this)}>
                <Text style={{color:'#fff'}}>Save all</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{backgroundColor:'gray',width:width/2, alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#fff'}}>Cancel All</Text>
              </TouchableOpacity>

            </View>}
          </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    // height:height,
  },
  proImage:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    // backgroundColor:'red',
    marginTop:10
  },
  menuItem:{
    padding: 10,
    flexDirection:'row'
  },
  textStyle: {
    // marginTop:10,
    flexDirection:'column',
    // backgroundColor:'red'
     // justifyContent:'space-around'
  },
  text :{
    fontSize:Fonts.input,
    fontFamily: Fonts.base,
    color:'#000',

  },
  Image: {
    width: width/3,
    // backgroundColor:'red',
    alignItems:'center',justifyContent:'center'
  },
  editButton: {
    width:40,
    alignItems:'center',
    top:10
    // backgroundColor:'black'
  },
  textSize: {
    fontSize:Fonts.input,
    fontFamily: Fonts.base,
    marginLeft:10,
    color:'#000'
  },
  delivery: {
    marginTop:10,
    // paddingBottom:50,
    flexDirection:'row',
    width:width,
    justifyContent:'space-around',
    alignItems:'center',
    // backgroundColor:'red'
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
    fontSize:Fonts.nextRegular,
    fontFamily: Fonts.base,
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
  languageBar: {
    // borderWidth:1,
    // borderColor:'#cccccc',
    // borderRadius:10,
  },
  lineText: {
    marginLeft:10,
    fontSize:Fonts.input,
    fontFamily: Fonts.base,
    color:'#000'
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
    padding:10,
    alignItems:'center',
    marginLeft:20,
    marginRight:20,
    justifyContent:'space-around'
  },
  ratandlocStyle: {
    margin:5,
    fontSize:Fonts.nextRegular,
    fontFamily: Fonts.base,
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
    width:90,
    fontFamily:Fonts.base
  },
  monthText: {
    width:70,
    marginLeft:5,
    marginRight:5,
    flexDirection:'row',
    justifyContent:'space-between',
    fontFamily:Fonts.base
  },
  arrow: {
    width:30,
    height:30,
    alignItems:'center'
  },
  textPay: {
    marginLeft:10,
    fontSize:Fonts.input,
    fontFamily: Fonts.base,
  },
  language: {
    padding:10
  },
  languageDropdown: {
    // borderColor:'gray',
    // borderWidth:1,
    // borderRadius:5,
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
    fontSize: Fonts.regular,
    fontFamily: Fonts.base,
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
    padding:10,
    marginBottom:10,
    marginTop:10
  },
  saveButton: {
    backgroundColor:'#262050',
    padding:10,
    width:100,
    alignItems:'center'
  },
  applyButton: {
    backgroundColor:'#262050',
    padding:10,
    width:100,
    alignItems:'center'
  },

});
