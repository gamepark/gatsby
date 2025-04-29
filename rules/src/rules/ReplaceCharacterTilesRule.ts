import { isMoveItem, ItemMove, Location, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { ShowTwoCharacterTilesRule } from './ShowTwoCharacterTilesRule'

export class ReplaceCharacterTilesRule extends ShowTwoCharacterTilesRule {
  getPlayerMoves(): MaterialMove[] {
    return this.movesToCharacterSpaces()
  }

  movesToCharacterSpaces(): MaterialMove[] {
    const characterTilesLocations: Location[] | undefined = this.remind(Memory.CharacterTilesLocations) ?? []
    const moves: MaterialMove[] = []
    characterTilesLocations
      .filter((loc) => this.checkIfCharacterSpaceIsFree(loc.id as number))
      .forEach((location) => {
        moves.push(...this.characterTilesInShowingLayout.moveItems((item) => ({ ...location, rotation: item.location.rotation })))
      })
    return moves
  }

  checkIfCharacterSpaceIsFree(locationId: number): boolean {
    return this.material(MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === locationId).length === 0
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.CharacterSpace) {
      if(this.characterTilesInShowingLayout.length === 0) {
        return this.nextRuleHelper.moveToNextRule(this.nextPlayer)
      }
      return this.movesToCharacterSpaces()
    }
    return []
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(Memory.CharacterTilesLocations)
    return []
  }
}
