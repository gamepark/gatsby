import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ShowTwoCharacterTilesRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    return this.characterTilesInBoard.moveItems(({ location }) => ({
      type: LocationType.PlayerCharacterTilesShowLayout,
      rotation: location.rotation,
      player: this.player
    }))
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
        return [this.startRule(RuleId.ReplaceCharacterTiles)]
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
