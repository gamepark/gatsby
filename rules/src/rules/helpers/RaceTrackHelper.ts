import { Location, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { NextRuleHelper } from './NextRuleHelper'

export class RaceTrackHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getPossiblePaceOnAnotherRaceTrack() {
    const lasts: number[] | undefined = this.remind(Memory.LastTokenOnRaceTrackForPlayer, this.player) ?? []
    return this.getPossibleRacePlace().filter((place) => !lasts.includes(place.id as number))
  }

  getPossiblePaceOnSameRaceTrack() {
    const lasts: number[] | undefined = this.remind(Memory.LastTokenOnRaceTrackForPlayer, this.player) ?? []
    return this.getPossibleRacePlace().filter((place) => place.id === lasts[lasts.length - 1])
  }

  getPossibleRacePlace() {
    const res: Location[] = []
    for (let i = 0; i < 5; i++) {
      const raceIsNotFinished =
        this.material(MaterialType.RaceFinishedOverlayTile).location((loc) => loc.type === LocationType.RaceTrack && loc.id === i).length === 0
      if (raceIsNotFinished) {
        const max = i < 3 ? 5 : 3
        let x = undefined
        for (let j = 0; j < max; j++) {
          const noTokenOnThisPlace =
            this.material(MaterialType.InfluenceToken).location((loc) => loc.type === LocationType.RaceTrack && loc.id === i && loc.x === j).length === 0
          if (noTokenOnThisPlace) {
            x = j
            break
          }
        }
        res.push({ type: LocationType.RaceTrack, id: i, x })
      }
    }
    return res
  }

  getPossibleRacePlaceAnywhere() {
    const res: Location[] = []
    for (let i = 0; i < 5; i++) {
      const raceIsNotFinished =
        this.material(MaterialType.RaceFinishedOverlayTile).location((loc) => loc.type === LocationType.RaceTrack && loc.id === i).length === 0
      if (raceIsNotFinished) {
        const max = i < 3 ? 5 : 3
        for (let j = 0; j < max; j++) {
          const noTokenOnThisPlace =
            this.material(MaterialType.InfluenceToken).location((loc) => loc.type === LocationType.RaceTrack && loc.id === i && loc.x === j).length === 0
          if (noTokenOnThisPlace) {
            res.push({ type: LocationType.RaceTrack, id: i, x: j })
          }
        }
      }
    }
    return res
  }

  checkAndGetRaceTrackCharacters() {
    const moves: MaterialMove[] = []
    let increment = 0
    for (let id = 0; id < 5; id++) {
      const nbTokensInTrack = this.material(MaterialType.InfluenceToken).location((loc) => loc.type === LocationType.RaceTrack && loc.id === id).length
      if ((id < 3 && nbTokensInTrack === 5) || (id > 2 && nbTokensInTrack === 3)) {
        const characterTile = this.material(MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === 7 + id)
        const tokensInTrack = this.material(MaterialType.InfluenceToken).location((loc) => loc.type === LocationType.RaceTrack && loc.id === id)
        const tokensInTrackIds = tokensInTrack.getItems().map((item) => item.id as number)
        const nbTokensPlayer1 = tokensInTrackIds.filter((n) => n === 1).length
        const nbTokensPlayer2 = tokensInTrackIds.filter((n) => n === 2).length
        const playerWoWinCharacter = nbTokensPlayer1 > nbTokensPlayer2 ? 1 : 2
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
  ['', '', RuleId.ChooseIfAdvanceInFinanceCenterOrNot, RuleId.TakeThreeSpecialActionTilesAndChooseOne, RuleId.SwitchInfluenceTokens],
  ['', RuleId.ShowTwoCharacterTiles, ''],
  ['', '', RuleId.ChooseIfAdvanceInFinanceCenterOrNot]
]
