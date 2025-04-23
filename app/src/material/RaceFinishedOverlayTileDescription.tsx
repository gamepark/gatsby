/** @jsxImportSource @emotion/react */
import { TokenDescription } from '@gamepark/react-game'
import Raceover from '../images/Raceover.jpg'

export class RaceFinishedOverlayTileDescription extends TokenDescription {
  height = 2
  width = 12

  image = Raceover
}

export const raceFinishedOverlayTileDescription = new RaceFinishedOverlayTileDescription()
