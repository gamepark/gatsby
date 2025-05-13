/** @jsxImportSource @emotion/react */
import { GatsbyRules } from '@gamepark/gatsby/GatsbyRules'
import { CustomMoveType } from '@gamepark/gatsby/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const ChooseIfAdvanceInFinanceCenterOrNotHeader = () => {
  const player = usePlayerId()
  const rules = useRules<GatsbyRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove((move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move))
  const advance = useLegalMove((move: MaterialMove) => isCustomMoveType(CustomMoveType.Advance)(move))

  if (itsMe) {
    return (
      <Trans
        defaults="header.finance.center.choose.you"
        components={{
          pass: <PlayMoveButton move={pass} />,
          advance: <PlayMoveButton move={advance} />
        }}
      />
    )
  }

  return <Trans defaults="header.finance.center.choose.player" values={{ player: name }} />
}
