import { PlaceTokenOnRaceTrackRule } from './PlaceTokenOnRaceTrackRule'

export class PlaceTokenOnRaceTrackAnywhereRule extends PlaceTokenOnRaceTrackRule {
  getPossiblePlace() {
    return this.raceTrackHelper.getPossibleRacePlaceAnywhere()
  }
}
