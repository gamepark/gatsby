import { CustomMove, isCustomMoveType, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class ChooseIfAdvanceInFinanceCenterOrNotRule extends PlayerTurnRule {

  getPlayerMoves() {
    return [this.customMove(CustomMoveType.Pass), this.customMove(CustomMoveType.Advance)]
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Advance)(move)) {
      return [this.startRule(RuleId.AdvanceInFinanceCenter)]
    }
    return []
  }
}
