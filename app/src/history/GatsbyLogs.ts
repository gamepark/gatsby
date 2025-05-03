import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { CustomMoveType } from '@gamepark/gatsby/rules/CustomMoveType'
import { RuleId } from '@gamepark/gatsby/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItem, MaterialMove } from '@gamepark/rules-api'
import { ChooseActionForOpponentHistory } from './components/ChooseActionForOpponentHistory'
import { ChooseActionHistory } from './components/ChooseActionHistory'
import { ChooseSpecialActionTileHistory } from './components/ChooseSpecialActionTileHistory'
import { GetCabaretBonusHistory } from './components/GetCabaretBonusHistory'
import { GetCharacterTilesHistory } from './components/GetCharacterTilesHistory'
import { GetFinanceCenterBonusHistory } from './components/GetFinanceCenterBonusHistory'
import { GetRaceTrackBonusHistory } from './components/GetRaceTrackBonusHistory'
import { SetAsideSpecialActionTileHistory } from './components/SetAsideSpecialActionTileHistory'

export class GatsbyLogs implements LogDescription {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext): MovePlayedLogDescription | undefined {
    const ruleId: RuleId = context.game.rule?.id
    const actionPlayer = context.action.playerId

    const cabaretRules = [
      RuleId.PlaceTokenOnCabaretOrRaceTrack,
      RuleId.PlaceTokenOnCabaret,
      RuleId.PlaceTokenOnCabaretNearToOther,
      RuleId.PlaceTokenOnCabaretNearToLast
    ]

    const raceTrackRules = [RuleId.PlaceTokenOnRaceTrack, RuleId.PlaceTokenOnAnotherRaceTrack, RuleId.PlaceTokenOnSameRaceTrack]

    if (cabaretRules.includes(ruleId)) {
      if (isCustomMoveType(CustomMoveType.GetBonus)(move)) {
        return {
          Component: GetCabaretBonusHistory,
          player: actionPlayer
        }
      }
    }

    if (raceTrackRules.includes(ruleId)) {
      if (isCustomMoveType(CustomMoveType.GetBonus)(move)) {
        return {
          Component: GetRaceTrackBonusHistory,
          player: actionPlayer
        }
      }
    }

    if (ruleId === RuleId.AdvanceInFinanceCenter) {
      if (isCustomMoveType(CustomMoveType.GetBonus)(move)) {
        return {
          Component: GetFinanceCenterBonusHistory,
          player: actionPlayer
        }
      }
    }

    if (ruleId === RuleId.ChooseSpecialActionTile || ruleId === RuleId.TakeThreeSpecialActionTilesAndChooseOne) {
      if (this.getMoveLocationType(move) === LocationType.ActionSpace) {
        return {
          Component: ChooseSpecialActionTileHistory,
          player: actionPlayer
        }
      }
      if (this.getMoveLocationType(move) === LocationType.PlayerSpecialTilesDiscard) {
        return {
          Component: SetAsideSpecialActionTileHistory,
          player: actionPlayer
        }
      }
    }
    if (ruleId === RuleId.ChooseAction && this.getMoveLocationType(move) === LocationType.ActionSpace) {
      return {
        Component: ChooseActionHistory,
        player: actionPlayer
      }
    }
    if (ruleId === RuleId.ChooseActionForOpponent && this.getMoveLocationType(move) === LocationType.ActionSpace) {
      return {
        Component: ChooseActionForOpponentHistory,
        player: actionPlayer
      }
    }
    if (isMoveItem(move) && ruleId === RuleId.GetCharacterTiles && this.getMoveLocationType(move) === LocationType.PlayerCharacterTiles) {
      return {
        Component: GetCharacterTilesHistory,
        player: move.location.player
      }
    }
    return undefined
  }

  getMoveLocationType(move: MaterialMove) {
    return isMoveItem(move) ? move.location.type : undefined
  }
}
