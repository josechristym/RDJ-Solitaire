import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import Card from './Card'

const TableauStack = (props) => {
  function moveCard (card) {
    props.moveCard(card, props.tableauIndex)
  }

  const {tableauIndex, tableauStack} = props
  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center'}}>
      {tableauStack.map((card, index) => (
        <Card
          key={`tableau-stack-${tableauIndex}-card-${index}`}
          meta={card}
          style={{marginTop: -50}}
          onPress={moveCard}
        />
      ))}
    </View>
  )
}

TableauStack.propTypes = {
  tableauIndex: PropTypes.number.isRequired,
  tableauStack: PropTypes.array.isRequired,
  moveCard: PropTypes.func.isRequired
}

export default TableauStack
