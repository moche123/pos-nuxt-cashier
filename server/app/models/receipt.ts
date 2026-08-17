import { ReceiptSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'
import Sale from '#models/sale'

export default class Receipt extends ReceiptSchema {
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @belongsTo(() => Sale)
  declare sale: BelongsTo<typeof Sale>
}
