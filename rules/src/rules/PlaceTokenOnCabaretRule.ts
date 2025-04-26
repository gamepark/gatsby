import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CabaretHelper } from './helpers/CabaretHelper'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { Memory } from './Memory'

export class PlaceTokenOnCabaretRule extends PlayerTurnRule {
  cabaretHelper = new CabaretHelper(this.game)
  nextRuleHelper = new NextRuleHelper(this.game)

  onRuleStart(): MaterialMove[] {
    if (this.playerInfluenceTokens.length === 0) {
      return this.nextRuleHelper.moveToNextRule(this.nextPlayer)
    }
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    this.getPossiblePlace().forEach((place) => {
      moves.push(this.playerInfluenceTokens.moveItem(() => place))
    })
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.CabaretTokenSpace) {
      this.memorize(Memory.LastTokenOnCabaretForPlayer, move.location, this.player)
      return this.nextRuleHelper.moveToNextRule(this.nextPlayer)
    }
    return []
  }

  getPossiblePlace() {
    const res: Location[] = []
    this.material(MaterialType.CabaretTile)
      .getIndexes()
      .forEach((tile) => {
        for (let i = 0; i < 9; i++) {
          const hasNotAlreadyTokenPlaced = this.cabaretHelper.checkIfPlaceIsEmpty({ id: i, parent: tile } as Location)
          if (hasNotAlreadyTokenPlaced) {
            res.push({ type: LocationType.CabaretTokenSpace, id: i, parent: tile })
          }
        }
      })
    return res
  }

  get playerInfluenceTokens() {
    return this.material(MaterialType.InfluenceToken).location(LocationType.PlayerInfluenceTokenPile).player(this.player)
  }
}
