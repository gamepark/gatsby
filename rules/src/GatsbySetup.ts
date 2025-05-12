import { MaterialGameSetup } from '@gamepark/rules-api'
import { sample, shuffle } from 'lodash'
import { GatsbyOptions } from './GatsbyOptions'
import { GatsbyRules } from './GatsbyRules'
import { cabaretTiles } from './material/CabaretTile'
import { characterScore, characterTiles } from './material/CharacterTile'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { specialActionTiles } from './material/SpecialActionTile'
import { PlayerRole } from './PlayerRole'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class GatsbySetup extends MaterialGameSetup<number, MaterialType, LocationType, GatsbyOptions> {
  Rules = GatsbyRules

  setupMaterial() {
    const dorothyStarts = this.players[0] === PlayerRole.Dorothy
    this.material(MaterialType.ActionToken).createItem({ location: { type: LocationType.ActionSpace, id: dorothyStarts ? 0 : 5, rotation: dorothyStarts } })

    for (let i = 0; i < 4; i++) {
      this.material(MaterialType.RaceFinishedOverlayTile).createItem({ location: { type: LocationType.RaceFinishedDeck } })
    }

    this.setupCabaretTiles()

    this.setupSpecialActionTiles()

    this.setupCharacterTiles()

    this.setupPlayers()
  }

  setupCabaretTiles() {
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
    const tilesToAdd = shuffle(characterTiles).slice(0, 12)

    if (characterScore[tilesToAdd[6]] > characterScore[tilesToAdd[3]]) {
      const oldTileAt6Index = tilesToAdd[6]
      tilesToAdd[6] = tilesToAdd[3]
      tilesToAdd[3] = oldTileAt6Index
    }

    if (characterScore[tilesToAdd[11]] > characterScore[tilesToAdd[7]]) {
      const oldTileAt11Index = tilesToAdd[11]
      tilesToAdd[11] = tilesToAdd[7]
      tilesToAdd[7] = oldTileAt11Index
    }

    tilesToAdd.forEach((tile, index) => {
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
      this.material(MaterialType.InfluenceToken).createItem({
        location: { type: LocationType.PlayerInfluenceTokenPile, player },
        id: player,
        quantity: 20
      })
    }
  }

  start() {
    this.startPlayerTurn(RuleId.ChooseSpecialActionTile, this.players[1])
  }
}
