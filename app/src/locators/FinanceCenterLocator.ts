/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'

class FinanceCenterLocator extends Locator {
  parentItemType = MaterialType.GameBoard

  getPositionOnParent(location: Location): XYCoordinates {
    const x = location.player === 1 ? 41 : 58.7
    const base = 78
    const delta = 5.55
    const y = base - delta * location.id
    return { x, y }
  }
}

export const financeCenterLocator = new FinanceCenterLocator()
