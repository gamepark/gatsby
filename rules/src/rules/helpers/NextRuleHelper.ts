import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class NextRuleHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  moveToNextRule(nextPlayer: number) {
    const nextRules: RuleId[] | undefined = this.remind(Memory.NextRules) ?? []
    if (nextRules.length > 1) {
      this.memorize(Memory.NextRules, nextRules.slice(1))
      return [this.startRule(nextRules[0])]
    }
    if (nextRules.length > 0) {
      this.forget(Memory.NextRules)
      return [this.startPlayerTurn(nextRules[0], this.player!)]
    }
    return [this.startPlayerTurn(RuleId.ChooseAction, nextPlayer)]
  }
}
