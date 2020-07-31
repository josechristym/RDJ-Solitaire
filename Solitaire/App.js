import React from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'

import { DEFAULT_DECK } from './constants'
import { CARD, POSITIONS } from './assets/styles/styles'
import TableauStack from './components/TableauStack'
import GenericStack from './components/GenericStack'
import MenuBar from './components/MenuBar'
import SplashScreen from 'react-native-splash-screen'

export default class App extends React.Component {

  constructor () {
    super()
    const deck = this.shuffle()
    this.state = {
      deck,
      gameFinished: false,
      moves: 0,
      timeSince: 0,
      points: 0,
      lastUserMove: {},
      canAutoComplete: false,
      clickedAutoComplete: false,
      tableau: [], // Seven piles that make up the main table.
      foundations: { // four suit organized piles beginning with Ace
        hearts: [],
        diamonds: [],
        spades: [],
        clubs: []
      },
      hand: [...deck], // AKA "Stock": remaining cards form the stock pile
      waste: [] // AKA "Talon":  Cards from stock pile with no place in tableau or foundations are face up in waste pile
    }
  }

  componentWillMount () {
    SplashScreen.hide();
    this.deal()
  }

  componentDidUpdate (prevProps, prevState) {
    const { tableau, clickedAutoComplete, canAutoComplete, gameFinished, points, timeSince, foundations } = this.state
    const { hearts, diamonds, spades, clubs } = foundations
    if (tableau.length > 0) {
      const faceDownInTableau = tableau.reduce((tableauTotal, currentStack) => {
        return tableauTotal + currentStack.reduce((stackTotal, currentCard) => {
          if (currentCard.isFaceDown) {
            return stackTotal + 1
          }
          return stackTotal
        }, 0)
      }, 0)
      if (faceDownInTableau <= 0) {
        if (!canAutoComplete) {
          this.setState({canAutoComplete: true})
        }
        // Game over
        else if (hearts.length + diamonds.length + spades.length + clubs.length === 52 && !gameFinished) {
          this.setState({gameFinished: true, points: points + Number((700000 / timeSince).toFixed())})
        }
      }
    }
    if (clickedAutoComplete && !gameFinished) {
      setTimeout(this.autoComplete, 0)
    }
    if (this.state.points < 0) {
      this.setState({points: 0})
    }
  }

  componentDidMount () {
    this.timer = setInterval(() => this.setState(state => {
      state.timeSince += 1
      return state
    }), 1000)
  }

  /**
   * Fisher–Yates shuffle Algorithm works in O(n) time complexity. The assumption
   * here is, we are given a function rand() that generates random number in O(1) time.
   * @return {Array} Shuffled version of DEFAULT_DECK
   */
  shuffle = () => {
    let deck = [...cloneDeep(DEFAULT_DECK)]
    for (let i = deck.length - 1; i > 0; i--) {
      let randomIdx = Math.floor(Math.random() * i)
      let temp = deck[i]
      deck[i] = deck[randomIdx]
      deck[randomIdx] = temp
    }
    return deck
  }

  /**
   * Once the component is mounted we will build the new state and then render the updated state
   * @return {Void}
   */
  deal = () => {
    let tableau = []
    let hand = [...this.state.hand]
    // let hand = [...DEFAULT_DECK].reverse()
    // Move hand cards to tableau. Set the last card in each tableau to be face up
    for (let i = 0; i < 7; i++) {
      if (!tableau[i]) { tableau[i] = [] }
      let activeTableau = tableau[i]
      for (let j = 0; j <= i; j++) {
        activeTableau.push(hand.pop())
        if (j === i) {
          activeTableau[activeTableau.length - 1].isFaceDown = false
        }
      }
    }
    // We now know the rest of the cards in hand will remain face up cards
    for (let k = 0; k < hand.length; k++) {
      hand[k].isFaceDown = false
    }

    this.setState({ hand, tableau })
  }

  /**
   * Increment user move count, stringify current state of game and push to move array
   * @return {Void} Set state as final move of function
   */
  acceptUserMove = () => {
    this.setState(state => {
      let currentState = cloneDeep(state)
      // We don't care about moves or timeSince
      delete currentState.moves
      delete currentState.timeSince
      delete currentState.deck
      state.lastUserMove = currentState
      state.moves += 1
      return state
    })
  }

  undoMove = () => {
    if (Object.keys(this.state.lastUserMove).length > 0 && !this.state.gameFinished) {
      this.setState(state => {
        const lastState = state.lastUserMove
        state = Object.assign(state, lastState)
        state.moves += 1
        return state
      })
    }
  }

  replayGame = (evt) => {
    this.newGame(evt, true)
  }

