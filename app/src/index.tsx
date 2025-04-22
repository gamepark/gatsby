/** @jsxImportSource @emotion/react */
import { GatsbyOptionsSpec } from '@gamepark/gatsby/GatsbyOptions'
import { GatsbyRules } from '@gamepark/gatsby/GatsbyRules'
import { GatsbySetup } from '@gamepark/gatsby/GatsbySetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="gatsby"
      Rules={GatsbyRules}
      optionsSpec={GatsbyOptionsSpec}
      GameSetup={GatsbySetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
