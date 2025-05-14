import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlaceTokenOnRaceTrackRule } from './PlaceTokenOnRaceTrackRule'

export class PlaceTokenOnAnotherRaceTrackRule extends PlaceTokenOnRaceTrackRule {
  onRuleStart(): MaterialMove[] {
    if (this.getPossiblePlace().length === 0) {
      return this.nextRuleHelper.moveToNextRule()
    }
    return [
      this.material(MaterialType.InfluenceToken).createItem({
        location: { type: LocationType.PlayerInfluenceTokenPile, player: this.player },
        id: this.player
      })
    ]
  }

  getPossiblePlace() {
    return this.raceTrackHelper.getPossiblePaceOnAnotherRaceTrack()
  }
}
