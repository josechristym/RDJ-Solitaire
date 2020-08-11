import React from 'react'
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native'
import { POSITIONS } from '../assets/styles/styles'
import Icon from 'react-native-vector-icons/Octicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';  
import { BannerView } from 'react-native-fbads';

export default class GameInfo extends React.Component {

  static navigationOptions = { title: 'Welcome', header: null };

  constructor () {
    super()
    this.state = {
      isShown:false,
    }
  }
  onPressClose=()=>{
    console.log("working")
    this.props.navigation.pop()
  }

  onPressCompose=()=>{
    Linking.openURL('mailto:3tcashout@gmail.com')
  }

  render () {
    return (
      <View style={POSITIONS.APP}>
        <Image source={require('../assets/images/green_felt2.png')} resizeMode="contain" style={{position: 'absolute'}} />
        <View style={{height:50,backgroundColor: 'rgba(0,0,0,0.5)',marginBottom:50,alignItems:"center",flexDirection:'row'}}>
          <TouchableOpacity onPress={this.onPressClose}><Icon name="issue-closed" size={25} color="#F9F3F1" style={{marginLeft:20,height:30, width:30}}/></TouchableOpacity>
          <View style={{ alignItems: "center", flex: 1, justifyContent: "center", marginLeft: -30 }}>
            <Text style={{ backgroundColor: 'transparent', fontSize: 17, padding:10, color: '#F9F3F1', textAlign: 'center', fontWeight: "bold",lineHeight: 20 }}>
              Game Info
            </Text>
          </View>
        </View>
        <View style={{flex:1}}>
          <Text style={{ backgroundColor: 'transparent', fontSize: 17, padding:10, color: 'black', textAlign: 'center', fontWeight: "bold",lineHeight: 20 }}>
              Instructions for game play
          </Text>
          <Text style={{ backgroundColor: 'transparent', fontSize: 14, padding:10, color: 'black', textAlign: 'left', fontWeight: "bold",lineHeight: 20 }}>
              1. All your earnings will be securly saved {"\n"}
              2. Players must earn $50 atleat to checkout the cash{"\n"}
              3. Once the player reach the minimum checkout amount, can click on the pyaments button to checkout the cash.{"\n"}
              4. If you face any transactions issue feel free to reach us by clicking the below button, with your game screenshot.
              5. Internet is required to track your gameplay.
          </Text>
          <TouchableOpacity style={{height:50,margin:20,justifyContent:"center",flexDirection:'row',alignItems:"center", backgroundColor:'orange'}}>
            <MatIcon name="contact-mail" size={20} color="#F9F3F1" style={{height:25, width:20}}/>
            <Text style={{ backgroundColor: 'transparent', fontSize: 15, padding:10, color: 'white', textAlign: 'center', fontWeight: "bold",lineHeight: 15 }}>
              E-Mail us!!
            </Text>
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
