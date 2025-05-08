/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialContext, TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import WomanSmallRound from '../images/pawn/WomanSmallRound.jpg'
import ManSmallRound from '../images/pawn/ManSmallRound.jpg'
import { InfluenceTokenHelp } from './help/InfluenceTokenHelp'

export class InfluenceTokenDescription extends TokenDescription {
  height = 1.5
  width = 1.5
  borderRadius = 1

  images = {
    1: WomanSmallRound,
    2: ManSmallRound
  }

  getStaticItems = ({ rules }: MaterialContext) => {
    const items: MaterialItem[] = []
    for (const player of rules.players) {
      items.push({ id: player, quantity: 20, location: { type: LocationType.PlayerInfluenceTokenPile, player } })
    }
    return items
  }

  getStockLocation = (item: MaterialItem) => ({
    type: LocationType.PlayerInfluenceTokenPile,
    player: item.location.player
  })

  help = InfluenceTokenHelp
}

export const influenceTokenDescription = new InfluenceTokenDescription()
