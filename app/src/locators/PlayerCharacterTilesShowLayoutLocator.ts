/** @jsxImportSource @emotion/react */
import { DropAreaDescription, ListLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerCharacterTilesShowLayoutLocator extends ListLocator {
  gap = { x: 4.5 }
  maxCount = 2
  getCoordinates(location: Location) {
    if (location.player === 1) {
      return { x: -34, y: -4, z: 5 }
    }
    return { x: 30, y: -4, z: 5 }
  }

  locationDescription = new PlayerCharacterTilesShowLayoutDescription()
}

export class PlayerCharacterTilesShowLayoutDescription extends DropAreaDescription {
  height = 4
  width = 8.5
  borderRadius = 0.5
}

export const playerCharacterTilesShowLayoutLocator = new PlayerCharacterTilesShowLayoutLocator()
