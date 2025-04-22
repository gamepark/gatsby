import { MaterialGameSetup } from '@gamepark/rules-api'
import { GatsbyOptions } from './GatsbyOptions'
import { GatsbyRules } from './GatsbyRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class GatsbySetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, GatsbyOptions> {
  Rules = GatsbyRules

  setupMaterial(_options: GatsbyOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
