/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { RaceTrackHelper } from '@gamepark/gatsby/rules/helpers/RaceTrackHelper'
import { RuleId } from '@gamepark/gatsby/rules/RuleId'
import { DropAreaDescription, ListLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, Location, MaterialMove, XYCoordinates } from '@gamepark/rules-api'
import { RaceTrackHelp } from '../material/help/RaceTrackHelp'

class RaceTrackLocator extends ListLocator {
  parentItemType = MaterialType.GameBoard
  gap = { x: 2.18 }
  maxCount = 5

  getLocations(context: MaterialContext): Partial<Location>[] {
    if (!context.rules.game.rule || context.rules.getActivePlayer() !== context.player) return []
    const raceTrackHelper = new RaceTrackHelper(context.rules.game)
    switch (context.rules.game.rule.id) {
      case RuleId.PlaceTokenOnRaceTrack:
      case RuleId.PlaceTokenOnCabaretOrRaceTrack:
        return raceTrackHelper.getPossibleRacePlace()
      case RuleId.PlaceTokenOnAnotherRaceTrack:
        return raceTrackHelper.getPossiblePaceOnAnotherRaceTrack()
      case RuleId.PlaceTokenOnSameRaceTrack:
        return raceTrackHelper.getPossiblePaceOnSameRaceTrack()
      case RuleId.PlaceTokenOnRaceTrackAnywhere:
        return raceTrackHelper.getPossibleRacePlaceWithX()
      default:
        return []
    }
  }

  getPositionOnParent(location: Location): XYCoordinates {
    const line: number = location.id
    const baseY = 24.2
    const deltaY = 12.57
    const y = baseY + deltaY * line
    return { x: 70.3, y }
  }

  getLocationDescription(location: Location): LocationDescription {
    if (location.x === undefined) return new RaceTrackDescription()
    return new RaceTrackSpaceDescription()
  }
}

export class RaceTrackDescription extends DropAreaDescription {
  width = 12
  height = 2.5
  borderRadius = 0.3
  extraCss = css`
    background-color: rgba(0, 255, 0, 0.3);

    &:hover {
      background-color: rgba(0, 255, 0, 0.6) !important;
    }
  `

  help = RaceTrackHelp

  canShortClick(move: MaterialMove, location: Location): boolean {
    return isMoveItemType(MaterialType.InfluenceToken)(move) && move.location.type === location.type && move.location.id === location.id
  }
}

export class RaceTrackSpaceDescription extends DropAreaDescription {
  height = 1.5
  width = 1.5
  borderRadius = 1
  extraCss = css`
    background-color: rgba(0, 255, 0, 0.3);

    &:hover {
      background-color: rgba(0, 255, 0, 0.6) !important;
    }
  `

  help = RaceTrackHelp

  canShortClick(move: MaterialMove, location: Location): boolean {
    return (
      isMoveItemType(MaterialType.InfluenceToken)(move) &&
      move.location.type === location.type &&
      move.location.id === location.id &&
      move.location.x === location.x
    )
  }
}

export const raceTrackLocator = new RaceTrackLocator()
