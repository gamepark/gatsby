import { DeckLocator } from '@gamepark/react-game'

export class RaceFinishedOverlayTileDeckLocator extends DeckLocator {
  coordinates = { x: 29, y: -10 }

  rotateZ = 90
}

export const raceFinishedOverlayTileDeckLocator = new RaceFinishedOverlayTileDeckLocator()
