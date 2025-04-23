import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { cabaretSpaceLocator } from './CabaretSpaceLocator'
import { characterSpaceLocator } from './CharacterSpaceLocator'
import { financeCenterLocator } from './FinanceCenterLocator'
import { gameBoardLocator } from './GameBoardLocator'

export const Locators: Partial<Record<LocationType, Locator<number, MaterialType, LocationType>>> = {
  [LocationType.GameBoard]: gameBoardLocator,
  [LocationType.CabaretSpace]: cabaretSpaceLocator,
  [LocationType.CharacterSpace]: characterSpaceLocator,
  [LocationType.FinanceCenter]: financeCenterLocator
}
