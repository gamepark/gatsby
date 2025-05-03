import {
  CompetitiveRank,
  CustomMove,
  FillGapStrategy,
  hideItemId,
  hideItemIdToOthers,
  isCustomMoveType,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { AdvanceInFinanceCenterRule } from './rules/AdvanceInFinanceCenterRule'
import { ChooseActionForOpponentRule } from './rules/ChooseActionForOpponentRule'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ChooseSpecialActionTileRule } from './rules/ChooseSpecialActionTileRule'
import { CustomMoveType } from './rules/CustomMoveType'
import { GetCharacterTilesRule } from './rules/GetCharacterTilesRule'
import { EndOfGameHelper } from './rules/helpers/EndOfGameHelper'
import { NextRuleHelper } from './rules/helpers/NextRuleHelper'
import { PlaceTokenOnAnotherRaceTrackRule } from './rules/PlaceTokenOnAnotherRaceTrackRule'
import { PlaceTokenOnCabaretNearToLastRule } from './rules/PlaceTokenOnCabaretNearToLastRule'
import { PlaceTokenOnCabaretNearToOtherRule } from './rules/PlaceTokenOnCabaretNearToOtherRule'
import { PlaceTokenOnCabaretOnStarCaseRule } from './rules/PlaceTokenOnCabaretOnStarCaseRule'
import { PlaceTokenOnCabaretOrRaceTrackRule } from './rules/PlaceTokenOnCabaretOrRaceTrackRule'
import { PlaceTokenOnCabaretRule } from './rules/PlaceTokenOnCabaretRule'
import { PlaceTokenOnRaceTrackRule } from './rules/PlaceTokenOnRaceTrackRule'
import { PlaceTokenOnSameRaceTrackRule } from './rules/PlaceTokenOnSameRaceTrackRule'
import { ReplaceCharacterTilesRule } from './rules/ReplaceCharacterTilesRule'
import { RuleId } from './rules/RuleId'
import { ShowTwoCharacterTilesRule } from './rules/ShowTwoCharacterTilesRule'
import { SwitchInfluenceTokensRule } from './rules/SwitchInfluenceTokensRule'
import { TakeThreeSpecialActionTileAndTakeOneRule } from './rules/TakeThreeSpecialActionTileAndTakeOneRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class GatsbyRules extends SecretMaterialRules implements TimeLimit<MaterialGame, MaterialMove>, CompetitiveRank<MaterialGame, MaterialMove, number> {
  endOfGameHelper = new EndOfGameHelper(this.game)
  rules = {
    [RuleId.ChooseSpecialActionTile]: ChooseSpecialActionTileRule,
    [RuleId.PlaceTokenOnCabaret]: PlaceTokenOnCabaretRule,
    [RuleId.PlaceTokenOnCabaretOnStarCase]: PlaceTokenOnCabaretOnStarCaseRule,
    [RuleId.PlaceTokenOnCabaretNearToOther]: PlaceTokenOnCabaretNearToOtherRule,
    [RuleId.PlaceTokenOnCabaretNearToLast]: PlaceTokenOnCabaretNearToLastRule,
    [RuleId.AdvanceInFinanceCenter]: AdvanceInFinanceCenterRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.PlaceTokenOnRaceTrack]: PlaceTokenOnRaceTrackRule,
    [RuleId.PlaceTokenOnAnotherRaceTrack]: PlaceTokenOnAnotherRaceTrackRule,
    [RuleId.PlaceTokenOnSameRaceTrack]: PlaceTokenOnSameRaceTrackRule,
    [RuleId.TakeThreeSpecialActionTilesAndChooseOne]: TakeThreeSpecialActionTileAndTakeOneRule,
    [RuleId.SwitchInfluenceTokens]: SwitchInfluenceTokensRule,
    [RuleId.PlaceTokenOnCabaretOrRaceTrack]: PlaceTokenOnCabaretOrRaceTrackRule,
    [RuleId.ChooseActionForOpponent]: ChooseActionForOpponentRule,
    [RuleId.ShowTwoCharacterTiles]: ShowTwoCharacterTilesRule,
    [RuleId.ReplaceCharacterTiles]: ReplaceCharacterTilesRule,
    [RuleId.GetCharacterTiles]: GetCharacterTilesRule
  }

  hidingStrategies = {
    [MaterialType.CharacterTile]: {
      [LocationType.CharacterSpace]: hideIdIfRotated,
      [LocationType.PlayerCharacterTiles]: hideItemIdToOthersIfRotated,
      [LocationType.PlayerCharacterTilesShowLayout]: hideItemIdToOthers
    },
    [MaterialType.ActionToken]: {
      [LocationType.ActionTokenIdle]: hideIdIfRotated,
      [LocationType.ActionSpace]: hideIdIfRotated
    },
    [MaterialType.SpecialActionTile]: {
      [LocationType.SpecialActionDeck]: hideItemId,
      [LocationType.SpecialActionDiscard]: hideItemId,
      [LocationType.SpecialActionLayout]: hideItemIdToOthers
    }
  }

  locationsStrategies = {
    [MaterialType.SpecialActionTile]: {
      [LocationType.SpecialActionDeck]: new PositiveSequenceStrategy(),
      [LocationType.SpecialActionDiscard]: new PositiveSequenceStrategy(),
      [LocationType.SpecialActionLayout]: new PositiveSequenceStrategy('y')
    },
    [MaterialType.RaceFinishedOverlayTile]: {
      [LocationType.RaceFinishedDeck]: new PositiveSequenceStrategy()
    },
    [MaterialType.InfluenceToken]: {
      [LocationType.RaceTrack]: new FillGapStrategy()
    },
    [MaterialType.CharacterTile]: {
      [LocationType.PlayerCharacterTiles]: new PositiveSequenceStrategy(),
      [LocationType.PlayerCharacterTilesShowLayout]: new PositiveSequenceStrategy()
    }
  }

  protected onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return new NextRuleHelper(this.game).moveToNextRule()
    }
    return []
  }

  giveTime(): number {
    return 60
  }

  rankPlayers(playerA: number, playerB: number): number {
    return this.endOfGameHelper.rankPlayers(playerA, playerB)
  }
}

const hideIdIfRotated = (item: MaterialItem) => (!item.location.rotation ? [] : ['id'])
const hideItemIdToOthersIfRotated = (item: MaterialItem, player?: number) => {
  return !item.location.rotation ? [] : player === item.location.player ? [] : ['id']
}
