import Category from '#models/category'
import { categoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoryController {
  async index() {
    const categories = await Category.all()
    return { data: categories.map((c) => c.serialize()) }
  }

  async store({ request }: HttpContext) {
    const { name } = await request.validateUsing(categoryValidator)
    const category = await Category.create({ name })
    return { data: category.serialize() }
  }

  async update({ params, request }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    const { name } = await request.validateUsing(categoryValidator)
    category.name = name
    await category.save()
    return { data: category.serialize() }
  }

  async destroy({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
    return response.noContent()
  }
}
