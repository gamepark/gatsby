import { DeckLocator } from '@gamepark/react-game'

export class SpecialActionTileDiscardLocator extends DeckLocator {
  coordinates = { x: -32, y: -18 }
}

export const specialActionTileDiscardLocator = new SpecialActionTileDiscardLocator()
