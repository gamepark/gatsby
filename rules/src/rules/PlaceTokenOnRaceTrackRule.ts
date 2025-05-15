import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { RaceTrackHelper } from './helpers/RaceTrackHelper'
import { Memory } from './Memory'

export class PlaceTokenOnRaceTrackRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  raceTrackHelper = new RaceTrackHelper(this.game)

  onRuleStart(): MaterialMove[] {
    this.forget(Memory.LastTokenOnRaceTrackForPlayer, this.player)
    if (this.getPossiblePlace().length === 0) {
      return this.nextRuleHelper.moveToNextRule()
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
    if (isMoveItemType(MaterialType.InfluenceToken)(move) && move.location.type === LocationType.RaceTrack) {
      const lasts: number[] | undefined = this.remind(Memory.LastTokenOnRaceTrackForPlayer, this.player) ?? []
      this.memorize(Memory.LastTokenOnRaceTrackForPlayer, [...lasts, move.location.id], this.player)
      const bonus = this.raceTrackHelper.getBonus(move.location.id as number, move.location.x!)
      if (bonus !== null) {
        moves.push(this.customMove(CustomMoveType.GetBonus, bonus))
      }
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }
    return moves
  }

  getPossiblePlace() {
    return this.raceTrackHelper.getPossibleRacePlace()
  }

  get playerInfluenceTokens() {
    return this.material(MaterialType.InfluenceToken).location(LocationType.PlayerInfluenceTokenPile).player(this.player)
  }
}
