import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import Card from './Card';
import { GENERIC_STACK } from '../assets/styles/styles'

/**
 * Takes a stack (of cards) and only displays the last item in the stack
 * @param {Object} props
 */
const GenericStack = ({stack, genericImage, onPress}) => {
  const meta = {...stack[stack.length - 1]}
  const stackEmpty = stack.length === 0
  return (
    <View style={GENERIC_STACK.EMPTY}>
      {stackEmpty && genericImage && <Text>{genericImage}</Text>}
      {!stackEmpty && <Card meta={meta} onPress={() => onPress(meta)}/>}
    </View>
  )
}

GenericStack.propTypes = {
  stack: PropTypes.array.isRequired,
  genericImage: PropTypes.string,
  onPress: PropTypes.func
}

export default GenericStack
