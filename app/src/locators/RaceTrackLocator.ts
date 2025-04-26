/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { DropAreaDescription, ListLocator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'

class RaceTrackLocator extends ListLocator {
  parentItemType = MaterialType.GameBoard
  gap = { x: 2.18 }
  maxCount = 5

  getPositionOnParent(location: Location): XYCoordinates {
    const line: number = location.id
    const baseY = 24.2
    const deltaY = 12.57
    const y = baseY + deltaY * line
    return { x: 70.3, y }
  }


  locationDescription = new RaceTrackDescription()
}

export class RaceTrackDescription extends DropAreaDescription {
  width = 12
  height = 2.5
  borderRadius = 0.3
}

export const raceTrackLocator = new RaceTrackLocator()
