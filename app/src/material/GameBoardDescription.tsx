/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import Board from '../images/board/board.jpg'
import { GameBoardHelp } from './help/GameBoardHelp'

export class GameBoardDescription extends BoardDescription {
  height = 36
  width = 54

  staticItem = {
    location: {
      type: LocationType.GameBoard
    }
  }

  image = Board

  help = GameBoardHelp
}

export const gameBoardDescription = new GameBoardDescription()
