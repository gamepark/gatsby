import { MaterialGameSetup } from '@gamepark/rules-api'
import { sample, shuffle } from 'lodash'
import { GatsbyOptions } from './GatsbyOptions'
import { GatsbyRules } from './GatsbyRules'
import { cabaretTiles } from './material/CabaretTile'
import { characterTiles } from './material/CharacterTile'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class GatsbySetup extends MaterialGameSetup<number, MaterialType, LocationType, GatsbyOptions> {
  Rules = GatsbyRules

  setupMaterial(_options: GatsbyOptions) {
    shuffle(cabaretTiles).forEach((tile, index) => {
      const id = index * 10 + sample([1, 3, 5, 7])
      this.material(MaterialType.CabaretTile).createItem({ location: { type: LocationType.CabaretTile, id }, id: tile })
    })

    const returned = [0, 2, 3, 6, 7, 11]
    shuffle(characterTiles)
      .slice(0, 12)
      .forEach((tile, index) => {
        this.material(MaterialType.CharacterTile).createItem({
          location: { type: LocationType.CharacterTile, id: index, rotation: !returned.includes(index) },
          id: tile
        })
      })
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
