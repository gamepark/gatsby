import { getEnumValues } from '@gamepark/rules-api'

export enum CabaretTile {
  CabaretTile1 = 1,
  CabaretTile2,
  CabaretTile3,
  CabaretTile4
}

export const cabaretTiles = getEnumValues(CabaretTile)

export const casesByCabaretTiles = {
  [CabaretTile.CabaretTile1]: ['', '', '', '', '', '', 'S', '', ''],
  [CabaretTile.CabaretTile2]: ['', '', '', '', '', 'S', '', '', ''],
  [CabaretTile.CabaretTile3]: ['', '', '', '', 'S', '', '', '', ''],
  [CabaretTile.CabaretTile4]: ['', '', 'S', '', '', '', '', '', '']
}

export const checkIfLocationIsStarCase = (tile: CabaretTile, caseId: number): boolean => {
  return casesByCabaretTiles[tile][caseId] === 'S'
}
