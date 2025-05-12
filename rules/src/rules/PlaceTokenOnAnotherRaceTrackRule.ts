import { MaterialMove } from '@gamepark/rules-api'
import { PlaceTokenOnRaceTrackRule } from './PlaceTokenOnRaceTrackRule'

export class PlaceTokenOnAnotherRaceTrackRule extends PlaceTokenOnRaceTrackRule {
  getPossiblePlace() {
    return this.raceTrackHelper.getPossiblePaceOnAnotherRaceTrack()
  }

  onRuleEnd(): MaterialMove[] {
    return []
  }
}
