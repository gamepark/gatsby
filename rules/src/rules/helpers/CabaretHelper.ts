import { Location, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { uniqWith } from 'lodash'
import { CabaretTile, BonusByCabaretTiles, checkIfLocationIsStarCase } from '../../material/CabaretTile'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { NextRuleHelper } from './NextRuleHelper'

interface CasesIdFromRotation {
  [Rotation.Rotation1]: number[]
  [Rotation.Rotation3]: number[]
  [Rotation.Rotation5]: number[]
  [Rotation.Rotation7]: number[]
}

export class CabaretHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getPossiblePlace() {
    const res: Location[] = []
    this.material(MaterialType.CabaretTile)
      .getIndexes()
      .forEach((tile) => {
        for (let i = 0; i < 9; i++) {
          const hasNotAlreadyTokenPlaced = this.checkIfPlaceIsEmpty({ id: i, parent: tile } as Location)
          if (hasNotAlreadyTokenPlaced) {
            res.push({ type: LocationType.CabaretTokenSpace, id: i, parent: tile })
          }
        }
      })
    return res
  }

  getPossiblePlaceNearToLast() {
    const last: Location | undefined = this.remind(Memory.LastTokenOnCabaretForPlayer, this.player)
    if (last) {
      return this.getPlacesNear(last.id as number, last.parent!).filter((place) => this.checkIfPlaceIsEmpty(place))
    }
    return []
  }

  getPossibleStarPlace() {
    const res: Location[] = []
    this.material(MaterialType.CabaretTile)
      .getIndexes()
      .forEach((tileIndex) => {
        for (let i = 0; i < 9; i++) {
          const tile = this.material(MaterialType.CabaretTile).index(tileIndex).getItem()?.id as CabaretTile
          const isStarCase = checkIfLocationIsStarCase(tile, i)
          if (isStarCase) {
            res.push({ type: LocationType.CabaretTokenSpace, id: i, parent: tileIndex })
          }
        }
      })
    return res
  }

  getPossiblePlaceNearToOtherTokens() {
    const places: Location[] = []
    this.tokensInCabaretTiles.getItems().forEach((item) => {
      places.push(...this.getPlacesNear(item.location.id as number, item.location.parent!).filter((place) => this.checkIfPlaceIsEmpty(place)))
    })
    return uniqWith(places, (a, b) => a.parent === b.parent && a.id === b.id)
  }

  get tokensInCabaretTiles() {
    return this.material(MaterialType.InfluenceToken).location(LocationType.CabaretTokenSpace)
  }

  getPlacesNear(id: number, parent: number): Location[] {
    if (id === 4) {
      return [
        { type: LocationType.CabaretTokenSpace, id: 1, parent },
        { type: LocationType.CabaretTokenSpace, id: 3, parent },
        { type: LocationType.CabaretTokenSpace, id: 5, parent },
        { type: LocationType.CabaretTokenSpace, id: 7, parent }
      ]
    }
    const parentRotation = this.material(MaterialType.CabaretTile).location(LocationType.CabaretSpace).index(parent).getItem()?.location.id % 10
    const tilesNextOfRotation = tokenPlacesNearToOtherTiles[parent][parentRotation as Rotation]
    const tileNearOfToken = []
    for (const tile in tilesNextOfRotation) {
      const placesInTile = tilesNextOfRotation[+tile as TileIndex] ?? []
      const index = placesInTile.indexOf(id)
      if (index !== -1) {
        tileNearOfToken.push({ tile: +tile, index })
      }
    }
    const places: Location[] = []

    tileNearOfToken.forEach((tile) => {
      const rotation = this.material(MaterialType.CabaretTile).location(LocationType.CabaretSpace).index(tile.tile).getItem()?.location.id % 10
      const placesInTile = tokenPlacesNearToOtherTiles[tile.tile][rotation as Rotation][parent as TileIndex] ?? []
      if (placesInTile.length !== 0) {
        places.push({ type: LocationType.CabaretTokenSpace, id: placesInTile[tile.index], parent: tile.tile })
      }
    })
    switch (id) {
      case 0:
        places.push({ type: LocationType.CabaretTokenSpace, id: 1, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 3, parent })
        break
      case 1:
        places.push({ type: LocationType.CabaretTokenSpace, id: 0, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 2, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 4, parent })
        break
      case 2:
        places.push({ type: LocationType.CabaretTokenSpace, id: 1, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 5, parent })
        break
      case 3:
        places.push({ type: LocationType.CabaretTokenSpace, id: 0, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 4, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 6, parent })
        break
      case 5:
        places.push({ type: LocationType.CabaretTokenSpace, id: 2, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 4, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 8, parent })
        break
      case 6:
        places.push({ type: LocationType.CabaretTokenSpace, id: 3, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 7, parent })
        break
      case 7:
        places.push({ type: LocationType.CabaretTokenSpace, id: 6, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 4, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 8, parent })
        break
      case 8:
        places.push({ type: LocationType.CabaretTokenSpace, id: 5, parent })
        places.push({ type: LocationType.CabaretTokenSpace, id: 7, parent })
        break
      default:
        break
    }

    return places
  }

  checkIfPlaceIsEmpty(location: Location) {
    return (
      this.material(MaterialType.InfluenceToken).location(
        (loc) => loc.type === LocationType.CabaretTokenSpace && loc.parent === location.parent && loc.id === location.id
      ).length === 0
    )
  }

  checkIfPlayerTokenIsInPlace(location: Location, player: number) {
    return (
      this.material(MaterialType.InfluenceToken)
        .location((loc) => loc.type === LocationType.CabaretTokenSpace && loc.parent === location.parent && loc.id === location.id)
        .id(player).length > 0
    )
  }

  checkAnGetCharacters(player = this.player!) {
    const moves: MaterialMove[] = []
    moves.push(...this.checkAnGetStarCharacter(player))
    moves.push(...this.checkAndGetRightCharacter(player))
    moves.push(...this.checkAndGetLeftCharacter(player))
    return moves
  }

  checkAnGetStarCharacter(player: number) {
    const playerTokenInStarCases = this.material(MaterialType.InfluenceToken)
      .id(player)
      .location(LocationType.CabaretTokenSpace)
      .filter((item) => {
        const tile = this.material(MaterialType.CabaretTile).index(item.location.parent).getItem()?.id as CabaretTile
        return checkIfLocationIsStarCase(tile, item.location.id as number)
      }).length

    if (playerTokenInStarCases === 4) {
      const characterTile = this.material(MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === 1)
      if (characterTile.length) {
        return [characterTile.moveItem(({ location }) => ({ type: LocationType.PlayerCharacterTiles, rotation: location.rotation, player: player }))]
      }
    }
    return []
  }

  checkAndGetRightCharacter(player: number) {
    const startTilesIndexs = [0, 1]
    const endTilesIndexs = [2, 3]
    const startCasesIds = {
      [Rotation.Rotation1]: [0, 3, 6],
      [Rotation.Rotation3]: [6, 7, 8],
      [Rotation.Rotation5]: [2, 5, 8],
      [Rotation.Rotation7]: [0, 1, 2]
    }
    const endCasesIds = {
      [Rotation.Rotation1]: [2, 5, 8],
      [Rotation.Rotation3]: [0, 1, 2],
      [Rotation.Rotation5]: [0, 3, 6],
      [Rotation.Rotation7]: [6, 7, 8]
    }

    const characterTile = this.material(MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === 2)
    if (characterTile.length) {
      if (this.checkPath(player, startCasesIds, startTilesIndexs, endCasesIds, endTilesIndexs)) {
        return [characterTile.moveItem(({ location }) => ({ type: LocationType.PlayerCharacterTiles, rotation: location.rotation, player: player }))]
      }
    }

    return []
  }

  checkAndGetLeftCharacter(player: number) {
    const startTilesIndexs = [1, 2]
    const endTilesIndexs = [0, 3]
    const startCasesIds = {
      [Rotation.Rotation1]: [0, 1, 2],
      [Rotation.Rotation3]: [0, 3, 6],
      [Rotation.Rotation5]: [6, 7, 8],
      [Rotation.Rotation7]: [2, 5, 8]
    }
    const endCasesIds = {
      [Rotation.Rotation1]: [6, 7, 8],
      [Rotation.Rotation3]: [2, 5, 8],
      [Rotation.Rotation5]: [0, 1, 2],
      [Rotation.Rotation7]: [0, 3, 6]
    }

    const characterTile = this.material(MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === 0)
    if (characterTile.length) {
      if (this.checkPath(player, startCasesIds, startTilesIndexs, endCasesIds, endTilesIndexs)) {
        return [characterTile.moveItem(({ location }) => ({ type: LocationType.PlayerCharacterTiles, rotation: location.rotation, player: player }))]
      }
    }

    return []
  }

  checkPath(player: number, startCasesIds: CasesIdFromRotation, startTilesIndexs: number[], endCasesIds: CasesIdFromRotation, endTilesIndexs: number[]) {
    const playerTokensInStartCases = this.material(MaterialType.InfluenceToken)
      .location((loc) => {
        const parentRotation = this.material(MaterialType.CabaretTile).location(LocationType.CabaretSpace).index(loc.parent).getItem()?.location.id % 10
        const startCaseIdsForRotation = startCasesIds[parentRotation as Rotation]
        return loc.type === LocationType.CabaretTokenSpace && startTilesIndexs.includes(loc.parent!) && startCaseIdsForRotation.includes(loc.id as number)
      })
      .id(player)
      .getItems()

    if (playerTokensInStartCases.length === 0) return false

    const playerTokenPath: Location[] = playerTokensInStartCases.map((item) => item.location)

    for (const location of playerTokenPath) {
      const placesNear = this.getPlacesNear(location.id as number, location.parent!).filter((loc) => this.checkIfPlayerTokenIsInPlace(loc, player))
      placesNear.forEach((place) => {
        if (!playerTokenPath.find((loc) => loc.id === place.id && loc.parent === place.parent)) {
          playerTokenPath.push(place)
        }
      })
    }

    return (
      playerTokenPath.filter((loc) => {
        const parentRotation = this.material(MaterialType.CabaretTile).location(LocationType.CabaretSpace).index(loc.parent).getItem()?.location.id % 10
        const endCaseIdsForRotation = endCasesIds[parentRotation as Rotation]
        return loc.type === LocationType.CabaretTokenSpace && endTilesIndexs.includes(loc.parent!) && endCaseIdsForRotation.includes(loc.id as number)
      }).length > 0
    )
  }

  getBonus(moveLocationParent: number, moveLocationId: number) {
    const tile = this.material(MaterialType.CabaretTile).index(moveLocationParent).getItem()?.id as CabaretTile
    const locationBonus = BonusByCabaretTiles[tile][moveLocationId]
    if (new NextRuleHelper(this.game).addActionSpecialInNextRules(locationBonus)) {
      return locationBonus
    }
    return null
  }
}

