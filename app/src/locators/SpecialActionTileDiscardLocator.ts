import { DeckLocator } from '@gamepark/react-game'

export class SpecialActionTileDiscardLocator extends DeckLocator {
  coordinates = { x: -35.5, y: -11 }
  rotateZ = -90
}

export const specialActionTileDiscardLocator = new SpecialActionTileDiscardLocator()
