import { Location, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class CabaretHelper extends MaterialRulesPart {

  getPlacesNear(id: number, parent: number): Location[] {
    if (id === 4) {
      return [
        { type: LocationType.CabaretTokenSpace, id: 1, parent },
        { type: LocationType.CabaretTokenSpace, id: 3, parent },
        { type: LocationType.CabaretTokenSpace, id: 5, parent },
        { type: LocationType.CabaretTokenSpace, id: 7, parent }
      ].filter((place) => this.checkIfPlaceIsEmpty(place))
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

    return places.filter((place) => this.checkIfPlaceIsEmpty(place))
  }

  checkIfPlaceIsEmpty(location: Location) {
    return (
      this.material(MaterialType.InfluenceToken).location(
        (loc) => loc.type === LocationType.CabaretTokenSpace && loc.parent === location.parent && loc.id === location.id
      ).length === 0
    )
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
