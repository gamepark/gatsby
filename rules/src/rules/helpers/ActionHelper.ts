import { getEnumValues, Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class ActionHelper extends MaterialRulesPart {
  playerWhoPlayActions?: number

  constructor(game: MaterialGame, playerWhoPlayActions: number) {
    super(game)
    this.playerWhoPlayActions = playerWhoPlayActions
  }

  getPossiblePlaces() {
    const res: Location[] = []
    for (const actionType of actionTypes) {
      const actionTokenIsNotAlreadyInSpace =
        this.material(MaterialType.ActionToken).location((loc) => loc.type === LocationType.ActionSpace && loc.id === actionType).length === 0
      if (actionTokenIsNotAlreadyInSpace) {
        res.push({ type: LocationType.ActionSpace, id: actionType })
      }
    }

    const firstPlayerSpecialActionSpace = this.getSpecialActionSpace(1, 0)
    const secondPlayerSpecialActionSpace = this.getSpecialActionSpace(2, 5)

    if (firstPlayerSpecialActionSpace) res.push(firstPlayerSpecialActionSpace)
    if (secondPlayerSpecialActionSpace) res.push(secondPlayerSpecialActionSpace)

    return res
  }

  getSpecialActionSpace(player: number, id: number) {
    if (this.playerWhoPlayActions !== player) return null

    const actionTokenIsNotAlreadyInSpace =
      this.material(MaterialType.ActionToken).location((loc) => loc.type === LocationType.ActionSpace && loc.id === id).length === 0
    const specialActionTileIsInSpace = this.getSpecialActionTile(id).length === 1
    if (actionTokenIsNotAlreadyInSpace && specialActionTileIsInSpace) {
      return { type: LocationType.ActionSpace, id: id, x: 1 }
    }
    return null
  }

  getSpecialActionTile(locationId: number) {
    return this.material(MaterialType.SpecialActionTile).location((loc) => loc.type === LocationType.ActionSpace && loc.id === locationId)
  }
}

export enum ActionType {
  PlaceTwoTokenInCabaret = 1,
  PlaceOneTokenInCabaretAndAdvanceInFinanceCenter,
  AdvanceInFinanceCenterAndPlaceTokenInRaceTrack,
  PlaceTwoTokenInRaceTrack
}

export const actionTypes = getEnumValues(ActionType)

export const rulesForAction = {
  [ActionType.PlaceTwoTokenInCabaret]: [RuleId.PlaceTokenOnCabaretNearToOther, RuleId.PlaceTokenOnCabaretNearToLast],
  [ActionType.PlaceOneTokenInCabaretAndAdvanceInFinanceCenter]: [RuleId.PlaceTokenOnCabaretNearToOther, RuleId.AdvanceInFinanceCenter],
  [ActionType.AdvanceInFinanceCenterAndPlaceTokenInRaceTrack]: [RuleId.AdvanceInFinanceCenter, RuleId.PlaceTokenOnRaceTrack],
  [ActionType.PlaceTwoTokenInRaceTrack]: [RuleId.PlaceTokenOnRaceTrack, RuleId.PlaceTokenOnAnotherRaceTrack]
}
