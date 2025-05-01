/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import StarCase from '../../images/starCase.png'

const components = {
  bold: <strong />,
  underline: <u />
}

export const CabaretHelp = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.cabaret`)}</h2>
      <p>
        <Trans defaults="help.cabaret.description.1" components={components} />
      </p>
      <p>
        <Trans
          defaults="help.cabaret.description.2"
          components={{
            ...components,
            star: <Picture src={StarCase} css={mini} />
          }}
        />
      </p>
      <p>
        <Trans
          defaults="help.cabaret.description.3"
          components={{
            ...components,
            star: <Picture src={StarCase} css={mini} />
          }}
        />
      </p>
      <p>
        <Trans defaults="help.cabaret.description.4" components={components} />
      </p>
    </>
  )
}

const mini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
`
