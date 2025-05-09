import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { FinanceCenterHelper } from './helpers/FinanceCenterHelper'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { Memory } from './Memory'

export class AdvanceInFinanceCenterRule extends PlayerTurnRule {
  financeCenterHelper = new FinanceCenterHelper(this.game)
  nextRuleHelper = new NextRuleHelper(this.game)

  onRuleStart() {
    const playerPosition = this.playerAscensionToken.getItem()?.location.id
    if (playerPosition < 13) {
      const opponentPosition = this.opponentAscensionToken.getItem()?.location.id
      const nbToAdd = playerPosition < opponentPosition ? 2 : 1
      this.memorize(Memory.NbCasesToAdd, nbToAdd)
      return [this.playerAscensionToken.moveItem(({ location }) => ({ ...location, id: (location.id as number) + nbToAdd }))]
    }
    return this.nextRuleHelper.moveToNextRule()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.location.type === LocationType.FinanceCenter) {
      const bonus = this.financeCenterHelper.checkBonus(move.location.id as number)
      if (bonus !== null) {
        moves.push(this.customMove(CustomMoveType.GetBonus, bonus))
      }
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }
    return moves
  }

  get playerAscensionToken() {
    return this.material(MaterialType.AscensionToken).location(LocationType.FinanceCenter).player(this.player)
  }

  get opponentAscensionToken() {
    return this.material(MaterialType.AscensionToken).location(LocationType.FinanceCenter).player(this.nextPlayer)
  }
}
