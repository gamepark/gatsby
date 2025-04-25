import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseActionRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const rotation = this.player === 2
    for (const place of this.getPossiblePlaces()) {
      moves.push(this.actionToken.moveItem(() => ({ ...place, rotation })))
    }

    return moves
  }

  getPossiblePlaces() {
    const res: Location[] = []
    for (let i = 1; i < 5; i++) {
      const actionTokenIsNotAlreadyInSpace =
        this.material(MaterialType.ActionToken).location((loc) => loc.type === LocationType.ActionSpace && loc.id === i).length === 0
      if (actionTokenIsNotAlreadyInSpace) {
        res.push({ type: LocationType.ActionSpace, id: i })
      }
    }

    const firstPlayerSpecialActionSpace = this.getSpecialActionSpace(1, 0)
    const secondPlayerSpecialActionSpace = this.getSpecialActionSpace(2, 5)

    if (firstPlayerSpecialActionSpace) res.push(firstPlayerSpecialActionSpace)
    if (secondPlayerSpecialActionSpace) res.push(secondPlayerSpecialActionSpace)

    return res
  }

  getSpecialActionSpace(player: number, id: number) {
    if (this.player !== player) return null

    const actionTokenIsNotAlreadyInSpace =
      this.material(MaterialType.ActionToken).location((loc) => loc.type === LocationType.ActionSpace && loc.id === id).length === 0
    const specialActionTileIsInSpace =
      this.material(MaterialType.SpecialActionTile).location((loc) => loc.type === LocationType.ActionSpace && loc.id === id).length === 1
    if (actionTokenIsNotAlreadyInSpace && specialActionTileIsInSpace) {
      return { type: LocationType.ActionSpace, id: id, x: 1 }
    }
    return null
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItem(move) && move.location.type === LocationType.ActionSpace) {
      return [this.startPlayerTurn(RuleId.ChooseAction, this.nextPlayer)]
    }
    return []
  }

  get actionToken() {
    return this.material(MaterialType.ActionToken)
  }
}
