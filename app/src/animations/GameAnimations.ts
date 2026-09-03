import { MaterialGameAnimations } from '@gamepark/react-game'
import { isShuffle } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

// The character tiles are shuffled once they have been shown, so that nobody can track one of them.
// Pure protection, nothing for the players to watch: no animation, and no shuffle sound either.
gameAnimations.configure(isShuffle).skip()
