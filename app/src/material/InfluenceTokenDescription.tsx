/** @jsxImportSource @emotion/react */
import { PlayerRole } from '@gamepark/gatsby/PlayerRole'
import { TokenDescription } from '@gamepark/react-game'
import ManSmallRound from '../images/pawn/ManSmallRound.jpg'
import WomanSmallRound from '../images/pawn/WomanSmallRound.jpg'
import { InfluenceTokenHelp } from './help/InfluenceTokenHelp'

export class InfluenceTokenDescription extends TokenDescription {
  height = 1.5
  width = 1.5
  borderRadius = 1

  images = {
    [PlayerRole.Dorothy]: WomanSmallRound,
    [PlayerRole.James]: ManSmallRound
  }

  help = InfluenceTokenHelp
}

export const influenceTokenDescription = new InfluenceTokenDescription()
