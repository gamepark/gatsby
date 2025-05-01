/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { SpecialActionTile } from '@gamepark/gatsby/material/SpecialActionTile'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import BonusTile1 from '../images/bonuses/BonusTile1.jpg'
import BonusTile2 from '../images/bonuses/BonusTile2.jpg'
import BonusTile3 from '../images/bonuses/BonusTile3.jpg'
import BonusTile4 from '../images/bonuses/BonusTile4.jpg'
import BonusTile5 from '../images/bonuses/BonusTile5.jpg'
import BonusTile6 from '../images/bonuses/BonusTile6.jpg'
import BonusTile7 from '../images/bonuses/BonusTile7.jpg'
import BonusTile8 from '../images/bonuses/BonusTile8.jpg'
import BonusTile9 from '../images/bonuses/BonusTile9.jpg'
import BonusTile10 from '../images/bonuses/BonusTile10.jpg'
import BonusTile11 from '../images/bonuses/BonusTile11.jpg'
import Back from '../images/bonuses/BonusTileBack.jpg'
import { SpecialActionTileHelp } from './help/SpecialActionTileHelp'

export class SpecialActionTileDescription extends CardDescription {
  height = 2.5
  width = 5.5

  backImage = Back

  images = images

  canLongClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.SpecialActionTile)(move) && move.location.type === LocationType.ActionSpace && move.itemIndex === context.index
  }

  help = SpecialActionTileHelp
}

const images = {
  [SpecialActionTile.SpecialActionTile1]: BonusTile1,
  [SpecialActionTile.SpecialActionTile2]: BonusTile2,
  [SpecialActionTile.SpecialActionTile3]: BonusTile3,
  [SpecialActionTile.SpecialActionTile4]: BonusTile4,
  [SpecialActionTile.SpecialActionTile5]: BonusTile5,
  [SpecialActionTile.SpecialActionTile6]: BonusTile6,
  [SpecialActionTile.SpecialActionTile7]: BonusTile7,
  [SpecialActionTile.SpecialActionTile8]: BonusTile8,
  [SpecialActionTile.SpecialActionTile9]: BonusTile9,
  [SpecialActionTile.SpecialActionTile10]: BonusTile10,
  [SpecialActionTile.SpecialActionTile11]: BonusTile11
}

export const specialActionTileDescription = new SpecialActionTileDescription()
