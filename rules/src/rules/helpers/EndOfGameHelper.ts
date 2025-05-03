import { MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { CharacterColor, characterScore, CharacterTile, getCharacterColor } from '../../material/CharacterTile'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class EndOfGameHelper extends MaterialRulesPart {
  checkEndOfGame(player: number) {
    const playerHasThreeSameColor = this.checkPlayerHasThreeSameColor(player)
    const playerHasAllColors = this.checkPlayerHasAllColors(player)
    const noCharacterTilesLeft = this.checkNoCharacterTilesLeft()
    if (playerHasThreeSameColor || playerHasAllColors || noCharacterTilesLeft) {
      return [this.material(MaterialType.CharacterTile).moveItemsAtOnce({ rotation: false }), this.endGame()]
    }
    return []
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
    const actionSpaceId = player === 1 ? 0 : 5
    const specialActionTileInActionSpace: MaterialItem[] = this.material(MaterialType.SpecialActionTile)
      .location((loc) => loc.type === LocationType.ActionSpace && loc.id === actionSpaceId)
      .getItems()

    let score = 0
    for (const characterTile of playerCharacterTiles) {
      if (characterTile.id) {
        score += characterScore[characterTile.id as CharacterTile]
      }
    }

    return score + playerSpecialActionTiles.length + specialActionTileInActionSpace.length
  }

  getPlayerCharacterTiles(player: number) {
    const playerCharacterTiles: MaterialItem[] = this.material(MaterialType.CharacterTile).location(LocationType.PlayerCharacterTiles).player(player).getItems()
    return playerCharacterTiles.length
  }

  checkNoCharacterTilesLeft() {
    return this.checkNoCharacterTilesLeftInCabaret() || this.checkNoCharacterTilesLeftInFincanceCenter() || this.checkNoCharacterTilesLeftInRaceTrack()
  }

  checkNoCharacterTilesLeftInCabaret() {
    const cabaretCharacterSpacesIds = [0, 1, 2]
    return (
      this.material(MaterialType.CharacterTile).location(
        (loc) => loc.type === LocationType.CharacterSpace && cabaretCharacterSpacesIds.includes(loc.id as number)
      ).length === 0
    )
  }

  checkNoCharacterTilesLeftInFincanceCenter() {
    const financeCenterCharacterSpacesIds = [3, 4, 5, 6]
    return (
      this.material(MaterialType.CharacterTile).location(
        (loc) => loc.type === LocationType.CharacterSpace && financeCenterCharacterSpacesIds.includes(loc.id as number)
      ).length === 0
    )
  }

  checkNoCharacterTilesLeftInRaceTrack() {
    const raceTrackCharacterSpacesIds = [7, 8, 9, 10, 11]
    return (
      this.material(MaterialType.CharacterTile).location(
        (loc) => loc.type === LocationType.CharacterSpace && raceTrackCharacterSpacesIds.includes(loc.id as number)
      ).length === 0
    )
  }

  rankPlayers(playerA: number, playerB: number) {
    if (this.checkPlayerHasThreeSameColor(playerA) || this.checkPlayerHasAllColors(playerA)) return -1
    if (this.checkPlayerHasThreeSameColor(playerB) || this.checkPlayerHasAllColors(playerB)) return 1
    if (this.getScore(playerA) > this.getScore(playerB)) return -1
    if (this.getScore(playerB) > this.getScore(playerA)) return 1
    if (this.getPlayerCharacterTiles(playerA) > this.getPlayerCharacterTiles(playerB)) return -1
    if (this.getPlayerCharacterTiles(playerB) > this.getPlayerCharacterTiles(playerA)) return 1
    return 0
  }
}
