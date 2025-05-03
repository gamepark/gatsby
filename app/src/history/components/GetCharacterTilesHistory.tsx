/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GetCharacterTilesHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = move.location.player
  const name = usePlayerName(actionPlayer)
  const tile = context.game.items[MaterialType.CharacterTile][move.itemIndex]
  const locationId = getCharacterLocation(tile.location.id)

  return (
    <Trans defaults="history.get.character.player" values={{ player: name, locationId }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.CharacterTile, tile)} local />
    </Trans>
  )
}

const getCharacterLocation = (locationId: number) => {
  switch (locationId) {
    case 0:
    case 1:
    case 2:
      return 1
    case 3:
    case 4:
    case 5:
    case 6:
      return 2
    default:
      return 3
  }
}
