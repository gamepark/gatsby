import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseSpecialActionTileRule extends PlayerTurnRule {
  nbTilesToShow = 2
  onRuleStart(): MaterialMove[] {
    return this.specialActionTilesToShow.moveItems(() => ({ type: LocationType.SpecialActionLayout, player: this.player }))
  }

  getPlayerMoves(): MaterialMove[] {
    const id = this.player === 1 ? 0 : 5
    return this.specialActionTilesToChoose.moveItems(() => ({ type: LocationType.ActionSpace, id, x: 0 }))
  }

  afterItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.location.type === LocationType.ActionSpace) {
      moves.push(...this.specialActionTilesToChoose.moveItems(() => ({ type: LocationType.SpecialActionDiscard })))
      moves.push(this.startRule(RuleId.PlaceTokenOnCabaretOnStarCase))
    }
    return moves
  }

  get specialActionTilesToShow() {
    return this.material(MaterialType.SpecialActionTile)
      .location(LocationType.SpecialActionDeck)
      .sort((item) => -item.location.x!)
      .limit(this.nbTilesToShow)
  }

  get specialActionTilesToChoose() {
    return this.material(MaterialType.SpecialActionTile).location(LocationType.SpecialActionLayout).player(this.player)
  }
}
