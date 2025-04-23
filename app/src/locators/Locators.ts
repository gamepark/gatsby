import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { actionSpaceLocator } from './ActionSpaceLocator'
import { actionTokenIdleLocator } from './ActionTokenIdleLocator'
import { cabaretSpaceLocator } from './CabaretSpaceLocator'
import { cabaretTokenSpaceLocator } from './CabaretTokenSpaceLocator'
import { characterSpaceLocator } from './CharacterSpaceLocator'
import { financeCenterLocator } from './FinanceCenterLocator'
import { gameBoardLocator } from './GameBoardLocator'
import { playerInfluenceTokenPileLocator } from './PlayerInfluenceTokenPileLocator'
import { raceTrackLocator } from './RaceTrackLocator'

export const Locators: Partial<Record<LocationType, Locator<number, MaterialType, LocationType>>> = {
  [LocationType.GameBoard]: gameBoardLocator,
  [LocationType.CabaretSpace]: cabaretSpaceLocator,
  [LocationType.CharacterSpace]: characterSpaceLocator,
  [LocationType.FinanceCenter]: financeCenterLocator,
  [LocationType.PlayerInfluenceTokenPile]: playerInfluenceTokenPileLocator,
  [LocationType.RaceTrack]: raceTrackLocator,
  [LocationType.CabaretTokenSpace]: cabaretTokenSpaceLocator,
  [LocationType.ActionSpace]: actionSpaceLocator,
  [LocationType.ActionTokenIdle]: actionTokenIdleLocator
}
