import { DeckLocator } from '@gamepark/react-game'

export class SpecialActionTileDeckLocator extends DeckLocator {
  coordinates = { x: -32, y: -14 }
}

export const specialActionTileDeckLocator = new SpecialActionTileDeckLocator()
