import { getEnumValues } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'

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
