import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

import { MENUBAR, MENUBAR_AREA, MENUBAR_TEXT, STYLE_CENTER } from '../assets/styles/styles'

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
        <View style={Object.assign({}, MENUBAR, {backgroundColor: 'transparent', height: 25})}>
          <Text style={MENUBAR_TEXT}>
            Time: {timeMinutes}{timeSeconds < 10 ? '0' + timeSeconds : timeSeconds}
          </Text>
          <Text style={MENUBAR_TEXT}>Points: {this.props.points}</Text>
          <Text style={MENUBAR_TEXT}>Moves: {this.props.totalMoves}</Text>
        </View>
        <View style={MENUBAR}>
          <TouchableOpacity onPress={this.props.replayGame}>
            <Text style={MENUBAR_TEXT}>Replay</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.newGame}>
            <Text style={MENUBAR_TEXT}>New Game</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.undoMove}>
            <Text style={MENUBAR_TEXT}>Undo</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
