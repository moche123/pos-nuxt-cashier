/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    register: typeof routes['auth.register']
    me: typeof routes['auth.me']
  }
  category: {
    index: typeof routes['category.index']
    store: typeof routes['category.store']
    update: typeof routes['category.update']
    destroy: typeof routes['category.destroy']
  }
  product: {
    index: typeof routes['product.index']
    store: typeof routes['product.store']
    update: typeof routes['product.update']
    destroy: typeof routes['product.destroy']
  }
  customer: {
    index: typeof routes['customer.index']
    byDocument: typeof routes['customer.by_document']
    store: typeof routes['customer.store']
  }
  sale: {
    index: typeof routes['sale.index']
    store: typeof routes['sale.store']
    update: typeof routes['sale.update']
    destroy: typeof routes['sale.destroy']
  }
  receipt: {
    index: typeof routes['receipt.index']
    store: typeof routes['receipt.store']
    destroy: typeof routes['receipt.destroy']
  }
}
