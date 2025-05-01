/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { DropAreaDescription, Locator } from '@gamepark/react-game'
import { BonusHelp } from '../material/help/BonusHelp'

class BonusCaseLocator extends Locator {
  parentItemType = MaterialType.GameBoard
  positionOnParent = { x: 0, y: 0 }

  locationDescription = new BonusCaseLocatorDescription()
}

export class BonusCaseLocatorDescription extends DropAreaDescription {
  height = 4
  width = 4

  help = BonusHelp
}

export const bonusCaseLocator = new BonusCaseLocator()
