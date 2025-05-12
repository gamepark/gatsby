/** @jsxImportSource @emotion/react */
import { PlayerRole } from '@gamepark/gatsby/PlayerRole'
import { FlexLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerCharacterTilesLocator extends FlexLocator {
  lineSize = 2
  lineGap = { y: -4.5 }
  maxLines = 3

  getCoordinates(location: Location) {
    if (location.player === PlayerRole.Dorothy) {
      return { x: -30, y: 10 }
    }
    return { x: 30, y: 10 }
  }

  getGap(location: Location) {
    if (location.player === PlayerRole.Dorothy) {
      return { x: -4.5 }
    } else {
      return { x: 4.5 }
    }
  }
}

export const playerCharacterTilesLocator = new PlayerCharacterTilesLocator()
