import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { actionSpaceLocator } from './ActionSpaceLocator'
import { bonusCaseLocator } from './bonusCaseLocator'
import { cabaretSpaceLocator } from './CabaretSpaceLocator'
import { cabaretTokenSpaceLocator } from './CabaretTokenSpaceLocator'
import { characterSpaceLocator } from './CharacterSpaceLocator'
import { financeCenterLocator } from './FinanceCenterLocator'
import { gameBoardLocator } from './GameBoardLocator'
import { playerCharacterTilesLocator } from './PlayerCharacterTilesLocator'
import { playerCharacterTilesShowLayoutLocator } from './PlayerCharacterTilesShowLayoutLocator'
import { playerInfluenceTokenPileLocator } from './PlayerInfluenceTokenPileLocator'
import { playerSpecialTilesDiscardLocator } from './PlayerSpecialTilesDiscardLocator'
import { raceFinishedOverlayTileDeckLocator } from './RaceFinishedOverlayTileDeckLocator'
import { raceTrackLocator } from './RaceTrackLocator'
import { specialActionLayoutLocator } from './SpecialActionLayoutLocator'
import { specialActionTileDeckLocator } from './SpecialActionTileDeckLocator'
import { specialActionTileDiscardLocator } from './SpecialActionTileDiscardLocator'

export const Locators: Partial<Record<LocationType, Locator<number, MaterialType, LocationType>>> = {
  [LocationType.GameBoard]: gameBoardLocator,
  [LocationType.CabaretSpace]: cabaretSpaceLocator,
  [LocationType.CharacterSpace]: characterSpaceLocator,
  [LocationType.FinanceCenter]: financeCenterLocator,
  [LocationType.PlayerInfluenceTokenPile]: playerInfluenceTokenPileLocator,
  [LocationType.PlayerCharacterTiles]: playerCharacterTilesLocator,
  [LocationType.PlayerSpecialTilesDiscard]: playerSpecialTilesDiscardLocator,
  [LocationType.RaceTrack]: raceTrackLocator,
  [LocationType.CabaretTokenSpace]: cabaretTokenSpaceLocator,
  [LocationType.ActionSpace]: actionSpaceLocator,
  [LocationType.SpecialActionDiscard]: specialActionTileDiscardLocator,
  [LocationType.SpecialActionDeck]: specialActionTileDeckLocator,
  [LocationType.SpecialActionLayout]: specialActionLayoutLocator,
  [LocationType.RaceFinishedDeck]: raceFinishedOverlayTileDeckLocator,
  [LocationType.PlayerCharacterTilesShowLayout]: playerCharacterTilesShowLayoutLocator,
  [LocationType.BonusCase]: bonusCaseLocator
}
