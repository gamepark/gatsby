import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { EndOfGameHelper } from './helpers/EndOfGameHelper'
import { FinanceCenterHelper } from './helpers/FinanceCenterHelper'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { Memory } from './Memory'

export class AdvanceInFinanceCenterRule extends PlayerTurnRule {
  financeCenterHelper = new FinanceCenterHelper(this.game)
  nextRuleHelper = new NextRuleHelper(this.game)
  endOfGameHelper = new EndOfGameHelper(this.game)

  onRuleStart() {
    const playerPosition = this.playerAscensionToken.getItem()?.location.id
    if (playerPosition < 13) {
      const opponentPosition = this.opponentAscensionToken.getItem()?.location.id
      const nbToAdd = playerPosition < opponentPosition ? 2 : 1
      this.memorize(Memory.NbCasesToAdd, nbToAdd)
      return [this.playerAscensionToken.moveItem(({ location }) => ({ ...location, id: (location.id as number) + nbToAdd }))]
    }
    return this.nextRuleHelper.moveToNextRule(this.nextPlayer)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.itemType === MaterialType.CharacterTile && move.location.type === LocationType.PlayerCharacterTiles) {
      return this.endOfGameHelper.checkEndOfGame(move.location.player!) ? [this.endGame()] : this.nextRuleHelper.moveToNextRule(this.nextPlayer)
    }
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.location.type === LocationType.FinanceCenter) {
      this.financeCenterHelper.checkBonus(move.location.id as number)
      moves.push(...this.financeCenterHelper.checkAndGetFinanceCenterCharacters(move.location.id as number))
      if (moves.length === 0) {
        moves.push(...this.nextRuleHelper.moveToNextRule(this.nextPlayer))
      }
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
