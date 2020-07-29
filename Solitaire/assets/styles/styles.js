export const POSITIONS = {
  APP: {
    paddingTop: 100,
    flex: 1,
    flexDirection: 'column'
  },
  SECONDARY_ROW: {
    flex: 1,
    flexDirection: 'row'
  }
}
export const CARD = {
  CONTAINER: {
    borderRadius: 4,
    borderTopWidth: 0,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    alignItems: 'center',
  },
  DIMENSIONS: {
    width: 45,
    height: 70
  },
  FACE_BACKGROUND: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  VALUE: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  SUIT_IMAGE: {
    top: 3,
    right: 3,
    height: 15,
    width: 15,
    position: 'absolute',
  }
}

export const GENERIC_STACK = {
  EMPTY: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'grey',
    ...CARD.DIMENSIONS,
  }
}

export const MENUBAR_AREA = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
}

export const STYLE_CENTER = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const MENUBAR = {
  height: 40,
  backgroundColor: 'rgba(0,0,0,0.5)',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
}

export const MENUBAR_TEXT = {
  color: 'white'
}
