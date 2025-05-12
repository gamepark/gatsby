import { MaterialMove } from '@gamepark/rules-api'
import { PlaceTokenOnRaceTrackRule } from './PlaceTokenOnRaceTrackRule'

export class PlaceTokenOnSameRaceTrackRule extends PlaceTokenOnRaceTrackRule {
  getPossiblePlace() {
    return this.raceTrackHelper.getPossiblePaceOnSameRaceTrack()
  }

  onRuleEnd(): MaterialMove[] {
    return []
  }
}
