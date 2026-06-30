import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GatsbyRules } from '@gamepark/gatsby/GatsbyRules'
import { EndOfGameHelper } from '@gamepark/gatsby/rules/helpers/EndOfGameHelper'
import { ScoringDescription } from '@gamepark/react-game'
import { GameOverHeader } from '../headers/GameOverHeader'

export const GatsbyScoring: ScoringDescription<number, GatsbyRules> = {
  getScoringKeys: () => ['score'],
  getScoringHeader: () => <FontAwesomeIcon icon={faStar} />,
  getScoringPlayerData: (_key, player, rules) => new EndOfGameHelper(rules.game).getScore(player),
  ResultHeader: GameOverHeader
}
