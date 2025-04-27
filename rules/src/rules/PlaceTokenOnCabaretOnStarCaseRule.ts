import { Location } from '@gamepark/rules-api'
import { CabaretTile, checkIfLocationIsStarCase } from '../material/CabaretTile'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlaceTokenOnCabaretRule } from './PlaceTokenOnCabaretRule'

export class PlaceTokenOnCabaretOnStarCaseRule extends PlaceTokenOnCabaretRule {
  getPossiblePlace() {
    const res: Location[] = []
    this.material(MaterialType.CabaretTile)
      .getIndexes()
      .forEach((tileIndex) => {
        for (let i = 0; i < 9; i++) {
          const tile = this.material(MaterialType.CabaretTile).index(tileIndex).getItem()?.id as CabaretTile
          const isStarCase = checkIfLocationIsStarCase(tile, i)
          if (isStarCase) {
            res.push({ type: LocationType.CabaretTokenSpace, id: i, parent: tileIndex })
          }
        }
      })
    return res
  }
}
