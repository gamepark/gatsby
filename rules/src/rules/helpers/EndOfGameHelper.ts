import { MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { CharacterColor, characterScore, CharacterTile, getCharacterColor } from '../../material/CharacterTile'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class EndOfGameHelper extends MaterialRulesPart {
  checkEndOfGame(player: number) {
    const playerHasThreeSameColor = this.checkPlayerHasThreeSameColor(player)
    const playerHasAllColors = this.checkPlayerHasAllColors(player)
    const noCharacterTilesLeft = this.checkNoCharacterTilesLeft()
    return playerHasThreeSameColor || playerHasAllColors || noCharacterTilesLeft
  }

  checkPlayerHasThreeSameColor(player: number) {
    const playerCharacterTiles: MaterialItem[] = this.material(MaterialType.CharacterTile).location(LocationType.PlayerCharacterTiles).player(player).getItems()

    if (playerCharacterTiles.length < 3) return false

    const nbCharacterTilesByColor: { color: CharacterColor; nbCharacterTiles: number }[] = []

    for (const characterTile of playerCharacterTiles) {
      const nbCharacterTilesByColorIndex = nbCharacterTilesByColor.findIndex((tile) => tile.color === getCharacterColor(characterTile.id as number))

      if (nbCharacterTilesByColorIndex === -1) {
        nbCharacterTilesByColor.push({ color: getCharacterColor(characterTile.id as number), nbCharacterTiles: 1 })
      } else {
        nbCharacterTilesByColor[nbCharacterTilesByColorIndex].nbCharacterTiles += 1
      }
    }
    return nbCharacterTilesByColor.some((character) => character.nbCharacterTiles === 3)
  }

  checkPlayerHasAllColors(player: number) {
    const playerCharacterTiles: MaterialItem[] = this.material(MaterialType.CharacterTile).location(LocationType.PlayerCharacterTiles).player(player).getItems()

    if (playerCharacterTiles.length < 5) return false

    const characterTilesColors = new Set()

    for (const characterTile of playerCharacterTiles) {
      characterTilesColors.add(getCharacterColor(characterTile.id as number))
    }
    return characterTilesColors.size === 5
  }

  getScore(player: number) {
    const playerCharacterTiles: MaterialItem[] = this.material(MaterialType.CharacterTile).location(LocationType.PlayerCharacterTiles).player(player).getItems()
    const playerSpecialActionTiles: MaterialItem[] = this.material(MaterialType.SpecialActionTile)
      .location(LocationType.PlayerSpecialTilesDiscard)
      .player(player)
      .getItems()

    let score = 0
    for (const characterTile of playerCharacterTiles) {
      score += characterScore[characterTile.id as CharacterTile]
    }

    return score + playerSpecialActionTiles.length
  }

  checkNoCharacterTilesLeft() {
    return this.material(MaterialType.CharacterTile).location(LocationType.CharacterSpace).length === 0
  }

  rankPlayers(playerA: number, playerB: number) {
    if (this.checkPlayerHasThreeSameColor(playerA) || this.checkPlayerHasAllColors(playerA)) return -1
    if (this.checkPlayerHasThreeSameColor(playerB) || this.checkPlayerHasAllColors(playerB)) return 1
    if (this.getScore(playerA) > this.getScore(playerB)) return -1
    if (this.getScore(playerB) > this.getScore(playerA)) return 1
    return 0
  }
}
