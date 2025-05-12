/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { ActionHelper } from '@gamepark/gatsby/rules/helpers/ActionHelper'
import { RuleId } from '@gamepark/gatsby/rules/RuleId'
import { DropAreaDescription, DeckLocator, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, Location, MaterialMove, XYCoordinates } from '@gamepark/rules-api'

class ActionSpaceLocator extends DeckLocator {
  parentItemType = MaterialType.GameBoard

  getPositionOnParent(location: Location): XYCoordinates {
    return { x: 8.4 + 16.65 * location.id, y: 91 }
  }

  getLocations(context: MaterialContext): Partial<Location>[] {
    if (!context.rules.game.rule) return []
    const rule = context.rules.game.rule.id
    const opponent = context.rules.players.find((p) => p !== context.player)
    const playerWhoDoActions = rule === RuleId.ChooseAction ? context.player : opponent
    return new ActionHelper(context.rules.game, playerWhoDoActions!).getPossiblePlaces()
  }

  locationDescription = new ActionSpaceDescription()
}

export class ActionSpaceDescription extends DropAreaDescription {
  width = 8
  height = 5.5
  borderRadius = 0.3

  canShortClick(move: MaterialMove, location: Location): boolean {
    return isMoveItemType(MaterialType.ActionToken)(move) && move.location.type === location.type && move.location.id === location.id
  }
}

export const actionSpaceLocator = new ActionSpaceLocator()
