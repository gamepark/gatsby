import { MaterialMove } from '@gamepark/rules-api'
import { Memory } from './Memory'
import { PlaceTokenOnRaceTrackRule } from './PlaceTokenOnRaceTrackRule'

export class PlaceTokenOnSameRaceTrackRule extends PlaceTokenOnRaceTrackRule {
  getPossiblePlace() {
    const last: number = this.remind(Memory.LastTokenOnRaceTrackForPlayer, this.player)
    return this.raceTrackHelper.getPossibleRacePlace().filter((place) => place.id === last)
  }

  onRuleEnd(): MaterialMove[] {
    return []
  }
}
