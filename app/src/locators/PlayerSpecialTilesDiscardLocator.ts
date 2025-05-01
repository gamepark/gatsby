/** @jsxImportSource @emotion/react */
import { DeckLocator, DropAreaDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerSpecialTilesDiscardLocator extends DeckLocator {
  getCoordinates(location: Location) {
    if (location.player === 1) {
      return { x: -32, y: 10 }
    }
    return { x: 32, y: 10 }
  }

  locationDescription = new PlayerSpecialTilesDiscardDescription()
}

export class PlayerSpecialTilesDiscardDescription extends DropAreaDescription {
  height = 2.5
  width = 5.5
}

export const playerSpecialTilesDiscardLocator = new PlayerSpecialTilesDiscardLocator()
