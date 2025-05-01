/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const RaceTrackHelp = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.race`)}</h2>
      <p>
        <Trans defaults="help.race.description.1" components={components} />
      </p>
      <p>
        <Trans defaults="help.race.description.2" components={components} />
      </p>
    </>
  )
}
