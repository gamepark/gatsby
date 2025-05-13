import { CustomMove, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ChooseSpecialActionTileRule } from './ChooseSpecialActionTileRule'
import { CustomMoveType } from './CustomMoveType'
import { NextRuleHelper } from './helpers/NextRuleHelper'

export class TakeThreeSpecialActionTileAndTakeOneRule extends ChooseSpecialActionTileRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  nbTilesToShow = 3

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = super.getPlayerMoves()
    if (this.playerSpecialActionTile.length) {
      moves.push(...this.specialActionTilesToChoose.moveItems(() => ({ type: LocationType.PlayerSpecialTilesDiscard, player: this.player })))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionTile)(move) && move.location.type === LocationType.ActionSpace) {
      const previousTile = this.playerSpecialActionTile
      if (previousTile.length) {
        return [previousTile.moveItem({ type: LocationType.PlayerSpecialTilesDiscard, player: this.player })]
      } else {
        return this.endRule()
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.SpecialActionTile)(move) && move.location.type === LocationType.PlayerSpecialTilesDiscard) {
      return this.endRule()
    }
    return moves
  }

  endRule() {
    return [...this.specialActionTilesToChoose.moveItems({ type: LocationType.SpecialActionDiscard }), ...this.nextRuleHelper.moveToNextRule()]
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const moves = super.onCustomMove(move)
    moves.push(...this.specialActionTilesToChoose.moveItems(() => ({ type: LocationType.SpecialActionDiscard })))
    return moves
  }

  get playerSpecialActionTile() {
    const id = this.player === 1 ? 0 : 5
    return this.material(MaterialType.SpecialActionTile).location((loc) => loc.type === LocationType.ActionSpace && loc.id === id)
  }
}
