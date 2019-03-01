import React, { Component } from 'react';
import { View,Alert, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class OfflineNotice extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      isConnected: false,
      netStatus:false
    };
  }

  componentWillMount() {

  //   const dispatchConnected = isConnected => this.props.dispatch(setIsConnected(isConnected));
  //
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

      NetInfo.isConnected.fetch().done(
        (isConnected) => { this.setState({ netStatus: isConnected }); }
      );

      NetInfo.isConnected.fetch().done((isConnected) => {

      if (isConnected)
      {
        this.setState({ isConnected});
      }else{
       // Alert for no internet
       this.setState({ isConnected});
      }
     });
  }

  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

       NetInfo.isConnected.fetch().done(
         (isConnected) => { this.setState({ netStatus: isConnected }); }
       );
  }

  componentWillUnmount() {
    // const dispatchConnected = isConnected => this.props.dispatch(setIsConnected(isConnected));
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectionChange = (isConnected) => {
            this.setState({ netStatus: isConnected });
            console.log(`is connected: ${this.state.netStatus}`);
          }


  render() {
    // console.log("net status",this.state.netStatus)
    // console.log("connection",this.state.isConnected)

    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width:width,
    position: 'absolute',
    top:0
  },
  offlineText: {
    color: '#fff'
  }
});
export default OfflineNotice;
