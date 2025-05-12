import { PlaceTokenOnCabaretRule } from './PlaceTokenOnCabaretRule'

export class PlaceTokenOnCabaretOnStarCaseRule extends PlaceTokenOnCabaretRule {
  getPossiblePlace() {
    return this.cabaretHelper.getPossibleStarPlace()
  }
}
