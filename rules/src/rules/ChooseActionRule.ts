import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ActionsForSpecialActionTiles, SpecialActionTile } from '../material/SpecialActionTile'
import { ActionHelper, ActionType, actionTypes, rulesForAction } from './helpers/ActionHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseActionRule extends PlayerTurnRule {
  playerWhoPlayActions = this.player
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const rotation = this.playerWhoPlayActions === 2
    for (const place of this.getPossiblePlaces()) {
      moves.push(this.actionToken.moveItem(() => ({ ...place, rotation })))
    }

    return moves
  }

  getPossiblePlaces() {
    return new ActionHelper(this.game, this.playerWhoPlayActions).getPossiblePlaces()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.ActionSpace) {
      if (actionTypes.includes(move.location.id as ActionType)) {
        const index: ActionType = move.location.id
        const rules: RuleId[] = rulesForAction[index]
        this.memorize(Memory.NextRules, [rules[1]])
        return [this.getStartRule(rules[0])]
      }
      const specialActionTile = this.getSpecialActionTile(move.location.id as number)
      const rules: RuleId[] = ActionsForSpecialActionTiles[specialActionTile.getItem()?.id as SpecialActionTile]
      this.memorize(Memory.NextRules, rules.slice(1))
      return [specialActionTile.moveItem(() => ({ type: LocationType.SpecialActionDiscard })), this.getStartRule(rules[0])]
    }
    return []
  }

  get actionToken() {
    return this.material(MaterialType.ActionToken)
  }

  getStartRule(ruleId: number): MaterialMove {
    return this.startRule(ruleId)
  }

  getSpecialActionTile(locationId: number) {
    return this.material(MaterialType.SpecialActionTile).location((loc) => loc.type === LocationType.ActionSpace && loc.id === locationId)
  }
}
