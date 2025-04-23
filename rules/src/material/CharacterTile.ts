import { getEnumValues } from '@gamepark/rules-api'

export enum CharacterTile {
  Yellow1 = 10,
  Yellow2,
  Yellow3,
  Purple1 = 20,
  Purple2,
  Purple3,
  Brown1 = 30,
  Brown2,
  Brown3,
  Blue1 = 40,
  Blue2,
  Blue3,
  Black1 = 50,
  Black2,
  Black3
}

export enum CharacterColor {
  Yellow = 1,
  Purple,
  Brown,
  Blue,
  Black
}

export const getCharacterColor = (tile: CharacterTile) => Math.floor(tile / 10) as CharacterColor

export const characterTiles = getEnumValues(CharacterTile)

export const characterScore = {
  [CharacterTile.Yellow1]: 3,
  [CharacterTile.Yellow2]: 0,
  [CharacterTile.Yellow3]: 2,
  [CharacterTile.Purple1]: 2,
  [CharacterTile.Purple2]: 1,
  [CharacterTile.Purple3]: 2,
  [CharacterTile.Brown1]: 3,
  [CharacterTile.Brown2]: 1,
  [CharacterTile.Brown3]: 1,
  [CharacterTile.Blue1]: 2,
  [CharacterTile.Blue2]: 1,
  [CharacterTile.Blue3]: 2,
  [CharacterTile.Black1]: 2,
  [CharacterTile.Black2]: 3,
  [CharacterTile.Black3]: 0
}
