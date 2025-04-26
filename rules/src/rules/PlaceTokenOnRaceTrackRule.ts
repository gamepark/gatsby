import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { RaceTrackHelper } from './helpers/RaceTrackHelper'
import { Memory } from './Memory'

export class PlaceTokenOnRaceTrackRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  raceTrackHelper = new RaceTrackHelper(this.game)

  onRuleStart(): MaterialMove[] {
    if (this.playerInfluenceTokens.length === 0 || this.getPossiblePlace().length === 0) {
      return this.nextRuleHelper.moveToNextRule(this.nextPlayer)
    }
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    this.getPossiblePlace().forEach((place) => {
      moves.push(this.playerInfluenceTokens.moveItem(() => place))
    })
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.location.type === LocationType.RaceTrack) {
      const tokenPlaced = this.material(MaterialType.InfluenceToken)
        .location((loc) => loc.type === LocationType.RaceTrack && loc.id === move.location.id)
        .maxBy((item) => item.location.x!)
        .getItem()
      this.memorize(Memory.LastTokenOnRaceTrackForPlayer, move.location.id, this.player)
      if (tokenPlaced) {
        moves.push(...this.raceTrackHelper.checkAndGetRaceTrackCharacters(move.location.id, tokenPlaced.location.x!))
      }
      moves.push(...this.nextRuleHelper.moveToNextRule(this.nextPlayer))
    }
    return moves
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
