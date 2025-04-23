import { getEnumValues } from '@gamepark/rules-api'

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