import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ActionsForSpecialActionTiles, SpecialActionTile } from '../material/SpecialActionTile'
import { ActionType, actionTypes, rulesForAction } from './helpers/ActionHelper'
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
    const res: Location[] = []
    for (const actionType of actionTypes) {
      const actionTokenIsNotAlreadyInSpace =
        this.material(MaterialType.ActionToken).location((loc) => loc.type === LocationType.ActionSpace && loc.id === actionType).length === 0
      if (actionTokenIsNotAlreadyInSpace) {
        res.push({ type: LocationType.ActionSpace, id: actionType })
      }
    }

    const firstPlayerSpecialActionSpace = this.getSpecialActionSpace(1, 0)
    const secondPlayerSpecialActionSpace = this.getSpecialActionSpace(2, 5)

    if (firstPlayerSpecialActionSpace) res.push(firstPlayerSpecialActionSpace)
    if (secondPlayerSpecialActionSpace) res.push(secondPlayerSpecialActionSpace)

    return res
  }

  getSpecialActionSpace(player: number, id: number) {
    if (this.playerWhoPlayActions !== player) return null

    const actionTokenIsNotAlreadyInSpace =
      this.material(MaterialType.ActionToken).location((loc) => loc.type === LocationType.ActionSpace && loc.id === id).length === 0
    const specialActionTileIsInSpace = this.getSpecialActionTile(id).length === 1
    if (actionTokenIsNotAlreadyInSpace && specialActionTileIsInSpace) {
      return { type: LocationType.ActionSpace, id: id, x: 1 }
    }
    return null
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
