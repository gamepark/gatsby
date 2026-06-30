import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const RaceFinishedOverlayTileHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.raceFinishedOverlay`)}</h2>
      <p>
        <Trans i18nKey="help.raceFinishedOverlay.description.1" components={components} />
      </p>
      <p>
        <Trans i18nKey="help.raceFinishedOverlay.description.2" components={components} />
      </p>
    </>
  )
}
