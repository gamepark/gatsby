import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { CabaretHelper } from './helpers/CabaretHelper'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { RaceTrackHelper } from './helpers/RaceTrackHelper'

export class PlaceTokenOnCabaretOrRaceTrackRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  raceTrackHelper = new RaceTrackHelper(this.game)
  cabaretHelper = new CabaretHelper(this.game)

  onRuleStart(): MaterialMove[] {
    if (this.getPlayerMoves().length === 0) {
      return this.nextRuleHelper.moveToNextRule()
    }
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []

    this.getPossiblePlaces().forEach((place) => {
      moves.push(this.playerInfluenceTokens.moveItem(() => place))
    })
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.InfluenceToken)(move) && move.location.type === LocationType.RaceTrack) {
      const bonus = this.raceTrackHelper.getBonus(move.location.id as number, move.location.x!)
      if (bonus !== null) {
        moves.push(this.customMove(CustomMoveType.GetBonus, bonus))
      }
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }
    if (isMoveItemType(MaterialType.InfluenceToken)(move) && move.location.type === LocationType.CabaretTokenSpace) {
      const bonus = this.cabaretHelper.getBonus(move.location.parent!, move.location.id as number)
      if (bonus !== null) {
        moves.push(this.customMove(CustomMoveType.GetBonus, bonus))
      }
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }
    return moves
  }

  getPossiblePlaces() {
    return [...this.cabaretHelper.getPossiblePlaceNearToOtherTokens(), ...this.raceTrackHelper.getPossibleRacePlace()]
  }

  get playerInfluenceTokens() {
    return this.material(MaterialType.InfluenceToken).location(LocationType.PlayerInfluenceTokenPile).player(this.player)
  }
}
