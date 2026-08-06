import { GatsbyOptionsSpecV2 } from '@gamepark/gatsby/GatsbyOptions'
import { GatsbyRules } from '@gamepark/gatsby/GatsbyRules'
import { GatsbySetup } from '@gamepark/gatsby/GatsbySetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { GatsbyLogs } from './history/GatsbyLogs'
import Background from './images/Background.jpg'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { GatsbyScoring } from './scoring/GatsbyScoring'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="gatsby"
      logs={new GatsbyLogs()}
      Rules={GatsbyRules}
      optionsSpec={GatsbyOptionsSpecV2}
      GameSetup={GatsbySetup}
      material={Material}
      tutorial={new Tutorial()}
      locators={Locators}
      animations={gameAnimations}
      scoring={GatsbyScoring}
      theme={{ root: { background: { image: Background, overlay: 'rgba(0, 0, 0, 0.5)' } } }}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
