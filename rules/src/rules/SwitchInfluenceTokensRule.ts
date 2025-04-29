import { isMoveItem, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NextRuleHelper } from './helpers/NextRuleHelper'

export class SwitchInfluenceTokensRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)

  onRuleStart(): MaterialMove[] {
    if (this.playerInfluenceTokens.length === 0) {
      return this.nextRuleHelper.moveToNextRule(this.nextPlayer)
    }
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    this.getPossiblePlace().forEach((place) => {
      moves.push(...this.playerInfluenceTokens.moveItems(() => place))
    })
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.isLegalMove(this.player, move) && isMoveItem(move)) {
      const oldLocation = this.material(MaterialType.InfluenceToken).index(move.itemIndex).getItem()?.location
      const tokenOnNewLocation = this.material(MaterialType.InfluenceToken).location(
        (loc) => loc.type === move.location.type && loc.id === move.location.id && loc.parent === move.location.parent && loc.x === move.location.x
      )
      return oldLocation && tokenOnNewLocation.length ? [tokenOnNewLocation.moveItem(() => ({ ...oldLocation }))] : []
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (
      isMoveItemType(MaterialType.InfluenceToken)(move) &&
      (move.location.type === LocationType.CabaretTokenSpace || move.location.type === LocationType.RaceTrack)
    ) {
      moves.push(...this.nextRuleHelper.moveToNextRule(this.nextPlayer))
    }
    return moves
  }

  getPossiblePlace() {
    return this.material(MaterialType.InfluenceToken)
      .location((loc) => loc.type === LocationType.CabaretTokenSpace || loc.type === LocationType.RaceTrack)
      .id(this.nextPlayer)
      .getItems()
      .map((item) => item.location)
  }

  get playerInfluenceTokens() {
    return this.material(MaterialType.InfluenceToken)
      .location((loc) => loc.type === LocationType.CabaretTokenSpace || loc.type === LocationType.RaceTrack)
      .id(this.player)
  }
}
