import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'
import { NextRuleHelper } from './NextRuleHelper'

export class RaceTrackHelper extends MaterialRulesPart {
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

  getBonus(moveLocationId: number, moveLocationX: number) {
    const locationBonus = bonus[moveLocationId][moveLocationX]
    new NextRuleHelper(this.game).addActionSpecialInNextRules(locationBonus)
  }
}

const bonus = [
  [RuleId.ShowAndSwitchTwoCharacterTiles, RuleId.TakeThreeSpecialActionTilesAndChooseOne, RuleId.ChooseActionForOpponent, '', ''],
  ['', RuleId.ChooseActionForOpponent, RuleId.TakeThreeSpecialActionTilesAndChooseOne, RuleId.SwitchInfluenceTokens, ''],
  ['', '', RuleId.AdvanceInFinanceCenter, RuleId.TakeThreeSpecialActionTilesAndChooseOne, RuleId.SwitchInfluenceTokens],
  ['', RuleId.ShowAndSwitchTwoCharacterTiles, ''],
  ['', '', RuleId.AdvanceInFinanceCenter]
]
