/** @jsxImportSource @emotion/react */
import { TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '../../../../rules-api'
import ManRound from '../images/pawn/ManRound.jpg'
import WomanRound from '../images/pawn/WomanRound.jpg'
import { ActionTokenHelp } from './help/ActionTokenHelp'

export class ActionTokenDescription extends TokenDescription {
  height = 4
  width = 4
  borderRadius = 2

  image = WomanRound
  backImage = ManRound

  isFlipped = (item: MaterialItem) => item.location.rotation === true

  help = ActionTokenHelp
}

export const actionTokenDescription = new ActionTokenDescription()
