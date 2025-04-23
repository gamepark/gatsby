/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'

class CabaretTileLocator extends Locator {
  parentItemType = MaterialType.GameBoard

  getRotateZ(location: Location): number {
    const baseRotate = 45

    return baseRotate * (location.id % 10)
  }

  getPositionOnParent(location: Location): XYCoordinates {
    console.log(Math.floor(location.id / 10))
    return cabaretTilesCoordinates[Math.floor(location.id / 10)]
  }
}

const cabaretTilesCoordinates = [
  { x: 9.3, y: 25.8 },
  { x: 16.5, y: 15 },
  { x: 23.7, y: 25.8 },
  { x: 16.5, y: 36.5 }
]

export const cabaretTileLocator = new CabaretTileLocator()
