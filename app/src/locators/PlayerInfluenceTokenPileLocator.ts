/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

class PlayerInfluenceTokenPileLocator extends PileLocator {
  radius = 2
  getCoordinates(location: Location) {
    if (location.player === 1) {
      return { x: -32, y: 15 }
    }
    return { x: 32, y: 15 }
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export const playerInfluenceTokenPileLocator = new PlayerInfluenceTokenPileLocator()
