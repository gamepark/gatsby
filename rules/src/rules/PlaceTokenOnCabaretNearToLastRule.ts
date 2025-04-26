import { Location, MaterialMove } from '@gamepark/rules-api'
import { Memory } from './Memory'
import { PlaceTokenOnCabaretRule } from './PlaceTokenOnCabaretRule'

export class PlaceTokenOnCabaretNearToLastRule extends PlaceTokenOnCabaretRule {
  getPossiblePlace() {
    const last: Location | undefined = this.remind(Memory.LastTokenOnCabaretForPlayer, this.player)
    if(last) {
      return this.cabaretHelper.getPlacesNear(last.id as number, last.parent!)
    }
    return []
  }
  onRuleEnd(): MaterialMove[] {
    this.forget(Memory.LastTokenOnCabaretForPlayer, this.player)
    return []
  }
}
