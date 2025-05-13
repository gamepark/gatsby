import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ShowTwoCharacterTilesRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(
      ...this.characterTilesInBoard.moveItems(({ location }) => ({
        type: LocationType.PlayerCharacterTilesShowLayout,
        rotation: location.rotation,
        player: this.player
      }))
    )
    if (this.characterTilesInShowingLayout.length === 0) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.PlayerCharacterTilesShowLayout) {
      const oldLocation = this.material(MaterialType.CharacterTile).index(move.itemIndex).getItem()?.location
      if (oldLocation) {
        const characterTilesLocations: Location[] | undefined = this.remind(Memory.CharacterTilesLocations) ?? []
        this.memorize(Memory.CharacterTilesLocations, [...characterTilesLocations, oldLocation])
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.PlayerCharacterTilesShowLayout) {
      if (this.characterTilesInShowingLayout.length === 2) {
        const moves: MaterialMove[] = [this.startRule(RuleId.ReplaceCharacterTiles)]
        if (this.characterTilesInShowingLayout.getItems().every((item) => item.location.rotation)) {
          moves.push(this.characterTilesInShowingLayout.shuffle())
        }
        return moves
      }
    }
    return []
  }

  get characterTilesInShowingLayout() {
    return this.material(MaterialType.CharacterTile).location(LocationType.PlayerCharacterTilesShowLayout).player(this.player)
  }

  get characterTilesInBoard() {
    return this.material(MaterialType.CharacterTile).location(LocationType.CharacterSpace)
  }
}