enum Rotation {
  Rotation1 = 1,
  Rotation3 = 3,
  Rotation5 = 5,
  Rotation7 = 7
}

enum TileIndex {
  TileIndex0,
  TileIndex1,
  TileIndex2,
  TileIndex3
}

const tokenPlacesNearToOtherTiles = [
  {
    [Rotation.Rotation1]: {
      [TileIndex.TileIndex1]: [0, 1, 2],
      [TileIndex.TileIndex3]: [2, 5, 8]
    },
    [Rotation.Rotation3]: {
      [TileIndex.TileIndex1]: [6, 3, 0],
      [TileIndex.TileIndex3]: [0, 1, 2]
    },
    [Rotation.Rotation5]: {
      [TileIndex.TileIndex1]: [8, 7, 6],
      [TileIndex.TileIndex3]: [6, 3, 0]
    },
    [Rotation.Rotation7]: {
      [TileIndex.TileIndex1]: [2, 5, 8],
      [TileIndex.TileIndex3]: [8, 7, 6]
    }
  },
  {
    [Rotation.Rotation1]: {
      [TileIndex.TileIndex0]: [6, 7, 8],
      [TileIndex.TileIndex2]: [2, 5, 8]
    },
    [Rotation.Rotation3]: {
      [TileIndex.TileIndex0]: [8, 5, 2],
      [TileIndex.TileIndex2]: [0, 1, 2]
    },
    [Rotation.Rotation5]: {
      [TileIndex.TileIndex0]: [2, 1, 0],
      [TileIndex.TileIndex2]: [0, 3, 6]
    },
    [Rotation.Rotation7]: {
      [TileIndex.TileIndex0]: [0, 3, 6],
      [TileIndex.TileIndex2]: [8, 7, 6]
    }
  },
  {
    [Rotation.Rotation1]: {
      [TileIndex.TileIndex1]: [0, 3, 6],
      [TileIndex.TileIndex3]: [6, 7, 8]
    },
    [Rotation.Rotation3]: {
      [TileIndex.TileIndex1]: [6, 7, 8],
      [TileIndex.TileIndex3]: [8, 5, 2]
    },
    [Rotation.Rotation5]: {
      [TileIndex.TileIndex1]: [8, 5, 2],
      [TileIndex.TileIndex3]: [2, 1, 0]
    },
    [Rotation.Rotation7]: {
      [TileIndex.TileIndex1]: [2, 1, 0],
      [TileIndex.TileIndex3]: [0, 3, 6]
    }
  },
  {
    [Rotation.Rotation1]: {
      [TileIndex.TileIndex0]: [0, 3, 6],
      [TileIndex.TileIndex2]: [0, 1, 2]
    },
    [Rotation.Rotation3]: {
      [TileIndex.TileIndex0]: [6, 7, 8],
      [TileIndex.TileIndex2]: [6, 3, 0]
    },
    [Rotation.Rotation5]: {
      [TileIndex.TileIndex0]: [8, 5, 2],
      [TileIndex.TileIndex2]: [8, 7, 6]
    },
    [Rotation.Rotation7]: {
      [TileIndex.TileIndex0]: [2, 1, 0],
      [TileIndex.TileIndex2]: [2, 5, 8]
    }
  }
]
