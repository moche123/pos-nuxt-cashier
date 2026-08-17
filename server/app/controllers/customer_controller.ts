import Customer from '#models/customer'
import { customerValidator } from '#validators/customer'
import type { HttpContext } from '@adonisjs/core/http'

export default class CustomerController {
  async index() {
    const customers = await Customer.all()
    return { data: customers.map((c) => c.serialize()) }
  }

  async byDocument({ params }: HttpContext) {
    const customers = await Customer.query().where('documentId', params.documentId)
    return { data: customers.map((c) => c.serialize()) }
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(customerValidator)
    const customer = await Customer.create(payload)
    return { data: customer.serialize() }
  }
}