  newGame = (evt, isReset) => {
    this.setState(state => {
      if (!isReset) {
        state.deck = this.shuffle()
      }
      state.gameFinished = false
      state.moves = 0
      state.timeSince = 0
      state.points = 0
      state.tableau = []
      state.canAutoComplete = false
      state.clickedAutoComplete = false
      state.foundations = {
        hearts: [],
        diamonds: [],
        spades: [],
        clubs: []
      }
      state.hand = [...state.deck]
      for (let i = 0; i < state.hand.length; i++) {
        state.hand[i].isFaceDown = true
      }
      state.waste = []
      return state
    }, this.deal)
  }

  getNumericCardValue (card) {
    card = card || {value: '0'}
    let cardValue = card.value
    if (card.value === 'A') {
      cardValue = '1'
    } else if (card.value === 'J') {
      cardValue = '11'
    } else if (card.value === 'Q') {
      cardValue = '12'
    } else if (card.value === 'K') {
      cardValue = '13'
    }
    return Number(cardValue)
  }

  getActualCardValue (cardValue) {
    cardValue = cardValue || 1
    if (cardValue === 1) {
      return 'A'
    } else if (cardValue === 11) {
      return 'J'
    } else if (cardValue === 12) {
      return 'Q'
    } else if (cardValue === 13) {
      return 'K'
    }
    return String(cardValue)
  }

  moveToFoundation = (card, moveFrom, tableauIndex) => {
    let success = false
    const numericCardValue = this.getNumericCardValue(card)
    const matchingFoundation = this.state.foundations[card.type]
    const moveFromTableau = this.state.tableau[tableauIndex]
    const numericValueFoundation = this.getNumericCardValue(matchingFoundation[matchingFoundation.length - 1])
    const isLastCardInTableau = tableauIndex >= 0 && findIndex(moveFromTableau, card) === moveFromTableau.length - 1
    if (numericCardValue === numericValueFoundation + 1 && (isLastCardInTableau || moveFrom === 'waste')) {
      this.acceptUserMove()
      this.setState(state => {
        const activeFoundation = state.foundations[card.type]
        if (moveFrom === 'waste') {
          activeFoundation.push(state.waste.pop())
        } else if (moveFrom === 'tableau' && tableauIndex >= 0) {
          activeFoundation.push(moveFromTableau.pop())
          if (moveFromTableau.length > 0) {
            moveFromTableau[moveFromTableau.length - 1].isFaceDown = false
          }
        }
        state.points += 10
        return state
      })
      success = true
    }
    return success
  }

  getEligibleTableauIndex = (card) => {
    const numericCardValue = this.getNumericCardValue(card)
    for (let i = 0; i < this.state.tableau.length; i++) {
      let activeTableau = this.state.tableau[i]
      let activeTableauCard = activeTableau[activeTableau.length - 1]
      const numericValueTableau = this.getNumericCardValue(activeTableauCard)
      const isValidTableauMove = numericCardValue === numericValueTableau - 1 && activeTableauCard.color !== card.color
      const isKingToEmptyTableau = numericCardValue === 13 && activeTableau.length === 0
      if (isValidTableauMove || isKingToEmptyTableau) {
        return i
      }
    }
    return -1
  }

  moveCard = (card, moveFrom, tableauIndex) => {
    if (this.moveToFoundation(card, moveFrom, tableauIndex)) { return }
    let newTableauIndex = this.getEligibleTableauIndex(card)
    if (newTableauIndex >= 0) {
      this.acceptUserMove()
      this.setState(state => {
        if (moveFrom === 'waste') {
          state.points += 5
          state.tableau[newTableauIndex].push(state.waste.pop())
        } else if (moveFrom === 'tableau' && tableauIndex >= 0) {
          const originalTableau = state.tableau[tableauIndex]
          originalTableau.splice(findIndex(originalTableau, card)).forEach(c => state.tableau[newTableauIndex].push(c))
          const lastCardInTableau = originalTableau[originalTableau.length - 1]
          if (originalTableau.length > 0 && lastCardInTableau.isFaceDown) {
            state.points += 5
            lastCardInTableau.isFaceDown = false
          }
        } else if (moveFrom === 'foundation') {
          state.points -= 15
          state.tableau[newTableauIndex].push(state.foundations[card.type].pop())
        }
        return state
      })
    }
  }

  clickFoundationStack = (card) => {
    this.moveCard(card, 'foundation')
  }

  clickWasteStack = (card) => {
    this.moveCard(card, 'waste')
  }

  clickTableauStack = (card, index) => {
    this.moveCard(card, 'tableau', index)
  }

  clickHandStack = () => {
    this.acceptUserMove()
    let hand = [...this.state.hand]
    let waste = [...this.state.waste]
    let points = this.state.points
    if (hand.length === 0) {
      points -= 100
      hand = waste.reverse()
      waste = []
    } else {
      waste.push(hand.pop())
    }
    this.setState({waste, hand, points})
  }

