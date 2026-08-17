import { CategorySchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'

export default class Category extends CategorySchema {
  @hasMany(() => Product)
  declare products: HasMany<typeof Product>
}
