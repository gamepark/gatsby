/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/gatsby/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseActionHeader } from './ChooseActionHeader'
import { ChooseSpecialActionTileHeader } from './ChooseSpecialActionTileHeader'
import { PlaceTokenOnCabaretHeader } from './PlaceTokenOnCabaretHeader'
import { PlaceTokenOnCabaretNearToLastHeader } from './PlaceTokenOnCabaretNearToLastHeader'
import { PlaceTokenOnCabaretNearToOtherHeader } from './PlaceTokenOnCabaretNearToOtherHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseSpecialActionTile]: ChooseSpecialActionTileHeader,
  [RuleId.PlaceTokenOnCabaret]: PlaceTokenOnCabaretHeader,
  [RuleId.PlaceTokenOnCabaretNearToOther]: PlaceTokenOnCabaretNearToOtherHeader,
  [RuleId.PlaceTokenOnCabaretNearToLast]: PlaceTokenOnCabaretNearToLastHeader,
  [RuleId.ChooseAction]: ChooseActionHeader
}
