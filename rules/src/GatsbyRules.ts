import { HiddenMaterialRules, MaterialGame, MaterialItem, MaterialMove, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { TheFirstStepRule } from './rules/TheFirstStepRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class GatsbyRules
  extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
  }

  hidingStrategies = {
    [MaterialType.CharacterTile]: {
      [LocationType.CharacterTile]: hideIdIfRotated
    }
  }

  giveTime(): number {
    return 60
  }
}
const hideIdIfRotated = (item: MaterialItem) => !item.location.rotation? []: ['id']
