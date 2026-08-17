import { DateTime } from 'luxon'
import Product from '#models/product'
import Receipt from '#models/receipt'
import { createReceiptValidator } from '#validators/receipt'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReceiptController {
  async index() {
    const receipts = await Receipt.all()
    return { data: receipts.map((r) => r.serialize()) }
  }

  async store({ request }: HttpContext) {
    const { productId, quantity, saleId } = await request.validateUsing(createReceiptValidator)
    const product = await Product.findOrFail(productId)
    const receipt = await Receipt.create({
      productId,
      quantity,
      saleId,
      subtotal: product.price * quantity,
      date: DateTime.now(),
    })
    return { data: receipt.serialize() }
  }

  async destroy({ params, response }: HttpContext) {
    const receipt = await Receipt.findOrFail(params.id)
    await receipt.delete()
    return response.noContent()
  }
}
