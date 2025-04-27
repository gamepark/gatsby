/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/gatsby/rules/RuleId'
import { ComponentType } from 'react'
import { AdvanceInFinanceCenterHeader } from './AdvanceInFinanceCenterHeader'
import { ChooseActionHeader } from './ChooseActionHeader'
import { ChooseSpecialActionTileHeader } from './ChooseSpecialActionTileHeader'
import { PlaceTokenOnAnotherRaceTrackHeader } from './PlaceTokenOnAnotherRaceTrackHeader'
import { PlaceTokenOnCabaretHeader } from './PlaceTokenOnCabaretHeader'
import { PlaceTokenOnCabaretNearToLastHeader } from './PlaceTokenOnCabaretNearToLastHeader'
import { PlaceTokenOnCabaretNearToOtherHeader } from './PlaceTokenOnCabaretNearToOtherHeader'
import { PlaceTokenOnCabaretOnStarCaseHeader } from './PlaceTokenOnCabaretOnStarCaseHeader'
import { PlaceTokenOnRaceTrackHeader } from './PlaceTokenOnRaceTrackHeader'
import { ShowAndSwitchTwoCharacterTilesHeader } from './ShowAndSwitchTwoCharacterTilesHeader'
import { SwitchInfluenceTokensHeader } from './SwitchInfluenceTokensHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseSpecialActionTile]: ChooseSpecialActionTileHeader,
  [RuleId.TakeThreeSpecialActionTilesAndChooseOne]: ChooseSpecialActionTileHeader,
  [RuleId.PlaceTokenOnCabaret]: PlaceTokenOnCabaretHeader,
  [RuleId.PlaceTokenOnCabaretOnStarCase]: PlaceTokenOnCabaretOnStarCaseHeader,
  [RuleId.PlaceTokenOnCabaretNearToOther]: PlaceTokenOnCabaretNearToOtherHeader,
  [RuleId.PlaceTokenOnCabaretNearToLast]: PlaceTokenOnCabaretNearToLastHeader,
  [RuleId.AdvanceInFinanceCenter]: AdvanceInFinanceCenterHeader,
  [RuleId.ChooseAction]: ChooseActionHeader,
  [RuleId.PlaceTokenOnRaceTrack]: PlaceTokenOnRaceTrackHeader,
  [RuleId.PlaceTokenOnAnotherRaceTrack]: PlaceTokenOnAnotherRaceTrackHeader,
  [RuleId.ShowAndSwitchTwoCharacterTiles]: ShowAndSwitchTwoCharacterTilesHeader,
  [RuleId.SwitchInfluenceTokens]: SwitchInfluenceTokensHeader
}
