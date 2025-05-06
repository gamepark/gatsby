/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/gatsby/material/LocationType'
import { MaterialType } from '@gamepark/gatsby/material/MaterialType'
import { RuleId } from '@gamepark/gatsby/rules/RuleId'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, isStartRule } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Switch from '../images/bonusCases/Bonus3.png'
import Special from '../images/bonusCases/Bonus6.png'
import Star from '../images/starCase.png'
import { me, opponent, TutorialSetup } from './TutorialSetup'

const BaseComponents = {
  bold: <strong />,
  italic: <em />
}

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 1

  options = {
    players: [{ id: me }, { id: opponent }]
  }

  players = [{ id: me }, { id: opponent }]
  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.1" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.2" components={BaseComponents} />,
        position: { x: -50, y: -20 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.CharacterTile).location(LocationType.CharacterSpace)]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.3" components={BaseComponents} />
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.ActionToken)],
        locations: [
          this.location(LocationType.ActionSpace).id(1).location,
          this.location(LocationType.ActionSpace).id(2).location,
          this.location(LocationType.ActionSpace).id(3).location,
          this.location(LocationType.ActionSpace).id(4).location
        ]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.4" components={BaseComponents} />
      },
      move: {
        player: opponent,
        filter: (move, _) => {
          return isMoveItemType(MaterialType.SpecialActionTile)(move) && move.location.type === LocationType.ActionSpace
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.4" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.5" components={BaseComponents} />
      },
      move: {
        player: opponent,
        filter: (move, _) => {
          return (
            isMoveItemType(MaterialType.InfluenceToken)(move) &&
            move.location.type === LocationType.CabaretTokenSpace &&
            move.location.parent === 2 &&
            move.location.id === 5
          )
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.5" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.6" components={BaseComponents} />
      },
      focus: () => ({
        locations: [this.location(LocationType.ActionSpace).id(2).location],
        scale: 0.1
      }),
      move: {
        filter: (move, _) => {
          return isMoveItemType(MaterialType.ActionToken)(move) && move.location.type === LocationType.ActionSpace && move.location.id === 2
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.7" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.8" components={BaseComponents} />,
        position: { x: 45, y: 30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CabaretTile).location(LocationType.CabaretSpace),
          this.material(game, MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id < 3)
        ]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.9" components={BaseComponents} />,
        position: { x: 15, y: 0 }
      },
      move: {
        filter: (move, _) => {
          return (
            isMoveItemType(MaterialType.InfluenceToken)(move) &&
            move.location.type === LocationType.CabaretTokenSpace &&
            move.location.parent === 2 &&
            move.location.id === 4
          )
        },
        interrupt: (move) => isStartRule(move) && move.id === RuleId.AdvanceInFinanceCenter
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.10" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.11" components={BaseComponents} />,
        position: { x: 60, y: 0 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id > 2 && loc.id < 7)],
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.12" components={BaseComponents} />,
        position: { x: 60, y: 0 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id > 2 && loc.id < 7)],
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.13" components={BaseComponents} />
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.14" components={BaseComponents} />
      },
      move: {}
    },
    {
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.15" components={BaseComponents} />
      },
      move: {
        interrupt: (move) => isStartRule(move) && move.id === RuleId.AdvanceInFinanceCenter
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.16" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.17" components={BaseComponents} />,
        position: { x: 30 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === 2)],
        locations: [
          this.location(LocationType.CabaretTokenSpace).parent(1).id(8).location,
          this.location(LocationType.CabaretTokenSpace).parent(1).id(5).location,
          this.location(LocationType.CabaretTokenSpace).parent(1).id(2).location,
          this.location(LocationType.CabaretTokenSpace).parent(0).id(2).location,
          this.location(LocationType.CabaretTokenSpace).parent(3).id(6).location,
          this.location(LocationType.CabaretTokenSpace).parent(3).id(3).location,
          this.location(LocationType.CabaretTokenSpace).parent(3).id(0).location
        ],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.18" components={BaseComponents} />,
        position: { x: 30 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === 0)],
        locations: [
          this.location(LocationType.CabaretTokenSpace).parent(1).id(0).location,
          this.location(LocationType.CabaretTokenSpace).parent(1).id(1).location,
          this.location(LocationType.CabaretTokenSpace).parent(1).id(2).location,
          this.location(LocationType.CabaretTokenSpace).parent(0).id(2).location,
          this.location(LocationType.CabaretTokenSpace).parent(3).id(6).location,
          this.location(LocationType.CabaretTokenSpace).parent(3).id(7).location,
          this.location(LocationType.CabaretTokenSpace).parent(3).id(8).location
        ],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.step.19"
            components={{
              ...BaseComponents,
              gearing: <Picture src={Star} css={mini} />,
              swap: <Picture src={Switch} css={small} />
            }}
          />
        ),
        position: { x: 30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id === 1),
          this.material(game, MaterialType.InfluenceToken).location((loc) => loc.type === LocationType.CabaretTokenSpace && loc.parent === 2 && loc.id === 5)
        ],
        locations: [
          this.location(LocationType.CabaretTokenSpace).parent(0).id(4).location,
          this.location(LocationType.CabaretTokenSpace).parent(1).id(6).location,
          this.location(LocationType.CabaretTokenSpace).parent(3).id(2).location
        ],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.20" components={BaseComponents} />
      },
      move: {
        interrupt: (move) => isStartRule(move) && move.id === RuleId.ChooseAction
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.21" components={BaseComponents} />
      },
      move: {
        player: opponent,
        filter: (move, _) => {
          return isMoveItemType(MaterialType.ActionToken)(move) && move.location.type === LocationType.ActionSpace && move.location.id === 1
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.21" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.22" components={BaseComponents} />
      },
      move: {
        player: opponent,
        filter: (move, _) => {
          return (
            isMoveItemType(MaterialType.InfluenceToken)(move) &&
            move.location.type === LocationType.CabaretTokenSpace &&
            move.location.parent === 2 &&
            move.location.id === 2
          )
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.22" components={BaseComponents} />
      },
      move: {
        player: opponent,
        filter: (move, _) => {
          return (
            isMoveItemType(MaterialType.InfluenceToken)(move) &&
            move.location.type === LocationType.CabaretTokenSpace &&
            move.location.parent === 2 &&
            move.location.id === 1
          )
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.22" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.23" components={BaseComponents} />
      },
      focus: () => ({
        locations: [this.location(LocationType.ActionSpace).id(3).location],
        scale: 0.1
      }),
      move: {
        filter: (move, _) => {
          return isMoveItemType(MaterialType.ActionToken)(move) && move.location.type === LocationType.ActionSpace && move.location.id === 3
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.24" components={BaseComponents} />,
        position: { y: -10 }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.25" components={BaseComponents} />,
        position: { y: -10 }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.26" components={BaseComponents} />,
        position: { y: -10 }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.27" components={BaseComponents} />,
        position: { x: -60, y: 0 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.CharacterTile).location((loc) => loc.type === LocationType.CharacterSpace && loc.id > 6)],
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.28" components={BaseComponents} />,
        position: { x: -60, y: 0 }
      },
      focus: () => ({
        locations: [
          this.location(LocationType.RaceTrack).id(0).location,
          this.location(LocationType.RaceTrack).id(1).location,
          this.location(LocationType.RaceTrack).id(2).location,
          this.location(LocationType.RaceTrack).id(3).location,
          this.location(LocationType.RaceTrack).id(4).location
        ],
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.29" components={BaseComponents} />,
        position: { x: -60, y: 0 }
      },
      focus: () => ({
        locations: [
          this.location(LocationType.RaceTrack).id(0).location,
          this.location(LocationType.RaceTrack).id(1).location,
          this.location(LocationType.RaceTrack).id(2).location,
          this.location(LocationType.RaceTrack).id(3).location,
          this.location(LocationType.RaceTrack).id(4).location
        ],
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.step.30"
            components={{
              ...BaseComponents,
              special: <Picture src={Special} css={small} />
            }}
          />
        )
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SpecialActionTile).location(LocationType.SpecialActionDeck)],
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.31" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.32" components={BaseComponents} />
      }
    }
  ]
}

const mini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
`

const small = css`
  height: 1.55em;
  margin-bottom: -0.17em;
`
