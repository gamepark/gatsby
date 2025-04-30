import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { NextRuleHelper } from './NextRuleHelper'

export class FinanceCenterHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  checkAndGetFinanceCenterCharacters() {
    const playerAscensionTokenLocationId = this.material(MaterialType.AscensionToken).player(this.player).getItem()?.location.id as number
    const moves: MaterialMove[] = []
    moves.push(...this.checkAndGetFinanceCenterCharacter(playerAscensionTokenLocationId, 3, 6))
    moves.push(...this.checkAndGetFinanceCenterCharacter(playerAscensionTokenLocationId, 7, 5))
    moves.push(...this.checkAndGetFinanceCenterCharacter(playerAscensionTokenLocationId, 10, 4))
    moves.push(...this.checkAndGetFinanceCenterCharacter(playerAscensionTokenLocationId, 13, 3))
    return moves
  }

  checkBonus(moveLocationId: number) {
    this.getBonus(moveLocationId)
    const nbCases = this.remind(Memory.NbCasesToAdd)
    if (nbCases === 2) {
      this.getBonus(moveLocationId - 1)
    }
  }

  private getBonus(moveLocationId: number) {
    if (moveLocationId === 3 && this.checkIfCharacterTileIsNotTaked(6)) return
    if (moveLocationId === 7 && this.checkIfCharacterTileIsNotTaked(5)) return
    if (moveLocationId === 10 && this.checkIfCharacterTileIsNotTaked(4)) return
    const locationBonus = bonus[moveLocationId]
    new NextRuleHelper(this.game).addActionSpecialInNextRules(locationBonus)
  }

  private checkAndGetFinanceCenterCharacter(moveLocationId: number, financeCenterId: number, characterTileId: number) {
    if (moveLocationId === financeCenterId || moveLocationId === financeCenterId + 1) {
      const characterTile = this.material(MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === characterTileId)
      if (characterTile.length) {
        return [characterTile.moveItem(({ location }) => ({ type: LocationType.PlayerCharacterTiles, rotation: location.rotation, player: this.player }))]
      }
    }
    return []
  }

  private checkIfCharacterTileIsNotTaked(characterTileId: number) {
    const characterTile = this.material(MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === characterTileId)
    return characterTile.length !== 0
  }
}

const bonus = [
  '',
  RuleId.ShowTwoCharacterTiles,
  '',
  RuleId.PlaceTokenOnCabaretOrRaceTrack,
  '',
  RuleId.SwitchInfluenceTokens,
  '',
  RuleId.PlaceTokenOnCabaretOrRaceTrack,
  '',
  RuleId.ChooseActionForOpponent,
  RuleId.PlaceTokenOnCabaretOrRaceTrack,
  '',
  RuleId.SwitchInfluenceTokens,
  ''
]
