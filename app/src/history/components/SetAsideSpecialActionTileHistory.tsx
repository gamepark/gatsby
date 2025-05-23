/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const SetAsideSpecialActionTileHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const tile = move.reveal ? { id: move.reveal.id, location: { type: 0, rotation: false } } : context.game.items[MaterialType.SpecialActionTile][move.itemIndex]

  return (
    <Trans defaults="history.aside.special.action.player" values={{ player: name }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.SpecialActionTile, tile)} transient />
    </Trans>
  )
}
