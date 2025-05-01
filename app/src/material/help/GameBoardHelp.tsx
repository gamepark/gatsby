/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { linkButtonCss, MaterialHelpProps, Picture, PlayMoveButton } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp
import Action1 from '../../images/actions/Action1.png'
import Action2 from '../../images/actions/Action2.png'
import Action3 from '../../images/actions/Action3.png'
import Action4 from '../../images/actions/Action4.png'

const components = {
  bold: <strong />,
  underline: <u />
}

export const GameBoardHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.board`)}</h2>
      <p>
        <Trans
          defaults="help.board.description"
          components={{
            ...components,
            cabaret: <PlayMoveButton css={linkButtonCss} move={displayLocationHelp({ type: LocationType.CabaretTokenSpace })} transient />,
            finance: <PlayMoveButton css={linkButtonCss} move={displayLocationHelp({ type: LocationType.FinanceCenter })} transient />,
            race: <PlayMoveButton css={linkButtonCss} move={displayLocationHelp({ type: LocationType.RaceTrack })} transient />
          }}
        />
      </p>
      <h3>{t(`help.board.actions`)}</h3>
      <p css={flex}>
        <Picture src={Action1} css={mini} />
        <span>
          <Trans defaults="help.board.actions.1" components={components} />
        </span>
      </p>
      <p css={flex}>
        <Picture src={Action2} css={mini} />
        <span>
          <Trans defaults="help.board.actions.2" components={components} />
        </span>
      </p>
      <p css={flex}>
        <Picture src={Action3} css={mini} />
        <span>
          <Trans defaults="help.board.actions.3" components={components} />
        </span>
      </p>
      <p css={flex}>
        <Picture src={Action4} css={mini} />
        <span>
          <Trans defaults="help.board.actions.4" components={components} />
        </span>
      </p>
      <p>
        <Trans defaults="help.board.actions.special" components={components} />
      </p>
      <p>
        <Trans
          defaults="help.board.bonus"
          components={{
            ...components,
            bonus: <PlayMoveButton css={linkButtonCss} move={displayLocationHelp({ type: LocationType.BonusCase })} transient />
          }}
        />
      </p>
    </>
  )
}

const flex = css`
  display: flex;
  column-gap: 0.5em;
`

const mini = css`
  height: 2.5em;
  border-radius: 0.2em;
`
