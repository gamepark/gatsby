/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, Location, MaterialItem, MaterialMove, XYCoordinates } from '@gamepark/rules-api'
import { CabaretHelp } from '../material/help/CabaretHelp'

class CabaretTokenSpaceLocator extends Locator {
  parentItemType = MaterialType.CabaretTile

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(MaterialType.CabaretTile).index(location.parent).getItem()
  }

  getPositionOnParent(location: Location): XYCoordinates {
    const line = Math.floor(location.id / 3)
    const column = location.id - 3 * line
    const baseX = 16.4
    const deltaX = 32.4
    const x = baseX + deltaX * column
    const baseY = 16.4
    const deltaY = 32.4
    const y = baseY + deltaY * line
    return { x, y }
  }

  locationDescription = new CabaretTokenSpaceDescription()
}

export class CabaretTokenSpaceDescription extends DropAreaDescription {
  height = 1.5
  width = 1.5
  borderRadius = 1

  help = CabaretHelp

  canShortClick(move: MaterialMove, location: Location): boolean {
    return (
      isMoveItemType(MaterialType.InfluenceToken)(move) &&
      move.location.type === location.type &&
      move.location.parent === location.parent &&
      move.location.id === location.id
    )
  }
}

export const cabaretTokenSpaceLocator = new CabaretTokenSpaceLocator()
