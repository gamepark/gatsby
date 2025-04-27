import { ChooseActionRule } from './ChooseActionRule'

export class ChooseActionForOpponentRule extends ChooseActionRule {
  playerWhoPlayActions = this.nextPlayer
}
