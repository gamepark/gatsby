/** @jsxImportSource @emotion/react */
import { GatsbyOptionsSpec } from '@gamepark/gatsby/GatsbyOptions'
import { GatsbyRules } from '@gamepark/gatsby/GatsbyRules'
import { GatsbySetup } from '@gamepark/gatsby/GatsbySetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { GatsbyLogs } from './history/GatsbyLogs'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="gatsby"
      logs={new GatsbyLogs()}
      Rules={GatsbyRules}
      optionsSpec={GatsbyOptionsSpec}
      GameSetup={GatsbySetup}
      material={Material}
      tutorial={new Tutorial()}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
