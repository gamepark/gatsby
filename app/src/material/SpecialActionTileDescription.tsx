/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faHandBackFist } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { SpecialActionTile } from '@gamepark/gatsby/material/SpecialActionTile'
import { CustomMoveType } from '@gamepark/gatsby/rules/CustomMoveType'
import { CardDescription, ItemContext, ItemMenuButton, MaterialContext, pointerCursorCss } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import BonusTile1 from '../images/bonuses/BonusTile1.jpg'
import BonusTile2 from '../images/bonuses/BonusTile2.jpg'
import BonusTile3 from '../images/bonuses/BonusTile3.jpg'
import BonusTile4 from '../images/bonuses/BonusTile4.jpg'
import BonusTile5 from '../images/bonuses/BonusTile5.jpg'
import BonusTile6 from '../images/bonuses/BonusTile6.jpg'
import BonusTile7 from '../images/bonuses/BonusTile7.jpg'
import BonusTile8 from '../images/bonuses/BonusTile8.jpg'
import BonusTile9 from '../images/bonuses/BonusTile9.jpg'
import BonusTile10 from '../images/bonuses/BonusTile10.jpg'
import BonusTile11 from '../images/bonuses/BonusTile11.jpg'
import Back from '../images/bonuses/BonusTileBack.jpg'
import { SpecialActionTileHelp } from './help/SpecialActionTileHelp'
import { Trans } from 'react-i18next'

export class SpecialActionTileDescription extends CardDescription {
  height = 2.5
  width = 5.5

  backImage = Back

  images = images

  menuAlwaysVisible = true

  canLongClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.SpecialActionTile)(move) && move.location.type === LocationType.ActionSpace && move.itemIndex === context.index
  }

  help = SpecialActionTileHelp

  isFlippedOnTable(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    if (item.location?.type === LocationType.PlayerSpecialTilesDiscard) return true
    return super.isFlippedOnTable(item, context)
  }

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const { type, index } = context
    const moves = legalMoves.filter(isMoveItemType(type)).filter((move) => move.itemIndex === index)
    const place = moves.find((move) => move.location.type === LocationType.ActionSpace)
    const keep = legalMoves.find((move) => isCustomMoveType(CustomMoveType.KeepTile)(move))
    const spaceId = context.player === 1 ? 0 : 5
    const isInActionSpace = item.location.type === LocationType.ActionSpace && item.location.id === spaceId

    if (place) {
      return (
        <ItemMenuButton label={<Trans defaults="button.take" />} y={-1} x={3} move={place} css={itemBtn}>
          <FontAwesomeIcon icon={faHandBackFist} css={pointerCursorCss} width="0.8em" />
        </ItemMenuButton>
      )
    }
    if (keep && isInActionSpace) {
      return (
        <ItemMenuButton label={<Trans defaults="button.keep" />} y={-1} x={3} move={keep} css={itemBtn}>
          <FontAwesomeIcon icon={faHandBackFist} css={pointerCursorCss} width="1em" />
        </ItemMenuButton>
      )
    }
    return undefined
  }
}

const images = {
  [SpecialActionTile.SpecialActionTile1]: BonusTile1,
  [SpecialActionTile.SpecialActionTile2]: BonusTile2,
  [SpecialActionTile.SpecialActionTile3]: BonusTile3,
  [SpecialActionTile.SpecialActionTile4]: BonusTile4,
  [SpecialActionTile.SpecialActionTile5]: BonusTile5,
  [SpecialActionTile.SpecialActionTile6]: BonusTile6,
  [SpecialActionTile.SpecialActionTile7]: BonusTile7,
  [SpecialActionTile.SpecialActionTile8]: BonusTile8,
  [SpecialActionTile.SpecialActionTile9]: BonusTile9,
  [SpecialActionTile.SpecialActionTile10]: BonusTile10,
  [SpecialActionTile.SpecialActionTile11]: BonusTile11
}

export const specialActionTileDescription = new SpecialActionTileDescription()

const itemBtn = css`
  height: 1.5em;
  width: 1.5em;
`
