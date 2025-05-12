import { PlaceTokenOnCabaretRule } from './PlaceTokenOnCabaretRule'

export class PlaceTokenOnCabaretNearToLastRule extends PlaceTokenOnCabaretRule {
  getPossiblePlace() {
    return this.cabaretHelper.getPossiblePlaceNearToLast()
  }
}
