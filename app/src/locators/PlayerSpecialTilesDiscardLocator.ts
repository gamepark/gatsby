/** @jsxImportSource @emotion/react */
import { PlayerRole } from '@gamepark/gatsby/PlayerRole'
import { DeckLocator, DropAreaDescription } from '@gamepark/react-game'
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

  locationDescription = new PlayerSpecialTilesDiscardDescription()
}

export class PlayerSpecialTilesDiscardDescription extends DropAreaDescription {
  height = 2.5
  width = 5.5
}

export const playerSpecialTilesDiscardLocator = new PlayerSpecialTilesDiscardLocator()
