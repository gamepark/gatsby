import { MaterialMove } from '@gamepark/rules-api'
import { PlaceTokenOnRaceTrackRule } from './PlaceTokenOnRaceTrackRule'

export class PlaceTokenOnSameRaceTrackRule extends PlaceTokenOnRaceTrackRule {
  onRuleStart(): MaterialMove[] {
    if (this.getPossiblePlace().length === 0) {
      return this.nextRuleHelper.moveToNextRule()
    }
    return []
  }

  getPossiblePlace() {
    return this.raceTrackHelper.getPossiblePaceOnSameRaceTrack()
  }
}
