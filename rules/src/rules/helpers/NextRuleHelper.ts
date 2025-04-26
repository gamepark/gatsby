import { MaterialRulesPart } from '@gamepark/rules-api'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class NextRuleHelper extends MaterialRulesPart {
  moveToNextRule(nextPlayer: number) {
    const nextRules: RuleId[] | undefined = this.remind(Memory.NextRules) ?? []
    if (nextRules.length > 1) {
      this.memorize(Memory.NextRules, nextRules.slice(1))
      return [this.startRule(nextRules[0])]
    }
    if (nextRules.length > 0) {
      this.forget(Memory.NextRules)
      return [this.startRule(nextRules[0])]
    }
    return [this.startPlayerTurn(RuleId.ChooseAction, nextPlayer)]
  }
}