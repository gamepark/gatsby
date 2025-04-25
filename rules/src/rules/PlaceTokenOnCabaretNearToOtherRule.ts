import { Location } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlaceTokenOnCabaretRule } from './PlaceTokenOnCabaretRule'

export class PlaceTokenOnCabaretNearToOtherRule extends PlaceTokenOnCabaretRule {
  getPossiblePlace() {
    const places: Location[] = []
    this.tokensInCabaretTiles.getItems().forEach((item) => {
      places.push(...this.cabaretHelper.getPlacesNear(item.location.id as number, item.location.parent!))
    })
    return places
  }

  get tokensInCabaretTiles() {
    return this.material(MaterialType.InfluenceToken).location(LocationType.CabaretTokenSpace)
  }
}
