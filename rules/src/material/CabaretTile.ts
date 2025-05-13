import { getEnumValues } from '@gamepark/rules-api'
import { RuleId } from '../rules/RuleId'

export enum CabaretTile {
  CabaretTile1 = 1,
  CabaretTile2,
  CabaretTile3,
  CabaretTile4
}

export const cabaretTiles = getEnumValues(CabaretTile)

export const BonusByCabaretTiles = {
  [CabaretTile.CabaretTile1]: [RuleId.ChooseActionForOpponent, '', '', '', RuleId.ChooseIfAdvanceInFinanceCenterOrNot, '', 'S', '', RuleId.ShowTwoCharacterTiles],
  [CabaretTile.CabaretTile2]: [RuleId.ShowTwoCharacterTiles, '', '', '', RuleId.ChooseIfAdvanceInFinanceCenterOrNot, 'S', '', '', RuleId.SwitchInfluenceTokens],
  [CabaretTile.CabaretTile3]: [RuleId.SwitchInfluenceTokens, '', RuleId.ChooseIfAdvanceInFinanceCenterOrNot, '', 'S', '', '', '', RuleId.ChooseActionForOpponent],
  [CabaretTile.CabaretTile4]: [RuleId.SwitchInfluenceTokens, '', 'S', '', RuleId.ChooseActionForOpponent, '', '', '', RuleId.ShowTwoCharacterTiles]
}

export const checkIfLocationIsStarCase = (tile: CabaretTile, caseId: number): boolean => {
  return BonusByCabaretTiles[tile][caseId] === 'S'
}
