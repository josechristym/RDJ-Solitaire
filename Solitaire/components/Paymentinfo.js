import React from 'react'
import { View, Image, TouchableOpacity, Text, Alert, AsyncStorage } from 'react-native'
import { POSITIONS } from '../assets/styles/styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { ceil } from 'react-native-reanimated';
import { BannerView } from 'react-native-fbads';

export default class PaymentInfo extends React.Component {

  static navigationOptions = { title: 'Welcome', header: null };

  constructor () {
    super()
    this.state = {
      isShown:false,
      get_rewards:0
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('get_rewards').then((value) => { 
      console.log("get_rewards",value) 
      if(value !== undefined && value !== null){
        let reward = Number((JSON.parse(value)).toFixed(2));
        this.setState({ 'get_rewards':  reward})
      }
    })
  }
  onPressClose=()=>{
    this.props.navigation.pop()
  }

  payout=()=>{
    Alert.alert(
      'Opps!!',
      'Still few more to go. Please play till you reach $50',
      [
        { text: 'Okay!', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  }
  
  render () {
    return (
      <View style={POSITIONS.APP}>
        <Image source={require('../assets/images/green_felt2.png')} resizeMode="contain" style={{position: 'absolute'}} />
        <View style={{height:50,backgroundColor: 'rgba(0,0,0,0.5)',marginBottom:50,alignItems:"center",flexDirection:'row'}}>
          <TouchableOpacity onPress={this.onPressClose}><Icon name="chevron-back" size={25} color="#F9F3F1" style={{marginLeft:20,height:30, width:30}}/></TouchableOpacity>
          <View style={{ alignItems: "center", flex: 1, justifyContent: "center", marginLeft: -30 }}>
            <Text style={{ backgroundColor: 'transparent', fontSize: 17, padding:10, color: '#F9F3F1', textAlign: 'center', fontWeight: "bold",lineHeight: 20 }}>
              Checkout
            </Text>
          </View>
        </View>
        <View style={{flex:1,alignItems:"center"}}>
          <Text style={{ backgroundColor: 'transparent', fontSize: 17, color: 'black', textAlign: 'center', fontWeight: "bold",lineHeight: 20 }}>
              Earned rewards : ${this.state.get_rewards}
          </Text>
          <Text style={{ backgroundColor: 'transparent', fontSize: 14, color: 'black', textAlign: 'center', fontWeight: "bold",lineHeight: 20 }}>
              Press icon below to checkout
          </Text>
          <TouchableOpacity onPress={this.payout}>
            <Image source={require('../assets/images/Paypal.png')} resizeMode="cover" style={{ justifyContent: 'center', alignItems: 'center', marginTop:20, height: 70, width: 100, borderColor: 'gray', borderWidth: 2 }} />
          </TouchableOpacity>
        </View>
        <BannerView
          placementId="950980425405826_950981308739071"
          type="standard"
          onPress={() => console.log('click')}
          onLoad={() => console.log('loaded')}
          onError={err => { this.setState({ showFBAds: false }) }}
        />
      </View>
    )
  }
}
