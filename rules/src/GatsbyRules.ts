import { HiddenMaterialRules, hideItemId, MaterialGame, MaterialItem, MaterialMove, PositiveSequenceStrategy, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { TheFirstStepRule } from './rules/TheFirstStepRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class GatsbyRules
  extends HiddenMaterialRules<number, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>>
{
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
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
      [LocationType.SpecialActionDeck]: hideItemId
    }
  }

  locationsStrategies = {
    [MaterialType.SpecialActionTile]: {
      [LocationType.SpecialActionDeck]: new PositiveSequenceStrategy()
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
