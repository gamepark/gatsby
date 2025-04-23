/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'

class RaceTrackLocator extends Locator {
  parentItemType = MaterialType.GameBoard

  getPositionOnParent(location: Location): XYCoordinates {
    const line = Math.floor(location.id / 10)
    const column = location.id % 10
    const baseX = 70.3
    const deltaX = 4.05
    const x = baseX + deltaX * column
    const baseY = 24.2
    const deltaY = 12.57
    const y = baseY + deltaY * line
    return { x, y }
  }
}

export const raceTrackLocator = new RaceTrackLocator()
