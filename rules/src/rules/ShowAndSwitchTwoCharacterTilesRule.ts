import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { NextRuleHelper } from './helpers/NextRuleHelper'

export class ShowAndSwitchTwoCharacterTilesRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)

  onRuleStart(): MaterialMove[] {
    return this.nextRuleHelper.moveToNextRule(this.nextPlayer)
  }
}
