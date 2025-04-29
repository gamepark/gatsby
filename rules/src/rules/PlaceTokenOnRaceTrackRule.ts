import { isMoveItem, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { EndOfGameHelper } from './helpers/EndOfGameHelper'
import { NextRuleHelper } from './helpers/NextRuleHelper'
import { RaceTrackHelper } from './helpers/RaceTrackHelper'
import { Memory } from './Memory'

export class PlaceTokenOnRaceTrackRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  raceTrackHelper = new RaceTrackHelper(this.game)
  endOfGameHelper = new EndOfGameHelper(this.game)

  onRuleStart(): MaterialMove[] {
    if (this.playerInfluenceTokens.length === 0 || this.getPossiblePlace().length === 0) {
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
    if (isMoveItem(move) && move.itemType === MaterialType.CharacterTile && move.location.type === LocationType.PlayerCharacterTiles) {
      return this.endOfGameHelper.checkEndOfGame(move.location.player!) ? [this.endGame()] : this.nextRuleHelper.moveToNextRule(this.nextPlayer)
    }

    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.InfluenceToken)(move) && move.location.type === LocationType.RaceTrack) {
      const tokenPlaced = this.material(MaterialType.InfluenceToken)
        .location((loc) => loc.type === LocationType.RaceTrack && loc.id === move.location.id)
        .maxBy((item) => item.location.x!)
        .getItem()
      this.memorize(Memory.LastTokenOnRaceTrackForPlayer, move.location.id, this.player)
      if (tokenPlaced) {
        this.raceTrackHelper.getBonus(move.location.id as number, tokenPlaced.location.x!)
        moves.push(...this.raceTrackHelper.checkAndGetRaceTrackCharacters(move.location.id as number, tokenPlaced.location.x!))
      }
      if (moves.length === 0) {
        return this.nextRuleHelper.moveToNextRule(this.nextPlayer)
      }
    }
    return moves
  }

  getPossiblePlace() {
    return this.raceTrackHelper.getPossibleRacePlace()
  }

  get playerInfluenceTokens() {
    return this.material(MaterialType.InfluenceToken).location(LocationType.PlayerInfluenceTokenPile).player(this.player)
  }
}
