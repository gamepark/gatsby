/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { DeckLocator, DropAreaDescription } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'

class ActionSpaceLocator extends DeckLocator {
  parentItemType = MaterialType.GameBoard

  getPositionOnParent(location: Location): XYCoordinates {
    return { x: 8.4 + 16.65 * location.id, y: 91 }
  }

  locationDescription = new ActionSpaceDescription()
}

export class ActionSpaceDescription extends DropAreaDescription {
  width = 8
  height = 5.5
}

export const actionSpaceLocator = new ActionSpaceLocator()
