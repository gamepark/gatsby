import { getEnumValues } from '@gamepark/rules-api'
import { RuleId } from '../rules/RuleId'

export enum SpecialActionTile {
  SpecialActionTile1 = 1,
  SpecialActionTile2,
  SpecialActionTile3,
  SpecialActionTile4,
  SpecialActionTile5,
  SpecialActionTile6,
  SpecialActionTile7,
  SpecialActionTile8,
  SpecialActionTile9,
  SpecialActionTile10,
  SpecialActionTile11
}

export const specialActionTiles = getEnumValues(SpecialActionTile)

export const ActionsForSpecialActionTiles = {
  [SpecialActionTile.SpecialActionTile1]: [RuleId.PlaceTokenOnRaceTrackAnywhere],
  [SpecialActionTile.SpecialActionTile2]: [RuleId.SwitchInfluenceTokens, RuleId.PlaceTokenOnRaceTrack],
  [SpecialActionTile.SpecialActionTile3]: [RuleId.PlaceTokenOnRaceTrack, RuleId.PlaceTokenOnAnotherRaceTrack, RuleId.PlaceTokenOnAnotherRaceTrack],
  [SpecialActionTile.SpecialActionTile4]: [RuleId.PlaceTokenOnRaceTrack, RuleId.PlaceTokenOnSameRaceTrack],
  [SpecialActionTile.SpecialActionTile5]: [RuleId.ShowTwoCharacterTiles, RuleId.AdvanceInFinanceCenter, RuleId.SwitchInfluenceTokens],
  [SpecialActionTile.SpecialActionTile6]: [RuleId.AdvanceInFinanceCenter, RuleId.AdvanceInFinanceCenter],
  [SpecialActionTile.SpecialActionTile7]: [RuleId.PlaceTokenOnCabaretNearToOther, RuleId.AdvanceInFinanceCenter, RuleId.PlaceTokenOnRaceTrack],
  [SpecialActionTile.SpecialActionTile8]: [RuleId.PlaceTokenOnCabaret],
  [SpecialActionTile.SpecialActionTile9]: [RuleId.PlaceTokenOnCabaretNearToOther, RuleId.SwitchInfluenceTokens],
  [SpecialActionTile.SpecialActionTile10]: [RuleId.PlaceTokenOnCabaretNearToOther, RuleId.PlaceTokenOnCabaretNearToLast, RuleId.PlaceTokenOnCabaretNearToLast],
  [SpecialActionTile.SpecialActionTile11]: [RuleId.PlaceTokenOnCabaretNearToOther, RuleId.PlaceTokenOnCabaretNearToOther]
}
