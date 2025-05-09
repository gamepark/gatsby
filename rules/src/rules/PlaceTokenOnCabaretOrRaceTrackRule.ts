import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { CabaretHelper } from './helpers/CabaretHelper'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { RaceTrackHelper } from './helpers/RaceTrackHelper'
import { Memory } from './Memory'

export class PlaceTokenOnCabaretOrRaceTrackRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  raceTrackHelper = new RaceTrackHelper(this.game)
  cabaretHelper = new CabaretHelper(this.game)

  onRuleStart(): MaterialMove[] {
    if (this.getPlayerMoves().length === 0) {
      return this.nextRuleHelper.moveToNextRule()
    }
    return [
      this.material(MaterialType.InfluenceToken).createItem({
        location: { type: LocationType.PlayerInfluenceTokenPile, player: this.player },
        id: this.player
      })
    ]
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
      const tokenPlaced = this.material(MaterialType.InfluenceToken)
        .location((loc) => loc.type === LocationType.RaceTrack && loc.id === move.location.id)
        .maxBy((item) => item.location.x!)
        .getItem()
      this.memorize(Memory.LastTokenOnRaceTrackForPlayer, move.location.id, this.player)
      if (tokenPlaced) {
        const bonus = this.raceTrackHelper.getBonus(move.location.id as number, tokenPlaced.location.x!)
        if (bonus !== null) {
          moves.push(this.customMove(CustomMoveType.GetBonus, bonus))
        }
      }
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }
    if (isMoveItemType(MaterialType.InfluenceToken)(move) && move.location.type === LocationType.CabaretTokenSpace) {
      this.memorize(Memory.LastTokenOnCabaretForPlayer, move.location, this.player)
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
