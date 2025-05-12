/** @jsxImportSource @emotion/react */
import { PlayerRole } from '@gamepark/gatsby/PlayerRole'
import { PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

class PlayerInfluenceTokenPileLocator extends PileLocator {
  radius = 2
  getCoordinates(location: Location) {
    if (location.player === PlayerRole.Dorothy) {
      return { x: -31, y: 15 }
    }
    return { x: 31, y: 15 }
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export const playerInfluenceTokenPileLocator = new PlayerInfluenceTokenPileLocator()
