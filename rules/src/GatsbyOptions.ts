import { getEnumValues, OptionsSpecV2 } from '@gamepark/rules-api'
import { PlayerRole } from './PlayerRole'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: PlayerRole }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type GatsbyOptions = {
  players: PlayerOptions[]
}

/**
 * The option space of gatsby: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 *
 * That is where the subscription gates went.
 */
export const GatsbyOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 2 },
  identities: { values: getEnumValues(PlayerRole) }
}
