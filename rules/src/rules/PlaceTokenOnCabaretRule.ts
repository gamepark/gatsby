import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { CabaretHelper } from './helpers/CabaretHelper'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { Memory } from './Memory'

export class PlaceTokenOnCabaretRule extends PlayerTurnRule {
  cabaretHelper = new CabaretHelper(this.game)
  nextRuleHelper = new NextRuleHelper(this.game)

  onRuleStart(): MaterialMove[] {
    if (this.getPossiblePlace().length === 0) {
      return this.nextRuleHelper.moveToNextRule()
    }
    return [
      this.material(MaterialType.InfluenceToken).createItem({
        location: { type: LocationType.PlayerInfluenceTokenPile, player: this.player },
        id: this.player
      })
    ]
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    this.getPossiblePlace().forEach((place) => {
      moves.push(this.playerInfluenceTokens.moveItem(() => place))
    })
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.location.type === LocationType.CabaretTokenSpace) {
      this.memorize(Memory.LastTokenOnCabaretForPlayer, move.location, this.player)
      const bonus = this.cabaretHelper.getBonus(move.location.parent!, move.location.id as number)
      if (bonus !== null) {
        moves.push(this.customMove(CustomMoveType.GetBonus, bonus))
      }
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }
    return moves
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
