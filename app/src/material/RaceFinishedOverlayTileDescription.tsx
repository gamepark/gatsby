/** @jsxImportSource @emotion/react */
import { TokenDescription } from '@gamepark/react-game'
import Raceover from '../images/Raceover.jpg'
import { RaceFinishedOverlayTileHelp } from './help/RaceFinishedOverlayTileHelp'

export class RaceFinishedOverlayTileDescription extends TokenDescription {
  height = 2
  width = 12
  borderRadius = 0.3

  image = Raceover

  help = RaceFinishedOverlayTileHelp
}

export const raceFinishedOverlayTileDescription = new RaceFinishedOverlayTileDescription()
