import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
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

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.itemType === MaterialType.CharacterTile && move.location.type === LocationType.PlayerCharacterTiles) {
      if (
        !this.getPlayerCharacterTiles(move.location.player!)
          .getItems()
          .some((item) => item.id === undefined)
      ) {
        this.endOfGameHelper.checkEndOfGame(move.location.player!)
      }
    }
    return []
  }

  onCustomMove(): MaterialMove[] {
    if (this.remind(Memory.GameEnded)) return [this.endGame()]

    if (this.remind(Memory.ChooseActionToOpponent)) {
      this.forget(Memory.ChooseActionToOpponent)
      return [this.startRule(RuleId.ChooseActionForOpponent)]
    }
    return [this.startPlayerTurn(RuleId.ChooseAction, this.nextPlayer)]
  }

  getPlayerCharacterTiles(player: number) {
    return this.material(MaterialType.CharacterTile).location(LocationType.PlayerCharacterTiles).player(player)
  }

  get playerFincanceTokenLocationId(): number {
    return this.material(MaterialType.AscensionToken).player(this.player).getItem()?.location.id as number
  }
}
