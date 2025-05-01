import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { CabaretHelper } from './helpers/CabaretHelper'
import { EndOfGameHelper } from './helpers/EndOfGameHelper'
import { FinanceCenterHelper } from './helpers/FinanceCenterHelper'
import { RaceTrackHelper } from './helpers/RaceTrackHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class GetCharacterTilesRule extends PlayerTurnRule {
  cabaretHelper = new CabaretHelper(this.game)
  financeCenterHelper = new FinanceCenterHelper(this.game)
  raceTrackHelper = new RaceTrackHelper(this.game)
  endOfGameHelper = new EndOfGameHelper(this.game)

  onRuleStart(): MaterialMove[] {
    return [
      ...this.cabaretHelper.checkAnGetCharacters(this.player),
      ...this.cabaretHelper.checkAnGetCharacters(this.nextPlayer),
      ...this.financeCenterHelper.checkAndGetFinanceCenterCharacters(),
      ...this.raceTrackHelper.checkAndGetRaceTrackCharacters(),
      this.customMove(CustomMoveType.EndCheckCharacterTiles)
    ]
  }

  onCustomMove(): MaterialMove[] {
    const moves: MaterialMove[] = []

    for (const player of this.game.players) {
      if (
        !this.getPlayerCharacterTiles(player)
          .getItems()
          .some((item) => item.id === undefined)
      ) {
        moves.push(...this.endOfGameHelper.checkEndOfGame(player))
      }
    }

    if (moves.length > 0) {
      return moves
    }

    if (this.remind(Memory.ChooseActionToOpponent)) {
      this.forget(Memory.ChooseActionToOpponent)
      return [this.startRule(RuleId.ChooseActionForOpponent)]
    }
    return [this.startPlayerTurn(RuleId.ChooseAction, this.nextPlayer)]
  }

  getPlayerCharacterTiles(player: number) {
    return this.material(MaterialType.CharacterTile).location(LocationType.PlayerCharacterTiles).player(player)
  }
}
