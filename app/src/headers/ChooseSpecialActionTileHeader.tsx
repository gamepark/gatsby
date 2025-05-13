/** @jsxImportSource @emotion/react */
import { GatsbyRules } from '@gamepark/gatsby/GatsbyRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const ChooseSpecialActionTileHeader = () => {
  const player = usePlayerId()
  const rules = useRules<GatsbyRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans defaults="header.choose.special.action.you" />
  }

  return <Trans defaults="header.choose.special.action.player" values={{ player: name }} />
}
