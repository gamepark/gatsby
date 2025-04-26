import { Location, MaterialMove } from '@gamepark/rules-api'
import { Memory } from './Memory'
import { PlaceTokenOnCabaretRule } from './PlaceTokenOnCabaretRule'

export class PlaceTokenOnCabaretNearToLastRule extends PlaceTokenOnCabaretRule {
  getPossiblePlace() {
    const last: Location = this.remind(Memory.LastTokenOnCabaretForPlayer, this.player)
    return this.cabaretHelper.getPlacesNear(last.id as number, last.parent!)
  }
  onRuleEnd(): MaterialMove[] {
    this.forget(Memory.LastTokenOnCabaretForPlayer, this.player)
    return []
  }
}
