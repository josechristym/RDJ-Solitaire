import React from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import { POSITIONS } from '../assets/styles/styles'
import Icon from 'react-native-vector-icons/Octicons';

export default class GameInfo extends React.Component {

  static navigationOptions = { title: 'Welcome', header: null };

  constructor () {
    super()
    this.state = {
      isShown:false,
    }
  }
  onPressClose=()=>{
    this.props.navigation.pop()
  }

  render () {
    return (
      <View style={POSITIONS.APP}>
        <Image source={require('../assets/images/green_felt2.png')} resizeMode="contain" style={{position: 'absolute'}} />
        <View style={{height:50,backgroundColor: 'rgba(0,0,0,0.5)',marginBottom:50,justifyContent:"center"}}>
          <TouchableOpacity onPress={this.onPressClose}><Icon name="issue-closed" size={25} color="#F9F3F1" style={{marginLeft:20,height:30, width:30}}/></TouchableOpacity>
        </View>
      </View>
    )
  }
}
