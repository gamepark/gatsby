import { MaterialMove } from '@gamepark/rules-api'
import { PlaceTokenOnRaceTrackRule } from './PlaceTokenOnRaceTrackRule'

export class PlaceTokenOnRaceTrackAnywhereRule extends PlaceTokenOnRaceTrackRule {
  getPossiblePlace() {
    return this.raceTrackHelper.getPossibleRacePlaceAnywhere()
  }

  onRuleEnd(): MaterialMove[] {
    return []
  }
}
