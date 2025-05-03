/** @jsxImportSource @emotion/react */
import { GatsbyRules } from '@gamepark/gatsby/GatsbyRules'
import { CustomMoveType } from '@gamepark/gatsby/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const ChooseSpecialActionTileHeader = () => {
  const player = usePlayerId()
  const rules = useRules<GatsbyRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove((move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move))

  if (itsMe) {
    return (
      <Trans
        defaults="header.choose.special.action.you"
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults="header.choose.special.action.player" values={{ player: name }} />
}
