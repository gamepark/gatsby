import { MaterialGameSetup } from '@gamepark/rules-api'
import { sample, shuffle } from 'lodash'
import { GatsbyOptions } from './GatsbyOptions'
import { GatsbyRules } from './GatsbyRules'
import { cabaretTiles } from './material/CabaretTile'
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
    shuffle(cabaretTiles).forEach((tile, index) => {
      const id = index * 10 + sample([1, 3, 5, 7])
      this.material(MaterialType.CabaretTile).createItem({ location: { type: LocationType.CabaretTile, id }, id: tile })
    })
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
