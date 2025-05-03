import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { ChooseActionRule } from './ChooseActionRule'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class ChooseActionForOpponentRule extends ChooseActionRule {
  playerWhoPlayActions = this.nextPlayer

  getPlayerMoves(): MaterialMove[] {
    return super.getPlayerMoves().concat([this.customMove(CustomMoveType.Pass)])
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startPlayerTurn(RuleId.ChooseAction, this.nextPlayer)]
    }
    return []
  }
}
