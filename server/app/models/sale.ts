import { SaleSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Customer from '#models/customer'
import User from '#models/user'
import Receipt from '#models/receipt'

export default class Sale extends SaleSchema {
  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Receipt)
  declare receipts: HasMany<typeof Receipt>
}