  moveCardWithValue = (value, suit) => {
    // Called at the end of the game. The key here is to look for the card to see if it's THE LAST card in the tableau
    // or the waste stack. If it is NOT, then we return false and do not move a card
    const actualCardValue = this.getActualCardValue(value)
    const tableauIndexWithCard = findIndex(this.state.tableau, stack => {
      if (stack.length > 0) {
        return stack[stack.length - 1].value === actualCardValue && stack[stack.length - 1].type === suit
      }
      return false
    })
    const cardToMoveFromWaste = findIndex(this.state.waste, card => card.value === actualCardValue && card.type === suit)
    if (tableauIndexWithCard >= 0) {
      this.clickTableauStack({value: actualCardValue, type: suit}, tableauIndexWithCard)
      return true
    } else if (cardToMoveFromWaste >= 0) {
      this.acceptUserMove()
      this.setState(state => {
        let waste = [...state.waste]
        state.foundations[suit].push(waste[cardToMoveFromWaste])
        waste = waste.filter(card => card.value !== actualCardValue || card.type !== suit)
        state.waste = waste
        state.points += 10
        return state
      })
      return true
    }
    return false
  }

  autoComplete = () => {
    if (!this.state.clickedAutoComplete) {
      clearInterval(this.timer)
      this.setState(state => {
        while (state.hand.length > 0) {
          state.waste.push(state.hand.pop())
        }
        state.clickedAutoComplete = true
        return state
      })
    }
    const { hearts, diamonds, spades, clubs } = this.state.foundations
    let cardValueToLookFor, movedCard = false
    if (hearts.length < 13) {
      cardValueToLookFor = this.getNumericCardValue(hearts[hearts.length - 1]) + 1
      movedCard = this.moveCardWithValue(cardValueToLookFor, 'hearts')
    }
    if (diamonds.length < 13 && !movedCard) {
      cardValueToLookFor = this.getNumericCardValue(diamonds[diamonds.length - 1]) + 1
      movedCard = this.moveCardWithValue(cardValueToLookFor, 'diamonds')
    }
    if (spades.length < 13 && !movedCard) {
      cardValueToLookFor = this.getNumericCardValue(spades[spades.length - 1]) + 1
      movedCard = this.moveCardWithValue(cardValueToLookFor, 'spades')
    }
    if (clubs.length < 13 && !movedCard) {
      cardValueToLookFor = this.getNumericCardValue(clubs[clubs.length - 1]) + 1
      movedCard = this.moveCardWithValue(cardValueToLookFor, 'clubs')
    }
  }

  renderTableau = () => {
    return this.state.tableau.map((tableauStack, index) => (
      <TableauStack
        key={`tableau-stack-${index}`}
        moveCard={this.clickTableauStack}
        tableauIndex={index}
        tableauStack={tableauStack}
      />
    ))
  }

  renderFoundations = () => {
    return Object.keys(this.state.foundations).map((type, index) => (
      <GenericStack
        key={`foundation-stack-${type}`}
        stack={this.state.foundations[type]}
        onPress={this.clickFoundationStack}
      />
    ))
  }

  renderHandStack = () => {
    const handEmpty = this.state.hand.length === 0
    return (
      <TouchableOpacity onPress={this.clickHandStack}>
        {!handEmpty && <Image source={require('./assets/images/card_back.png')} style={[CARD.DIMENSIONS,{borderColor:'grey',borderWidth:1,borderRadius:3}]} resizeMode="cover" />}
        {handEmpty && <Image
          source={require('./assets/images/undo.png')}
          style={{
            ...CARD.DIMENSIONS,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: 'grey',
          }}
          resizeMode="contain"
        />}
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={POSITIONS.APP}>
        <Image source={require('./assets/images/green_felt.png')} resizeMode="cover" style={{position: 'absolute'}} />
        <View style={{height:50,backgroundColor: 'rgba(0,0,0,0.5)',marginBottom:50}}></View>
        <View style={{flex:1,marginHorizontal:10}}>
        <View style={{height: 150, flexDirection: 'row'}}>
          <View style={POSITIONS.SECONDARY_ROW}>
            {this.renderFoundations()}
            <View style={CARD.DIMENSIONS}/>
            <GenericStack stack={this.state.waste} onPress={this.clickWasteStack} />
            {this.renderHandStack()}
          </View>
        </View>
        <View style={POSITIONS.SECONDARY_ROW}>
          {!this.state.gameFinished && this.renderTableau()}
          {this.state.gameFinished && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{backgroundColor: 'transparent', fontSize: 40}}>
                Game Over!
            </Text>
          </View>}
        </View>
        <View style={POSITIONS.SECONDARY_ROW}>
          <MenuBar
            totalMoves={this.state.moves}
            timeSince={this.state.timeSince}
            points={this.state.points}
            canAutoComplete={this.state.canAutoComplete}
            gameFinished={this.state.gameFinished}
            replayGame={this.replayGame}
            newGame={this.newGame}
            undoMove={this.undoMove}
            autoComplete={this.autoComplete}
          />
        </View>
      </View>
      </View>
    )
  }
}
