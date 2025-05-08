import { Location, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
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

  getPossibleRacePlace() {
    const res: Location[] = []
    for (let i = 0; i < 5; i++) {
      const raceIsNotFinished =
        this.material(MaterialType.RaceFinishedOverlayTile).location((loc) => loc.type === LocationType.RaceTrack && loc.id === i).length === 0
      if (raceIsNotFinished) {
        res.push({ type: LocationType.RaceTrack, id: i })
      }
    }
    return res
  }

  checkAndGetRaceTrackCharacters() {
    const moves: MaterialMove[] = []
    const playerTokens = this.material(MaterialType.InfluenceToken)
      .location(LocationType.RaceTrack)
      .getItems()
      .map((item) => item.location)
    let increment = 0
    for (const { id, x } of playerTokens) {
      if ((id < 3 && x === 4) || (id > 2 && x === 2)) {
        const characterTile = this.material(MaterialType.CharacterTile).location(
          (loc) => loc.type === LocationType.CharacterSpace && loc.id === 7 + (id as number)
        )
        const tokensInTrack = this.material(MaterialType.InfluenceToken).location((loc) => loc.type === LocationType.RaceTrack && loc.id === id)
        const tokensInTrackIds = tokensInTrack.getItems().map((item) => item.id as number)
        const playerWoWinCharacter = tokensInTrackIds.filter((n) => n === 1).length > tokensInTrackIds.filter((n) => n === 2).length ? 1 : 2
        moves.push(
          characterTile.moveItem(({ location }) => ({ type: LocationType.PlayerCharacterTiles, rotation: location.rotation, player: playerWoWinCharacter }))
        )
        moves.push(...tokensInTrack.moveItems((item) => ({ type: LocationType.PlayerInfluenceTokenPile, player: item.id })))

        const raceFinishedOverlayTiles = this.material(MaterialType.RaceFinishedOverlayTile).location(LocationType.RaceFinishedDeck)
        if (raceFinishedOverlayTiles.length > 0) {
          moves.push(raceFinishedOverlayTiles.filter(({ location }) => location.x === increment).moveItem(() => ({ type: LocationType.RaceTrack, id, x: 2 })))
          increment += 1
        }
      }
    }
    return moves
  }

  getBonus(moveLocationId: number, moveLocationX: number) {
    const locationBonus = bonus[moveLocationId][moveLocationX]
    if (new NextRuleHelper(this.game).addActionSpecialInNextRules(locationBonus)) {
      return locationBonus
    }
    return null
  }
}

const bonus = [
  [RuleId.ShowTwoCharacterTiles, RuleId.TakeThreeSpecialActionTilesAndChooseOne, RuleId.ChooseActionForOpponent, '', ''],
  ['', RuleId.ChooseActionForOpponent, RuleId.TakeThreeSpecialActionTilesAndChooseOne, RuleId.SwitchInfluenceTokens, ''],
  ['', '', RuleId.AdvanceInFinanceCenter, RuleId.TakeThreeSpecialActionTilesAndChooseOne, RuleId.SwitchInfluenceTokens],
  ['', RuleId.ShowTwoCharacterTiles, ''],
  ['', '', RuleId.AdvanceInFinanceCenter]
]
