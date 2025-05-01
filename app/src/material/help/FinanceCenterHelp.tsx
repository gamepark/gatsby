/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const FinanceCenterHelp = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.finance`)}</h2>
      <p>
        <Trans defaults="help.finance.description.1" components={components} />
      </p>
      <p>
        <Trans defaults="help.finance.description.2" components={components} />
      </p>
    </>
  )
}
