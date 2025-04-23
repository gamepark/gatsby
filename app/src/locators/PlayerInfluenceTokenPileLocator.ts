/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

class PlayerInfluenceTokenPileLocator extends PileLocator {
  radius = 2
  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    if(index === 0) {
      return { x: -45, y: 25 }
    }
    return { x: 45, y: 25 }
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export const playerInfluenceTokenPileLocator = new PlayerInfluenceTokenPileLocator()
