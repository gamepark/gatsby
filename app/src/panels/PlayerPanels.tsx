/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import Panel1 from '../images/panels/Panel1.png'
import Panel2 from '../images/panels/Panel2.png'

export const PlayerPanels = () => {
  const players = usePlayers<number>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => (
        <StyledPlayerPanel key={player.id} player={player} backgroundImage={images[player.id]} css={panelPosition(player.id)} />
      ))}
    </>,
    root
  )
}

const panelPosition = (player: number) => {
  if (player === 1) {
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

const images: Record<number, string> = {
  1: Panel1,
  2: Panel2
}
