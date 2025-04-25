import { Material, MaterialItem, PositiveSequenceStrategy } from '@gamepark/rules-api'

export class PositiveColumnSequenceStrategy extends PositiveSequenceStrategy {
  addItem(material: Material, item: MaterialItem) {
    item.location.y = material.getItems().length
    super.addItem(material, item)
  }
}