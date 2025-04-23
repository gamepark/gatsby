/** @jsxImportSource @emotion/react */
import { Locator } from '@gamepark/react-game'

class GameBoardLocator extends Locator {
  coordinates = { y: -10 }
}

export const gameBoardLocator = new GameBoardLocator()
