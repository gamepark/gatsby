import {
  hideItemId,
  hideItemIdToOthers,
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
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ChooseSpecialActionTileRule } from './rules/ChooseSpecialActionTileRule'
import { PlaceTokenOnAnotherRaceTrackRule } from './rules/PlaceTokenOnAnotherRaceTrackRule'
import { PlaceTokenOnCabaretNearToLastRule } from './rules/PlaceTokenOnCabaretNearToLastRule'
import { PlaceTokenOnCabaretNearToOtherRule } from './rules/PlaceTokenOnCabaretNearToOtherRule'
import { PlaceTokenOnCabaretRule } from './rules/PlaceTokenOnCabaretRule'
import { PlaceTokenOnRaceTrackRule } from './rules/PlaceTokenOnRaceTrackRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class GatsbyRules
  extends SecretMaterialRules<number, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>>
{
  rules = {
    [RuleId.ChooseSpecialActionTile]: ChooseSpecialActionTileRule,
    [RuleId.PlaceTokenOnCabaret]: PlaceTokenOnCabaretRule,
    [RuleId.PlaceTokenOnCabaretNearToOther]: PlaceTokenOnCabaretNearToOtherRule,
    [RuleId.PlaceTokenOnCabaretNearToLast]: PlaceTokenOnCabaretNearToLastRule,
    [RuleId.AdvanceInFinanceCenter]: AdvanceInFinanceCenterRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.PlaceTokenOnRaceTrack]: PlaceTokenOnRaceTrackRule,
    [RuleId.PlaceTokenOnAnotherRaceTrack]: PlaceTokenOnAnotherRaceTrackRule
  }

  hidingStrategies = {
    [MaterialType.CharacterTile]: {
      [LocationType.CharacterSpace]: hideIdIfRotated,
      [LocationType.PlayerCharacterTiles]: hideItemIdToOthersIfRotated
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
      [LocationType.SpecialActionLayout]: new PositiveSequenceStrategy('y'),
      [LocationType.ActionSpace]: new PositiveSequenceStrategy()
    },
    [MaterialType.ActionToken]: {
      [LocationType.ActionSpace]: new PositiveSequenceStrategy()
    },
    [MaterialType.RaceFinishedOverlayTile]: {
      [LocationType.RaceFinishedDeck]: new PositiveSequenceStrategy()
    },
    [MaterialType.InfluenceToken]: {
      [LocationType.RaceTrack]: new PositiveSequenceStrategy()
    },
    [MaterialType.CharacterTile]: {
      [LocationType.PlayerCharacterTiles]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}
const hideIdIfRotated = (item: MaterialItem) => (!item.location.rotation ? [] : ['id'])
const hideItemIdToOthersIfRotated = (item: MaterialItem, player?: number) => {
  return !item.location.rotation ? [] : player === item.location.player ? [] : ['id']
}
