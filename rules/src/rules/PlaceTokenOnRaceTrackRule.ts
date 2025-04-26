import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { Memory } from './Memory'

export class PlaceTokenOnRaceTrackRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    this.getPossiblePlace().forEach((place) => {
      moves.push(this.playerInfluenceTokens.moveItem(() => place))
    })
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.RaceTrack) {
      console.log(this.material(MaterialType.InfluenceToken).location(loc => loc.type === LocationType.RaceTrack && loc.id === move.location.id).maxBy(item => item.location.x!))
      this.memorize(Memory.LastTokenOnRaceTrackForPlayer, move.location.id, this.player)
      return new NextRuleHelper(this.game).moveToNextRule(this.nextPlayer)
    }
    return []
  }

  getPossiblePlace() {
    const res: Location[] = []
    for (let i = 0; i < 5; i++) {
      const raceIsNotFinished =
        this.material(MaterialType.RaceFinishedOverlayTile).location((loc) => loc.type === LocationType.RaceTrack && loc.id === i).length === 0
      if (raceIsNotFinished) {
        res.push({ type: LocationType.RaceTrack, id: i })
      }
    }
    return res
  }

  get playerInfluenceTokens() {
    return this.material(MaterialType.InfluenceToken).location(LocationType.PlayerInfluenceTokenPile).player(this.player)
  }
}
