import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const CabaretTileHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.cabarettile`)}</h2>
      <p>
        <Trans i18nKey="help.cabarettile.description" components={components} />
      </p>
    </>
  )
}
