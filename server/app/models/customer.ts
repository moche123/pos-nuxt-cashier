import { CustomerSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Sale from '#models/sale'

export default class Customer extends CustomerSchema {
  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>
}
