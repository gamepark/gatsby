import { getEnumValues } from '@gamepark/rules-api'

export enum CabaretTile {
  CabaretTile1 = 1,
  CabaretTile2,
  CabaretTile3,
  CabaretTile4
}

export const cabaretTiles = getEnumValues(CabaretTile)
