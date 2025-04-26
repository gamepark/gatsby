import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class CharacterTilesHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  checkAndGetFinanceCenterCharacters(moveLocationId: number) {
    const moves: MaterialMove[] = []
    moves.push(...this.checkAndGetFinanceCenterCharacter(moveLocationId, 3, 6))
    moves.push(...this.checkAndGetFinanceCenterCharacter(moveLocationId, 7, 5))
    moves.push(...this.checkAndGetFinanceCenterCharacter(moveLocationId, 10, 4))
    moves.push(...this.checkAndGetFinanceCenterCharacter(moveLocationId, 13, 3))
    return moves
  }

  private checkAndGetFinanceCenterCharacter(moveLocationId: number, financeCenterId: number, characterTileId: number) {
    if (moveLocationId === financeCenterId) {
      const characterTile = this.material(MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === characterTileId)
      if (characterTile.length) {
        return [characterTile.moveItem(({ location }) => ({ type: LocationType.PlayerCharacterTiles, rotation: location.rotation, player: this.player }))]
      }
    }
    return []
  }
}
