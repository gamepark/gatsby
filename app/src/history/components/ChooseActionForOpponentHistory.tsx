/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { actionTypes } from '@gamepark/gatsby/rules/helpers/ActionHelper'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const ChooseActionForOpponentHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const opponent = usePlayerName(context.game.players.find((player: number) => player !== actionPlayer))
  const actionId: number = move.location.id

  if (actionTypes.includes(actionId)) {
    return <Trans defaults="history.choose.action.opponent.player" values={{ player: name, actionId, opponent }} />
  }

  const tile: MaterialItem = context.game.items[MaterialType.SpecialActionTile].find(
    ({ location }: MaterialItem) => location.type === LocationType.ActionSpace && location.id === actionId
  )

  return (
    <Trans defaults="history.choose.action.special.opponent.player" values={{ player: name, opponent }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.SpecialActionTile, tile)} local />
    </Trans>
  )
}
