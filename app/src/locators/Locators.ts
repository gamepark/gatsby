import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { cabaretTileLocator } from './CabaretTileLocator'
import { characterTileLocator } from './CharacterTileLocator'
import { gameBoardLocator } from './GameBoardLocator'

export const Locators: Partial<Record<LocationType, Locator<number, MaterialType, LocationType>>> = {
  [LocationType.GameBoard]: gameBoardLocator,
  [LocationType.CabaretTile]: cabaretTileLocator,
  [LocationType.CharacterTile]: characterTileLocator
}
