import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { actionTokenDescription } from './ActionTokenDescription'
import { ascensionTokenDescription } from './AscensionTokenDescription'
import { cabaretTileDescription } from './CabaretTileDescription'
import { characterTileDescription } from './CharacterTileDescription'
import { gameBoardDescription } from './GameBoardDescription'
import { influenceTokenDescription } from './InfluenceTokenDescription'
import { raceFinishedOverlayTileDescription } from './RaceFinishedOverlayTileDescription'
import { specialActionTileDescription } from './SpecialActionTileDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.GameBoard]: gameBoardDescription,
  [MaterialType.CabaretTile]: cabaretTileDescription,
  [MaterialType.CharacterTile]: characterTileDescription,
  [MaterialType.AscensionToken]: ascensionTokenDescription,
  [MaterialType.InfluenceToken]: influenceTokenDescription,
  [MaterialType.ActionToken]: actionTokenDescription,
  [MaterialType.SpecialActionTile]: specialActionTileDescription,
  [MaterialType.RaceFinishedOverlayTile]: raceFinishedOverlayTileDescription
}
