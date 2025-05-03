/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { isCustomMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

export const GetRaceTrackBonusHistory = (props: MoveComponentProps) => {
  const { move, context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const bonus = isCustomMove(move) ? move.data : undefined

  return (
    <Trans defaults="history.race.bonus.player" values={{ player: name, bonus }}>
      <PlayMoveButton move={displayLocationHelp({ type: LocationType.BonusCase })} local />
    </Trans>
  )
}
