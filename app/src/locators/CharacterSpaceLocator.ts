/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'

class CharacterSpaceLocator extends Locator {
  parentItemType = MaterialType.GameBoard

  getPositionOnParent(location: Location): XYCoordinates {
    return cabaretSpacesCoordinates[location.id]
  }
}

const cabaretSpacesCoordinates = [
  { x: 6, y: 47.2 },
  { x: 16.5, y: 73.7 },
  { x: 26.9, y: 47.2 },
  { x: 50, y: 7.9 },
  { x: 50, y: 23.3 },
  { x: 50, y: 39.7 },
  { x: 50, y: 61.5 },
  { x: 94, y: 24.2 },
  { x: 94, y: 36.9 },
  { x: 94, y: 49.5 },
  { x: 94, y: 62.1 },
  { x: 94, y: 74.8 }
]

export const characterSpaceLocator = new CharacterSpaceLocator()
