import { ListLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

export class SpecialActionLayoutLocator extends ListLocator {
  gap = { y: 1.5 }
  getCoordinates(location: Location): Partial<Coordinates> {
    const locationY = location.y ?? 0
    return { x: -32, y: -11 + locationY * this.gap.y }
  }
}

export const specialActionLayoutLocator = new SpecialActionLayoutLocator()
