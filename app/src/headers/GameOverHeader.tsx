/** @jsxImportSource @emotion/react */
import { GatsbyRules } from '@gamepark/gatsby/GatsbyRules'
import { EndOfGameHelper } from '@gamepark/gatsby/rules/helpers/EndOfGameHelper'
import { usePlayerName, useRankedPlayers, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const GameOverHeader = () => {
  const rules = useRules<GatsbyRules>()!
  const rankedPlayers = useRankedPlayers()
  const firstPlayer = rankedPlayers[0]
  const winnerName = usePlayerName(firstPlayer.id)
  const winWithThreeSameColor = new EndOfGameHelper(rules.game).checkPlayerHasThreeSameColor(firstPlayer.id as number)
  const winWithAllColor = new EndOfGameHelper(rules.game).checkPlayerHasAllColors(firstPlayer.id as number)

  console.log(rules)
  if (winWithThreeSameColor) {
    return <Trans defaults="header.end.same.color.player" values={{ player: winnerName }} />
  }

  if (winWithAllColor) {
    return <Trans defaults="header.end.all.colors.player" values={{ player: winnerName }} />
  }

  const winnerScore = new EndOfGameHelper(rules.game).getScore(firstPlayer.id as number)
  const loserScore = new EndOfGameHelper(rules.game).getScore(rankedPlayers[1].id as number)

  if (winnerScore > loserScore) {
    return <Trans defaults="header.end.score.player" values={{ player: winnerName, winnerScore, loserScore }} />
  }

  const winnerCharacters = new EndOfGameHelper(rules.game).getPlayerCharacterTiles(firstPlayer.id as number)
  const loserCharacters = new EndOfGameHelper(rules.game).getPlayerCharacterTiles(rankedPlayers[1].id as number)

  if (winnerCharacters > loserCharacters) {
    return <Trans defaults="header.end.characters.player" values={{ player: winnerName, winnerCharacters, loserCharacters }} />
  }

  return <Trans defaults="header.end.tie" />
}
