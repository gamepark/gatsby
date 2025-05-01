/** @jsxImportSource @emotion/react */
import { TokenDescription } from '@gamepark/react-game'
import WomanSmallRound from '../images/pawn/WomanSmallRound.jpg'
import ManSmallRound from '../images/pawn/ManSmallRound.jpg'
import { InfluenceTokenHelp } from './help/InfluenceTokenHelp'

export class InfluenceTokenDescription extends TokenDescription {
  height = 1.5
  width = 1.5
  borderRadius = 1

  images = {
    1: WomanSmallRound,
    2: ManSmallRound
  }

  help = InfluenceTokenHelp
}

export const influenceTokenDescription = new InfluenceTokenDescription()
