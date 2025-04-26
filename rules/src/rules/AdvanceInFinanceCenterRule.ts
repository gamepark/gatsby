import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CharacterTilesHelper } from './helpers/CharacterTilesHelper'
import { NextRuleHelper } from './helpers/NextRuleHelper'

export class AdvanceInFinanceCenterRule extends PlayerTurnRule {
  characterTilesHelper = new CharacterTilesHelper(this.game)
  nextRuleHelper = new NextRuleHelper(this.game)
  onRuleStart() {
    if (this.playerAscensionToken.getItem()?.location.id < 13) {
      return [this.playerAscensionToken.moveItem(({ location }) => ({ ...location, id: (location.id as number) + 1 }))]
    }
    return this.nextRuleHelper.moveToNextRule(this.nextPlayer)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.location.type === LocationType.FinanceCenter) {
      moves.push(...this.characterTilesHelper.checkAndGetFinanceCenterCharacters(move.location.id as number))
      moves.push(...this.nextRuleHelper.moveToNextRule(this.nextPlayer))
    }
    return moves
  }

  get playerAscensionToken() {
    return this.material(MaterialType.AscensionToken).location(LocationType.FinanceCenter).player(this.player)
  }
}
