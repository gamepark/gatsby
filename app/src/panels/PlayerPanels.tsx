/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'

export const PlayerPanels = () => {
  const players = usePlayers<number>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel key={player.id} player={player} css={panelPosition(index)} />
      ))}
    </>,
    root
  )
}

const panelPosition = (index: number) => {
  if (index === 0) {
    return css`
      position: absolute;
      left: 1em;
      top: 8.5em;
      width: 28em;
    `
  }
  return css`
    position: absolute;
    right: 1em;
    top: 8.5em;
    width: 28em;
  `
}
