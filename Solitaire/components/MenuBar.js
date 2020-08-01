import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

import { MENUBAR, MENUBAR_AREA, MENUBAR_TEXT, STYLE_CENTER } from '../assets/styles/styles'

import Icon from 'react-native-vector-icons/Entypo';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default class MenuBar extends React.Component {
  static propTypes = {
    totalMoves: PropTypes.number.isRequired,
    timeSince: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    canAutoComplete: PropTypes.bool.isRequired,
    gameFinished: PropTypes.bool.isRequired,
    replayGame: PropTypes.func.isRequired,
    newGame: PropTypes.func.isRequired,
    undoMove: PropTypes.func.isRequired,
    autoComplete: PropTypes.func.isRequired,
  }
  render () {
    const timeMinutes = this.props.timeSince / 60 >= 1 && `${Math.floor(this.props.timeSince / 60)}:`
    const timeSeconds = this.props.timeSince % 60
    return (
      <View style={MENUBAR_AREA}>
        {this.props.canAutoComplete && !this.props.gameFinished && <TouchableOpacity style={{...MENUBAR, ...STYLE_CENTER}} onPress={this.props.autoComplete}>
          <Text style={MENUBAR_TEXT}>Autocomplete?</Text>
        </TouchableOpacity>}
        <View style={Object.assign({}, MENUBAR, {height: 25,paddingHorizontal:10})}>
          <View style={{flexDirection:"row"}}>
            <Icon name="time-slot" size={20} color="#F9F3F1" style={{height:20, width:20}}/>
            <Text style={MENUBAR_TEXT}>
              {timeMinutes}{timeSeconds < 10 ? '0' + timeSeconds : timeSeconds}
            </Text>
          </View>
          <View style={{flexDirection:"row"}}>
            <MatIcon name="star-three-points" size={20} color="#F9F3F1" style={{height:20, width:20}}/>
            <Text style={MENUBAR_TEXT}>{" "}{this.props.points}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
            <SLIcon name="directions" size={20} color="#F9F3F1" style={{height:20, width:20}}/>
            <Text style={MENUBAR_TEXT}> {this.props.totalMoves}</Text>
          </View>
        </View>
        <View style={MENUBAR}>
          <TouchableOpacity onPress={this.props.replayGame}>
              <Icon name="retweet" size={25} color="#F9F3F1" style={{height:25, width:25, marginTop:5}}/>
              {/* <Text style={MENUBAR_TEXT}>Replay</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.newGame}>
            <IonIcons name="game-controller" size={25} color="#F9F3F1" style={{height:25, width:25, marginTop:5}}/>
            {/* <Text style={MENUBAR_TEXT}>New Game</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.undoMove}>
            <IonIcons name="arrow-undo" size={25} color="#F9F3F1" style={{height:25, width:25, marginTop:5}}/>
            {/* <Text style={MENUBAR_TEXT}>Undo</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
