import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
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
      moves.push(this.customMove(CustomMoveType.KeepTile))
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionTile)(move)) {
      if (move.location.type === LocationType.ActionSpace) {
        const previousTile = this.playerSpecialActionTile.index((index) => index !== move.itemIndex)
        if (previousTile.length) {
          return [previousTile.moveItem({ type: LocationType.PlayerSpecialTilesDiscard, player: this.player })]
        } else {
          return this.endRule()
        }
      } else if (move.location.type === LocationType.PlayerSpecialTilesDiscard) {
        return this.endRule()
      }
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.KeepTile)(move)) {
      return [this.specialActionTilesToChoose.moveItem(() => ({ type: LocationType.PlayerSpecialTilesDiscard, player: this.player }))]
    }
    return super.onCustomMove(move)
  }

  endRule() {
    return [...this.specialActionTilesToChoose.moveItems({ type: LocationType.SpecialActionDiscard }), ...this.nextRuleHelper.moveToNextRule()]
  }

  get playerSpecialActionTile() {
    const id = this.player === 1 ? 0 : 5
    return this.material(MaterialType.SpecialActionTile).location((loc) => loc.type === LocationType.ActionSpace && loc.id === id)
  }
}
