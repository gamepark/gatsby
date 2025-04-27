import { PlaceTokenOnCabaretRule } from './PlaceTokenOnCabaretRule'

export class PlaceTokenOnCabaretNearToOtherRule extends PlaceTokenOnCabaretRule {
  getPossiblePlace() {
    return this.cabaretHelper.getPossiblePlaceNearToOtherTokens()
  }
}
