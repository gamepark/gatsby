import { CustomMove, isMoveItem, ItemMove, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
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

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.location.type === LocationType.ActionSpace) {
      moves.push(...this.playerSpecialActionTile.moveItems(() => ({ type: LocationType.PlayerSpecialTilesDiscard, player: this.player })))
    }
    return moves
  }

  afterItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && (move.location.type === LocationType.ActionSpace || move.location.type === LocationType.PlayerSpecialTilesDiscard)) {
      moves.push(...this.specialActionTilesToChoose.moveItems(() => ({ type: LocationType.SpecialActionDiscard })))
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }
    return moves
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
