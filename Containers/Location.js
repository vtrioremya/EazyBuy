/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Geolocation,TouchableHighlight, Modal, StyleSheet, Text, View,Image, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import { NavigationActions } from 'react-navigation'
import Fonts from '../Themes/Fonts'
import RNGooglePlaces from 'react-native-google-places';

var {height, width} = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
// const ASPECT_RATIO = width / height;
// const LATITUDE = 13.139238380834923;
// const LONGITUDE = 80.25188422300266;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Location extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      latitude: 70.44,
      longitude: -122.44,
      error:null,
      fullAddress:[],
      address1_flat:'',
      address_building:'',
      hideConfirm:true,
      searchText:'Enter Delivery Address'
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
    headerTitle: 'SELECT DELIVERY LOCATION',
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



  setModalVisible(visible) {
    this.setState({modalVisible: visible, hideConfirm: !this.state.hideConfirm});
  }

  async confirm(){
    this.setModalVisible(!this.state.modalVisible);
    this.props.navigation.navigate('Home',
    {
      location: this.state.fullAddress,
      latitude: this.state.latitude,
      longitude:this.state.longitude});
    // var formData = new FormData();
    // formData.append('building', this.state.address_building);
    // formData.append('floor', this.state.address1_flat);
    // formData.append('token', token);
    // formData.append('password', 'remya1238');
    //
    // let addAddress = await Api.addAddress(formData);

  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.warn(position)
        // let code
        this.setState({
          latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })

        let myApiKey = 'AIzaSyCT-Ng25cV4_wjv3hiCsvYkLUpeFflrbGg'
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latitude + ',' + this.state.longitude + '&key=' + myApiKey)
          .then((response) => response.json())
          .then((responseJson) => {
            console.warn('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
            // console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
            var result = responseJson.results
            // console.log(result.results)
            var addresses = result.map((address)=>{
              // console.log(address.formatted_address)
              return address.formatted_address;
            })
            console.log("hai last",addresses)

            console.log(result[0].address_components)

            var flat = result[0].address_components
            var building = result[1].address_components
            // console.log(flat[0].long_name)
            // console.log(flat[1].long_name)
            // console.log(flat[2].long_name)

            this.setState({
              fullAddress: flat[1].long_name + ', '+ flat[2].long_name +', '+ flat[5].long_name,
              // address1_flat : flat[0].long_name + ','+ flat[1].long_name,
              // address_building : building[0].long_name + ','+ building[1].long_name
            })
        })


      },
      (err) => console.log(err),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 10000 }
      );

    this.props.navigation.setParams({
      backbutton: this.backbutton.bind(this)
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  backbutton(){
    this.props.navigation.dispatch({
             type: NavigationActions.NAVIGATE,
             routeName: 'Home',
             action: {
               type: NavigationActions.RESET,
               index: 0,
               actions: [{type: NavigationActions.NAVIGATE, routeName: 'HomeScreen'}]
             }
           })
  }


  render() {
    console.log(this.state.latitude)
    return (
      <View style={styles.container}>

        <View style={styles.searchView}>

          <View style={{width:'15%', alignItems:'center', }}>
            <Image source={require('../Images/footer-icon-3.png')} style={{width:30, height:30, justifyContent:'flex-start'}}/>
          </View>

          <View style={{width:'70%', alignItems:'center' }}>
            <Text style={styles.textStyle} onPress={() => {
              RNGooglePlaces.openPlacePickerModal()
              .then((place) => {
                  console.log(place);
                  // place represents user's selection from the
                  // suggestions and it is a simplified Google Place object.
              })
              .catch(error => console.log(error.message));  // error is a Javascript Error object

            }}>
              {this.state.searchText}
            </Text>
          </View>

        </View>

        <MapView
          style={{position:'absolute',top:0,left:0,right:0,bottom:0}}
          showsUserLocation={true}
          showsMyLocationButton={false}
          zoomEnabled = {true}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}

        >

        <MapView.Marker
           coordinate={{
             "latitude":this.state.latitude,
             "longitude":this.state.longitude}}
           title={"Your Location"}
         />

        </MapView>

        {this.state.hideConfirm ? <View style={styles.confirm}>
          <TouchableOpacity style={styles.confirmButton} onPress={() => {
            this.setModalVisible(true);
          }}>
            <Text style={{color:'#fff', fontSize:Fonts.input,fontFamily:Fonts.base}}>CONFIRM</Text>
          </TouchableOpacity>
        </View> : <View></View> }


        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }} style={styles.outerModal}>

            <View style={styles.modalView}>
              <View style={{width:width/2,  justifyContent:'center'}}>
                <TextInput placeholder='Selected Location'
                           placeholderTextColor='#d3d3d3'
                           value={this.state.fullAddress}
                           style={styles.selectedLocationStyle}/>
                <TextInput placeholder='Flat/Villa No.'
                           placeholderTextColor='#d3d3d3'
                           value={this.state.address1_flat}
                           selection={{start:0, end:0}}
                           ellipsizeMode="head"
                           style={styles.selectedLocationStyle}/>
                <TextInput placeholder='Building Name/Number'
                           placeholderTextColor='#d3d3d3'
                           value={this.state.address_building}
                           selection={{start:0, end:0}}
                           ellipsizeMode="head"
                           style={styles.selectedLocationStyle}/>
                <View style={{width:width/2, alignItems:'center'}}>
                  <TouchableOpacity style={styles.saveButton}
                          onPress={this.confirm.bind(this)}>
                    <Text style={styles.saveText}>SAVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </TouchableHighlight>

        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchView: {
    flexDirection:'row',
    alignItems:'center',
    position:'absolute',
    // marginLeft:5,
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
    fontSize:Fonts.input,
    fontFamily:Fonts.base
  },
  confirm: {
    bottom:60,
    position:'absolute'
  },
  confirmButton: {
    backgroundColor:'#262050',
    width:width/2,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    borderColor:'transparent',
    borderRadius:width/2 /2,
    borderWidth:1
  },
  outerModal: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  modalView :{
    alignItems:'center',
    elevation: 4,
    borderColor:'transparent',
    borderRadius:20,
    justifyContent:'center',
    backgroundColor:'#fff',
    width: width/1.5,
    height: height/2.7,
    shadowColor:'#000'
  },
  selectedLocationStyle :{
    borderColor:'gray',
    borderWidth:1,
    borderRadius:5,
    marginBottom:10,
    fontSize: Fonts.input,
    fontFamily:Fonts.base
  },
  saveButton: {
    width:width/3,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    backgroundColor:'#262050',
    borderColor:'transparent',
    borderRadius:50,
    borderWidth:1
  },
  saveText: {
    color:'#fff',
    fontSize:Fonts.input,
    fontFamily:Fonts.base
  }
});
