import { DeckLocator } from '@gamepark/react-game'

export class SpecialActionTileDeckLocator extends DeckLocator {
  coordinates = { x: -30.5, y: -12.5 }
}

export const specialActionTileDeckLocator = new SpecialActionTileDeckLocator()
