/** @jsxImportSource @emotion/react */
import { CharacterTile } from '@gamepark/gatsby/material/CharacterTile'
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import CharacterYellow1 from '../images/character/CharacterYellow1.jpg'
import CharacterYellow2 from '../images/character/CharacterYellow2.jpg'
import CharacterYellow3 from '../images/character/CharacterYellow3.jpg'
import CharacterPurple1 from '../images/character/CharacterPurple1.jpg'
import CharacterPurple2 from '../images/character/CharacterPurple2.jpg'
import CharacterPurple3 from '../images/character/CharacterPurple3.jpg'
import CharacterBrown1 from '../images/character/CharacterBrown1.jpg'
import CharacterBrown2 from '../images/character/CharacterBrown2.jpg'
import CharacterBrown3 from '../images/character/CharacterBrown3.jpg'
import CharacterBlue1 from '../images/character/CharacterBlue1.jpg'
import CharacterBlue2 from '../images/character/CharacterBlue2.jpg'
import CharacterBlue3 from '../images/character/CharacterBlue3.jpg'
import CharacterBlack1 from '../images/character/CharacterBlack1.jpg'
import CharacterBlack2 from '../images/character/CharacterBlack2.jpg'
import CharacterBlack3 from '../images/character/CharacterBlack3.jpg'
import CharacterBack from '../images/character/CharacterBack.jpg'
import { CharacterTileHelp } from './help/CharacterTileHelp'

export class CharacterTileDescription extends CardDescription {
  height = 4
  width = 4

  backImage = CharacterBack

  images = images

  help = CharacterTileHelp

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return (
      isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.PlayerCharacterTilesShowLayout && move.itemIndex === context.index
    )
  }
}

const images = {
  [CharacterTile.Yellow1]: CharacterYellow1,
  [CharacterTile.Yellow2]: CharacterYellow2,
  [CharacterTile.Yellow3]: CharacterYellow3,
  [CharacterTile.Purple1]: CharacterPurple1,
  [CharacterTile.Purple2]: CharacterPurple2,
  [CharacterTile.Purple3]: CharacterPurple3,
  [CharacterTile.Brown1]: CharacterBrown1,
  [CharacterTile.Brown2]: CharacterBrown2,
  [CharacterTile.Brown3]: CharacterBrown3,
  [CharacterTile.Blue1]: CharacterBlue1,
  [CharacterTile.Blue2]: CharacterBlue2,
  [CharacterTile.Blue3]: CharacterBlue3,
  [CharacterTile.Black1]: CharacterBlack1,
  [CharacterTile.Black2]: CharacterBlack2,
  [CharacterTile.Black3]: CharacterBlack3
}

export const characterTileDescription = new CharacterTileDescription()
