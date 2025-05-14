/** @jsxImportSource @emotion/react */
import { PlayerRole } from '@gamepark/gatsby/PlayerRole'
import { DeckLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerSpecialTilesDiscardLocator extends DeckLocator {
  getCoordinates(location: Location) {
    if (location.player === 1) {
      return { x: -35.5, y: 15 }
    }
    return { x: 35.5, y: 15 }
  }

  getRotateZ(location: Location) {
    return location.player === PlayerRole.Dorothy ? -90 : 90
  }
}

export const playerSpecialTilesDiscardLocator = new PlayerSpecialTilesDiscardLocator()
