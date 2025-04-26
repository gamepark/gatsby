import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class CharacterTilesHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  checkAndGetRaceTrackCharacters(moveLocationId: number, moveLocationX: number) {
    const moves: MaterialMove[] = []
    if ((moveLocationId < 3 && moveLocationX === 4) || (moveLocationId > 2 && moveLocationX === 2)) {
      const characterTile = this.material(MaterialType.CharacterTile).location(
        (loc) => loc.type === LocationType.CharacterSpace && loc.id === 7 + moveLocationId
      )
      const tokensInTrack = this.material(MaterialType.InfluenceToken).location((loc) => loc.type === LocationType.RaceTrack && loc.id === moveLocationId)
      const tokensInTrackIds = tokensInTrack.getItems().map((item) => item.id as number)
      const playerWoWinCharacter = tokensInTrackIds.filter((n) => n === 1).length > tokensInTrackIds.filter((n) => n === 2).length ? 1 : 2
      moves.push(
        characterTile.moveItem(({ location }) => ({ type: LocationType.PlayerCharacterTiles, rotation: location.rotation, player: playerWoWinCharacter }))
      )
      moves.push(...tokensInTrack.moveItems((item) => ({ type: LocationType.PlayerInfluenceTokenPile, player: item.id })))

      const raceFinishedOverlayTiles = this.material(MaterialType.RaceFinishedOverlayTile).location(LocationType.RaceFinishedDeck)
      if (raceFinishedOverlayTiles.length > 0) {
        moves.push(raceFinishedOverlayTiles.maxBy((item) => item.location.x!).moveItem(() => ({ type: LocationType.RaceTrack, id: moveLocationId, x: 2 })))
      }
    }
    return moves
  }

  checkAndGetFinanceCenterCharacters(moveLocationId: number) {
    const moves: MaterialMove[] = []
    moves.push(...this.checkAndGetFinanceCenterCharacter(moveLocationId, 3, 6))
    moves.push(...this.checkAndGetFinanceCenterCharacter(moveLocationId, 7, 5))
    moves.push(...this.checkAndGetFinanceCenterCharacter(moveLocationId, 10, 4))
    moves.push(...this.checkAndGetFinanceCenterCharacter(moveLocationId, 13, 3))
    return moves
  }

  private checkAndGetFinanceCenterCharacter(moveLocationId: number, financeCenterId: number, characterTileId: number) {
    if (moveLocationId === financeCenterId) {
      const characterTile = this.material(MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === characterTileId)
      if (characterTile.length) {
        return [characterTile.moveItem(({ location }) => ({ type: LocationType.PlayerCharacterTiles, rotation: location.rotation, player: this.player }))]
      }
    }
    return []
  }
}
