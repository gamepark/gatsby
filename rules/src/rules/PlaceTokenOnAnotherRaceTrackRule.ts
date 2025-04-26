import { Location, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { PlaceTokenOnRaceTrackRule } from './PlaceTokenOnRaceTrackRule'

export class PlaceTokenOnAnotherRaceTrackRule extends PlaceTokenOnRaceTrackRule {
  getPossiblePlace() {
    const last: number = this.remind(Memory.LastTokenOnRaceTrackForPlayer, this.player)
    const res: Location[] = []
    for (let i = 0; i < 5; i++) {
      const raceIsNotFinished =
        this.material(MaterialType.RaceFinishedOverlayTile).location((loc) => loc.type === LocationType.RaceTrack && loc.id === i).length === 0
      if (raceIsNotFinished && i !== last) {
        res.push({ type: LocationType.RaceTrack, id: i })
      }
    }
    return res
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(Memory.LastTokenOnRaceTrackForPlayer, this.player)
    return []
  }
}
