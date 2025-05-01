/** @jsxImportSource @emotion/react */
import { FlexLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerCharacterTilesLocator extends FlexLocator {
  gap = { x: 3 }

  lineSize = 4
  lineGap = { y: 4.5 }

  getCoordinates(location: Location) {
    if (location.player === 1) {
      return { x: -47, y: 8 }
    }
    return { x: 38, y: 8 }
  }
}

export const playerCharacterTilesLocator = new PlayerCharacterTilesLocator()
