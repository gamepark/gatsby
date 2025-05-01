/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { FinanceCenterHelp } from '../material/help/FinanceCenterHelp'

class FinanceCenterLocator extends Locator {
  parentItemType = MaterialType.GameBoard

  getPositionOnParent(location: Location): XYCoordinates {
    const x = location.player === 1 ? 41 : 58.7
    const base = 78
    const delta = 5.55
    const y = base - delta * location.id
    return { x, y }
  }

  locationDescription = new FinanceCenterDescription()
}

class FinanceCenterDescription extends LocationDescription {
  width = 2
  height = 2
  help = FinanceCenterHelp
}

export const financeCenterLocator = new FinanceCenterLocator()
