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
    console.log(nextRules)
    if (nextRules.length > 1) {
      this.memorize(Memory.NextRules, nextRules.slice(1))
      return [this.startPlayerTurn(nextRules[0], this.player!)]
    }
    if (nextRules.length > 0) {
      this.forget(Memory.NextRules)
      return [this.startPlayerTurn(nextRules[0], this.player!)]
    }
    return [this.startPlayerTurn(RuleId.ChooseAction, nextPlayer)]
  }

  addActionSpecialInNextRules(locationBonus: string | RuleId) {
    if (typeof locationBonus === 'number') {
      const nextRules: RuleId[] | undefined = this.remind(Memory.NextRules) ?? []
      if (locationBonus === RuleId.ChooseActionForOpponent) {
        this.memorize(Memory.NextRules, [...nextRules, RuleId.ChooseActionForOpponent])
      } else {
        this.memorize(Memory.NextRules, [locationBonus, ...nextRules])
      }
    }
  }
}
