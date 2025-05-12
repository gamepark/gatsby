/** @jsxImportSource @emotion/react */
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
    const raceTrackHelper = new RaceTrackHelper(context.rules.game)
    switch (context.rules.game.rule!.id) {
      case RuleId.PlaceTokenOnRaceTrack:
      case RuleId.PlaceTokenOnCabaretOrRaceTrack:
        return raceTrackHelper.getPossibleRacePlace()
      case RuleId.PlaceTokenOnAnotherRaceTrack:
        return raceTrackHelper.getPossiblePaceOnAnotherRaceTrack()
      case RuleId.PlaceTokenOnSameRaceTrack:
        return raceTrackHelper.getPossiblePaceOnSameRaceTrack()
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

  locationDescription = new RaceTrackDescription()
}

export class RaceTrackDescription extends DropAreaDescription {
  width = 12
  height = 2.5
  borderRadius = 0.3

  help = RaceTrackHelp

  canShortClick(move: MaterialMove, location: Location): boolean {
    return (
      isMoveItemType(MaterialType.InfluenceToken)(move) &&
      move.location.type === location.type &&
      move.location.id === location.id
    )
  }
}

export class RaceTrackSpaceDescription extends DropAreaDescription {
  height = 1.5
  width = 1.5
  borderRadius = 1

  help = RaceTrackHelp
}

export const raceTrackLocator = new RaceTrackLocator()
