import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { cabaretTileDescription } from './CabaretTileDescription'
import { gameBoardDescription } from './GameBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.GameBoard]: gameBoardDescription,
  [MaterialType.CabaretTile]: cabaretTileDescription
}
