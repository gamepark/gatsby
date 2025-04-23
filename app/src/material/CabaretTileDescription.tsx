/** @jsxImportSource @emotion/react */
import { CabaretTile } from '@gamepark/gatsby/material/CabaretTile'
import { CardDescription } from '@gamepark/react-game'
import Cabaret1 from '../images/cabaret/Cabaret1.jpg'
import Cabaret2 from '../images/cabaret/Cabaret2.jpg'
import Cabaret3 from '../images/cabaret/Cabaret3.jpg'
import Cabaret4 from '../images/cabaret/Cabaret4.jpg'
import Back from '../images/cabaret/CabaretBack.jpg'

export class CabaretTileDescription extends CardDescription {
  height = 5.5
  width = 5.5

  backImage = Back

  images = images
}

const images = {
  [CabaretTile.CabaretTile1]: Cabaret1,
  [CabaretTile.CabaretTile2]: Cabaret2,
  [CabaretTile.CabaretTile3]: Cabaret3,
  [CabaretTile.CabaretTile4]: Cabaret4
}

export const cabaretTileDescription = new CabaretTileDescription()
