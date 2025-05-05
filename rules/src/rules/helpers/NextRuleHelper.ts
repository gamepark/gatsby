import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { EndOfGameHelper } from './EndOfGameHelper'

export class NextRuleHelper extends MaterialRulesPart {
  player?: number
  endOfGameHelper: EndOfGameHelper
  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
    this.endOfGameHelper = new EndOfGameHelper(game)
  }

  moveToNextRule() {
    const nextRules: RuleId[] | undefined = this.remind(Memory.NextRules) ?? []
    if (nextRules.length > 1) {
      this.memorize(Memory.NextRules, nextRules.slice(1))
      return [this.startRule(nextRules[0])]
    }
    if (nextRules.length > 0) {
      this.forget(Memory.NextRules)
      return [this.startRule(nextRules[0])]
    }
    return [this.startRule(RuleId.GetCharacterTiles)]
  }

  addActionSpecialInNextRules(locationBonus: string | RuleId) {
    if (typeof locationBonus === 'number') {
      const nextRules: RuleId[] | undefined = this.remind(Memory.NextRules) ?? []
      if (locationBonus === RuleId.ChooseActionForOpponent) {
        this.memorize(Memory.ChooseActionToOpponent, true)
      } else {
        this.memorize(Memory.NextRules, [locationBonus, ...nextRules])
      }
      return true
    }
    return false
  }
}
