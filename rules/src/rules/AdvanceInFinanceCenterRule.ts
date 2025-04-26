import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NextRuleHelper } from './helpers/NextRuleHelper'

export class AdvanceInFinanceCenterRule extends PlayerTurnRule {
  onRuleStart() {
    return [this.playerAscensionToken.moveItem(({ location }) => ({ ...location, id: (location.id as number) + 1 }))]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.FinanceCenter) {
      return new NextRuleHelper(this.game).moveToNextRule(this.nextPlayer)
    }
    return []
  }

  get playerAscensionToken() {
    return this.material(MaterialType.AscensionToken).location(LocationType.FinanceCenter).player(this.player)
  }
}
