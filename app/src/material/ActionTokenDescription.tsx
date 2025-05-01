/** @jsxImportSource @emotion/react */
import { TokenDescription } from '@gamepark/react-game'
import WomanRound from '../images/pawn/WomanRound.jpg'
import ManRound from '../images/pawn/ManRound.jpg'
import { ActionTokenHelp } from './help/ActionTokenHelp'

export class ActionTokenDescription extends TokenDescription {
  height = 4
  width = 4
  borderRadius = 2

  backImage = ManRound

  images = {
    1: WomanRound
  }

  help = ActionTokenHelp
}

export const actionTokenDescription = new ActionTokenDescription()
