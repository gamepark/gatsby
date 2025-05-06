import { GatsbySetup } from '@gamepark/gatsby/GatsbySetup'
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'

export const me = 1
export const opponent = 2
export class TutorialSetup extends GatsbySetup {
  setupCabaretTiles() {
    this.material(MaterialType.CabaretTile).createItem({ location: { type: LocationType.CabaretSpace, id: 1 }, id: 3 })
    this.material(MaterialType.CabaretTile).createItem({ location: { type: LocationType.CabaretSpace, id: 13 }, id: 1 })
    this.material(MaterialType.CabaretTile).createItem({ location: { type: LocationType.CabaretSpace, id: 25 }, id: 2 })
    this.material(MaterialType.CabaretTile).createItem({ location: { type: LocationType.CabaretSpace, id: 33 }, id: 4 })
  }
}
