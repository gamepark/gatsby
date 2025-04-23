import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { ascensionTokenDescription } from './AscensionTokenDescription'
import { cabaretTileDescription } from './CabaretTileDescription'
import { characterTileDescription } from './CharacterTileDescription'
import { gameBoardDescription } from './GameBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.GameBoard]: gameBoardDescription,
  [MaterialType.CabaretTile]: cabaretTileDescription,
  [MaterialType.CharacterTile]: characterTileDescription,
  [MaterialType.AscensionToken]: ascensionTokenDescription
}
