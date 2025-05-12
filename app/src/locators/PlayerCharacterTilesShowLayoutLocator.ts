/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { DropAreaDescription, ItemContext, ListLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { orderBy } from 'lodash'

class PlayerCharacterTilesShowLayoutLocator extends ListLocator {
  gap = { x: 4.5 }
  maxCount = 2
  getCoordinates(location: Location) {
    if (location.player === 1) {
      return { x: -34, y: -4, z: 5 }
    }
    return { x: 30, y: -4, z: 5 }
  }

  getItemIndex(item: MaterialItem, context: ItemContext): number {
    const { player, rules, index } = context
    if (item.location.player === player) {
      const tiles = rules.material(MaterialType.CharacterTile).location(LocationType.PlayerCharacterTilesShowLayout)
      const playerTiles = tiles.player(player)
      const sorted = orderBy(playerTiles.getIndexes(), (index) => -tiles.getItem(index).id)
      return sorted.indexOf(index)
    } else {
      return item.location.x!
    }
  }

  locationDescription = new PlayerCharacterTilesShowLayoutDescription()
}

export class PlayerCharacterTilesShowLayoutDescription extends DropAreaDescription {
  height = 4
  width = 8.5
  borderRadius = 0.5
}

export const playerCharacterTilesShowLayoutLocator = new PlayerCharacterTilesShowLayoutLocator()
