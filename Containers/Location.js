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
      region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
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
    this.setState({modalVisible: visible});
  }

  async confirm(){
    this.setModalVisible(!this.state.modalVisible);
    this.props.navigation.navigate('HomeScreen');
    // var formData = new FormData();
    // formData.append('email', this.state.email);
    // formData.append('password', this.state.password);
    // formData.append('email', 'remya1@vtrio.com');
    // formData.append('password', 'remya1238');
    //
    // let addAddress = await Api.addAddress(formData);

  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        // let code 
        // this.setState({
        //     region: position
        // })
      },
      (err) => console.log(err),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 10000 }
      );

    this.props.navigation.setParams({
      backbutton: this.backbutton.bind(this)
    });
  }
  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
  }

  backbutton(){
    this.props.navigation.dispatch({
             type: NavigationActions.NAVIGATE,
             routeName: 'HomeScreen',
             action: {
               type: NavigationActions.RESET,
               index: 0,
               actions: [{type: NavigationActions.NAVIGATE, routeName: 'HomeScreen'}]
             }
           })
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
              placeholder='Enter Delivery Address'
              placeholderTextColor='#000'
              style={styles.textStyle}
            />
          </View>

        </View>

        <MapView
          style={{position:'absolute',top:0,left:0,right:0,bottom:0}}
          region={this.state.region}
          showsUserLocation={ true }
          onRegionChange={(region)=>this.setState({region})}
          onRegionChangeComplete={ region => this.setState({region}) }
        >

            <MapView.Marker
            coordinate={ this.state.region }
          />
        </MapView>

        <View style={styles.confirm}>
          <TouchableOpacity style={styles.confirmButton} onPress={() => {
            this.setModalVisible(true);
          }}>
            <Text style={{color:'#fff', fontSize:18}}>CONFIRM</Text>
          </TouchableOpacity>
        </View>


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
                           placeholderTextColor='#000'
                           style={styles.selectedLocationStyle}/>
                <TextInput placeholder='Flat/Villa No.'
                           placeholderTextColor='#000'
                           style={styles.selectedLocationStyle}/>
                <TextInput placeholder='Building Name/Number'
                           placeholderTextColor='#000'
                           style={styles.selectedLocationStyle}/>

                <TouchableOpacity style={styles.saveButton}
                        onPress={this.confirm.bind(this)}>
                  <Text style={styles.saveText}>SAVE</Text>
                </TouchableOpacity>
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
    height: height/2,
    shadowColor:'#000'
  },
  selectedLocationStyle :{
    borderColor:'gray',
    borderWidth:1,
    borderRadius:5,
    marginBottom:10,
    fontSize: 18
  },
  saveButton: {
    alignItems:'center',
    padding:15,
    backgroundColor:'#262050',
    borderColor:'transparent',
    borderRadius:50,
    borderWidth:1
  },
  saveText: {
    color:'#fff',
    fontSize:18
  }
});
