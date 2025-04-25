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
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ChooseSpecialActionTileRule } from './rules/ChooseSpecialActionTileRule'
import { PlaceTokenOnCabaretRule } from './rules/PlaceTokenOnCabaretRule'
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
    [RuleId.ChooseAction]: ChooseActionRule
  }

  hidingStrategies = {
    [MaterialType.CharacterTile]: {
      [LocationType.CharacterSpace]: hideIdIfRotated
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
    }
  }

  giveTime(): number {
    return 60
  }
}
const hideIdIfRotated = (item: MaterialItem) => (!item.location.rotation ? [] : ['id'])
