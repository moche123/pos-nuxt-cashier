import Sale from '#models/sale'
import { createSaleValidator, updateSaleValidator } from '#validators/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SaleController {
  async index() {
    const sales = await Sale.all()
    return { data: sales.map((s) => s.serialize()) }
  }

  async store({ request, auth }: HttpContext) {
    const { customerId } = await request.validateUsing(createSaleValidator)
    const sale = await Sale.create({ customerId, userId: auth.getUserOrFail().id, total: 0 })
    return { data: sale.serialize() }
  }

  async update({ params, request }: HttpContext) {
    const sale = await Sale.findOrFail(params.id)
    const { total } = await request.validateUsing(updateSaleValidator)
    sale.total = total
    await sale.save()
    return { data: sale.serialize() }
  }

  async destroy({ params, response }: HttpContext) {
    const sale = await Sale.findOrFail(params.id)
    await sale.delete()
    return response.noContent()
  }
}
