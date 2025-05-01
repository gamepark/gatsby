/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import Bonus1 from '../../images/bonusCases/Bonus1.png'
import Bonus2 from '../../images/bonusCases/Bonus2.png'
import Bonus3 from '../../images/bonusCases/Bonus3.png'
import Bonus4 from '../../images/bonusCases/Bonus4.png'
import Bonus5 from '../../images/bonusCases/Bonus5.png'
import Bonus6 from '../../images/bonusCases/Bonus6.png'

const components = {
  bold: <strong />,
  underline: <u />
}

export const BonusHelp = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.bonus`)}</h2>
      <p>
        <Trans defaults="help.bonus.description" components={components} />
      </p>
      <p css={flex}>
        <Picture src={Bonus1} css={mini} />
        <span>
          <Trans defaults="help.bonus.bonus.1" components={components} />
        </span>
      </p>
      <p css={flex}>
        <Picture src={Bonus2} css={mini} />
        <span>
          <Trans defaults="help.bonus.bonus.2" components={components} />
        </span>
      </p>
      <p css={flex}>
        <Picture src={Bonus3} css={mini} />
        <span>
          <Trans defaults="help.bonus.bonus.3" components={components} />
        </span>
      </p>
      <p css={flex}>
        <Picture src={Bonus4} css={mini} />
        <span>
          <Trans defaults="help.bonus.bonus.4" components={components} />
        </span>
      </p>
      <p css={flex}>
        <Picture src={Bonus5} css={mini} />
        <span>
          <Trans defaults="help.bonus.bonus.5" components={components} />
        </span>
      </p>
      <p css={flex}>
        <Picture src={Bonus6} css={mini} />
        <span>
          <Trans defaults="help.bonus.bonus.6" components={components} />
        </span>
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
