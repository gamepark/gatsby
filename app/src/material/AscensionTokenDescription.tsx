/** @jsxImportSource @emotion/react */
import { TokenDescription } from '@gamepark/react-game'
import WomanSquare from '../images/pawn/WomanSquare.jpg'
import ManSquare from '../images/pawn/ManSquare.jpg'
import { AscensionTokenHelp } from './help/AscensionTokenHelp'

export class AscensionTokenDescription extends TokenDescription {
  height = 1.5
  width = 1.5

  images = {
    1: WomanSquare,
    2: ManSquare
  }

  help = AscensionTokenHelp
}

export const ascensionTokenDescription = new AscensionTokenDescription()
