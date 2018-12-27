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
import Swiper from 'react-native-swiper';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MaterialTabs from 'react-native-material-tabs';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const FirstRoute = () => (
  <View style={{ backgroundColor: '#ff4081' }} />
);
const SecondRoute = () => (
  <View style={{ backgroundColor: '#673ab7' }} />
);

export default class HomeScreen extends Component<Props> {

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

  static navigationOptions = ({ navigation }) => {
    headerMode: 'screen'
  };
  //
  //     headerLeft: (
  //       <View style={{flex:1,flexDirection: 'row'}}>
  //
  //         <View style={{width: 50, height: 50, justifyContent:'center'}}>
  //           <TouchableOpacity>
  //             <Image source={require('../Images/ham.png')}
  //             style={{marginLeft:10,width:30,height:30}}/>
  //           </TouchableOpacity>
  //         </View>
  //
  //         <View style={{width: width/1.2, height: 50,borderWidth:1, borderColor:'#dfdfdf',
  //           borderRadius:width/1.2 /2, flexDirection:'row'}}>
  //
  //           <View style={{width: 50, height: 50,alignItems:'center',justifyContent:'center'}}>
  //             <Image source={require('../Images/map-1.png')} style={{width:20,height:30}}/>
  //           </View>
  //
  //           <View style={{width: width/2, height: 50}} >
  //             <TextInput placeholder='Search'
  //             style={{width:width/1.5}}/>
  //           </View>
  //
  //         </View>
  //
  //       </View>
  //     ),
  //
  //
  //   }
  // }



  renderRow(rowData, sectionID, rowID, highlightRow){
    console.log(rowData)
    let grocery =rowData.item
    let list = []
    console.log(grocery.key)

    list.push(
      <View style={styles.grocery}>
        <View>
          <Image source={require('../Images/shop-1.png')}
          style={{width:100,height:100 ,borderRadius:10}} />
          <Image source={require('../Images/star.png')}
          style={{width:40,height:40,position:'absolute',bottom:0}} />
        </View>

        <View style={styles.groceryDet}>
          <Text style={styles.headerName}>Families Hyper Market</Text>
          <Text>17B Street Opp. Emirates Bank, Dubai, UAE</Text>

          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginTop:15}}>
            <View style={{flexDirection:'row'}}>

                <Image source={require('../Images/map-1.png')}
                style={{width:15,height:20}} />
                <Text style={styles.ratandlocStyle}>30 Mins</Text>

            </View>

            <View style={{flexDirection:'row'}}>

                <Image source={require('../Images/star-1.png')}
                style={{width:20,height:20}} />
                <Text style={styles.ratandlocStyle}>4.5</Text>

            </View>

            <View>
              <TouchableOpacity style={styles.openNowButton}>
                <Text style={{color:'#fff',fontSize:17}}>Open Now</Text>
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
        <View style={{width:width,height:200}}>
          <Swiper style={{width:width,height:200}}
                  dotColor='#cfc8c1'
                  activeDotColor='#ffb013'>
            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

            <View>
              <Image  source={require('../Images/banner-1.jpg')} style={{width:width,height:200}}/>
            </View>

          </Swiper>
        </View>

        <View>
          <MaterialTabs
            items={['Groceries', 'Maid Services', 'Technical Services']}
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
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
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
    padding:10
  },
  groceryDet: {
    flexDirection:'column',
    paddingLeft:10
  },
  openNowButton: {
    backgroundColor:'#a9cf46',
    width:width/4,
    height:30,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
    // borderWidth:1
  },
  ratandlocStyle: {
    marginLeft:5,
    fontSize:17
  },
  headerName: {
    fontSize:20,
    color:'#000'
  }
});
