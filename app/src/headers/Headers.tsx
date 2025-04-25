/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/gatsby/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseActionHeader } from './ChooseActionHeader'
import { ChooseSpecialActionTileHeader } from './ChooseSpecialActionTileHeader'
import { PlaceTokenOnCabaretHeader } from './PlaceTokenOnCabaretHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseSpecialActionTile]: ChooseSpecialActionTileHeader,
  [RuleId.PlaceTokenOnCabaret]: PlaceTokenOnCabaretHeader,
  [RuleId.ChooseAction]: ChooseActionHeader
}
