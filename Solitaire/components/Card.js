import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { CARD } from '../assets/styles/styles'
const { DIMENSIONS, FACE_BACKGROUND, VALUE, CONTAINER, SUIT_IMAGE } = CARD

const Card = ({meta, style, onPress}) => {
  if (meta.isFaceDown) {
    return <Image source={require('../assets/images/card_back.png')} style={{...DIMENSIONS, ...style}} resizeMode="contain" />
  }
  const pressCard = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    onPress(meta)
  }
  const renderSuitImage = (suit) => {
    if (suit === 'hearts') {
      return <Image source={require('../assets/images/heart.png')} style={SUIT_IMAGE} resizeMode="contain" />
    } else if (suit === 'diamonds') {
      return <Image source={require('../assets/images/diamond.png')} style={SUIT_IMAGE} resizeMode="contain" />
    } else if (suit === 'clubs') {
      return <Image source={require('../assets/images/club.png')} style={SUIT_IMAGE} resizeMode="contain" />
    } else {
      return <Image source={require('../assets/images/spade.png')} style={SUIT_IMAGE} resizeMode="contain" />
    }
  }
  return (
    <View style={{...CONTAINER, ...DIMENSIONS, ...style}}>
      <Image source={require('../assets/images/card_face.png')} resizeMode="cover" style={{...FACE_BACKGROUND}} />
      <TouchableOpacity onPress={pressCard}>
        <View style={{...DIMENSIONS, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{top: 3, left: 3, color: meta.color,  fontWeight: 'bold', ...VALUE}}>{meta.value}</Text>
          {renderSuitImage(meta.type)}
          <Text style={{color: meta.color, backgroundColor: 'transparent', fontSize: 30}}>{meta.value}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

Card.propTypes = {
  meta: PropTypes.object.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

export default Card
