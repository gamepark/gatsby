/** @jsxImportSource @emotion/react */
import { CabaretTile } from '@gamepark/gatsby/material/CabaretTile'
import { CabaretHelper } from '@gamepark/gatsby/rules/helpers/CabaretHelper'
import { RuleId } from '@gamepark/gatsby/rules/RuleId'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import Cabaret1 from '../images/cabaret/Cabaret1.jpg'
import Cabaret2 from '../images/cabaret/Cabaret2.jpg'
import Cabaret3 from '../images/cabaret/Cabaret3.jpg'
import Cabaret4 from '../images/cabaret/Cabaret4.jpg'
import Back from '../images/cabaret/CabaretBack.jpg'
import { CabaretTileHelp } from './help/CabaretTileHelp'

export class CabaretTileDescription extends CardDescription {
  height = 5.5
  width = 5.5

  backImage = Back

  images = images

  help = CabaretTileHelp

  getLocations(_: MaterialItem, context: ItemContext): Location[] {
    const cabaretHelper = new CabaretHelper(context.rules.game)
    switch (context.rules.game.rule!.id) {
      case RuleId.PlaceTokenOnCabaret:
        return cabaretHelper.getPossiblePlace()
      case RuleId.PlaceTokenOnCabaretNearToOther:
      case RuleId.PlaceTokenOnCabaretOrRaceTrack:
        return cabaretHelper.getPossiblePlaceNearToOtherTokens()
      case RuleId.PlaceTokenOnCabaretNearToLast:
        return cabaretHelper.getPossiblePlaceNearToLast()
      case RuleId.PlaceTokenOnCabaretOnStarCase:
        return cabaretHelper.getPossibleStarPlace()
      default:
        return []
    }
  }
}

const images = {
  [CabaretTile.CabaretTile1]: Cabaret1,
  [CabaretTile.CabaretTile2]: Cabaret2,
  [CabaretTile.CabaretTile3]: Cabaret3,
  [CabaretTile.CabaretTile4]: Cabaret4
}

export const cabaretTileDescription = new CabaretTileDescription()
