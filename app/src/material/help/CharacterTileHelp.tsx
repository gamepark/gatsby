/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const CharacterTileHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.character.tile`)}</h2>
      <p>
        <Trans defaults="help.character.tile.description" components={components} />
      </p>
      <h3>{t(`help.character.tile.rallying`)}</h3>
      <p>
        <Trans defaults="help.character.tile.rallying.description" components={components} />
      </p>
      <h3>{t(`help.character.tile.end`)}</h3>
      <p>
        <Trans defaults="help.character.tile.end.description" components={components} />
      </p>
      <ul>
        <li>
          <Trans defaults="help.character.tile.end.condition.1" components={components} />
        </li>
        <li>
          <Trans defaults="help.character.tile.end.condition.2" components={components} />
        </li>
      </ul>
      <p>
        <Trans defaults="help.character.tile.end.victory" components={components} />
      </p>
      <p>
        <Trans defaults="help.character.tile.end.other" components={components} />
      </p>
    </>
  )
}
