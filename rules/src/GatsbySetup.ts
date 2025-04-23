import { MaterialGameSetup } from '@gamepark/rules-api'
import { sample, shuffle } from 'lodash'
import { GatsbyOptions } from './GatsbyOptions'
import { GatsbyRules } from './GatsbyRules'
import { cabaretTiles } from './material/CabaretTile'
import { characterTiles } from './material/CharacterTile'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { specialActionTiles } from './material/SpecialActionTile'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class GatsbySetup extends MaterialGameSetup<number, MaterialType, LocationType, GatsbyOptions> {
  Rules = GatsbyRules

  setupMaterial(_options: GatsbyOptions) {
    this.material(MaterialType.ActionToken).createItem({ location: { type: LocationType.ActionTokenIdle }, id: 1 })

    for (let i = 0; i < 4; i++) {
      this.material(MaterialType.RaceFinishedOverlayTile).createItem({ location: { type: LocationType.RaceFinishedDeck } })
    }

    this.setupCabaretTiles()

    this.setupSpecialActionTiles()

    this.setupCharacterTiles()

    this.setupPlayers()
  }

  private setupCabaretTiles() {
    shuffle(cabaretTiles).forEach((tile, index) => {
      const id = index * 10 + sample([1, 3, 5, 7])
      this.material(MaterialType.CabaretTile).createItem({ location: { type: LocationType.CabaretSpace, id }, id: tile })
    })
  }

  private setupSpecialActionTiles() {
    shuffle(specialActionTiles).forEach((tile) => {
      this.material(MaterialType.SpecialActionTile).createItem({ location: { type: LocationType.SpecialActionDeck }, id: tile })
    })
  }

  private setupCharacterTiles() {
    const returned = [0, 2, 3, 6, 7, 11]
    shuffle(characterTiles)
      .slice(0, 12)
      .forEach((tile, index) => {
        this.material(MaterialType.CharacterTile).createItem({
          location: { type: LocationType.CharacterSpace, id: index, rotation: !returned.includes(index) },
          id: tile
        })
      })
  }

  private setupPlayers() {
    for (const player of this.players) {
      this.material(MaterialType.AscensionToken).createItem({
        location: { type: LocationType.FinanceCenter, id: 0, player },
        id: player
      })
      for (let i = 0; i < 21; i++) {
        this.material(MaterialType.InfluenceToken).createItem({
          location: { type: LocationType.PlayerInfluenceTokenPile, player },
          id: player
        })
      }
    }
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
