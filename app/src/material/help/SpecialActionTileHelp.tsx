/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const SpecialActionTileHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.SpecialActionTile`)}</h2>
      <p>
        <Trans defaults="help.SpecialActionTile.description.1" components={components} />
      </p>
      <p>
        <Trans defaults="help.SpecialActionTile.description.2" components={components} />
      </p>
      <p>
        <Trans defaults="help.SpecialActionTile.description.3" components={components} />
      </p>
      <p>
        <Trans defaults="help.SpecialActionTile.description.4" components={components} />
      </p>
      {item.id && (
        <>
          <h2>{t(`help.SpecialActionTile.action`)}</h2>
          <p>
            <Trans defaults={`help.SpecialActionTile.action.${item.id}`} components={components} />
          </p>
        </>
      )}
    </>
  )
}
