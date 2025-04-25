import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cabaretTiles } from '../material/CabaretTile'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class PlaceTokenOnCabaretRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    this.getPossiblePlace().forEach((place) => {
      moves.push(this.playerInfluenceTokens.moveItem(() => place))
    })
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItem(move) && move.location.type === LocationType.CabaretTokenSpace) {
      return [this.startPlayerTurn(RuleId.ChooseAction, this.nextPlayer)]
    }
    return []
  }

  getPossiblePlace() {
    const res: Location[] = []
    cabaretTiles.forEach((tile) => {
      for (let i = 0; i < 9; i++) {
        res.push({ type: LocationType.CabaretTokenSpace, id: i, parent: tile })
      }
    })
    return res
  }

  get playerInfluenceTokens() {
    return this.material(MaterialType.InfluenceToken).location(LocationType.PlayerInfluenceTokenPile).player(this.player)
  }
}
