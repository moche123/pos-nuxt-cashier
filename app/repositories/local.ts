import type { AuthResult, Category, Customer, Product, Receipt, RegisterPayload, Sale, User } from '~/types'
import type { NewProduct, NewReceipt, Repository } from './types'

/**
 * Module-scoped state, shared by every LocalRepository instance within the
 * same process — simulates a "database" so the app can be tried out without
 * any backend or DB. Resets when the dev server restarts; not for production.
 */
interface LocalUser extends User {
  password: string
}

const db = {
  users: [
    { id: 1, username: 'demo', email: 'demo@example.com', password: 'demo1234', type: 'admin' }
  ] as LocalUser[],
  categories: [
    { id: 1, name: 'Beverages' },
    { id: 2, name: 'Snacks' }
  ] as Category[],
  products: [
    { id: 1, name: 'Soda 500ml', price: 2.5, stock: 40, categoryId: 1 },
    { id: 2, name: 'Potato chips', price: 1.8, stock: 25, categoryId: 2 },
    { id: 3, name: 'Sparkling water', price: 1.2, stock: 60, categoryId: 1 }
  ] as Product[],
  customers: [
    { id: 1, name: 'Walk-in customer', documentId: '12345678' }
  ] as Customer[],
  sales: [] as Sale[],
  receipts: [] as Receipt[]
}

let nextId = { user: 2, category: 3, product: 4, customer: 2, sale: 1, receipt: 1 }

function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms))
}

function omitPassword(u: LocalUser): User {
  const { password, ...user } = u
  return user
}

function fakeToken(userId: number) {
  return `local:${userId}:${Math.random().toString(36).slice(2)}`
}

function userIdFromToken(token: string | null): number | null {
  if (!token?.startsWith('local:')) return null
  const id = Number(token.split(':')[1])
  return Number.isFinite(id) ? id : null
}

export class LocalRepository implements Repository {
  constructor(private getToken: () => string | null) {}

  private currentUser(): User {
    const id = userIdFromToken(this.getToken())
    const user = db.users.find(u => u.id === id)
    if (!user) throw new Error('Not authenticated')
    return omitPassword(user)
  }

  async login(email: string, password: string): Promise<AuthResult> {
    const user = db.users.find(u => u.email === email && u.password === password)
    if (!user) throw new Error('Wrong email or password.')
    return delay({ token: fakeToken(user.id), user: omitPassword(user) })
  }

  async register(payload: RegisterPayload): Promise<AuthResult> {
    if (db.users.some(u => u.email === payload.email)) {
      throw new Error('That email is already registered.')
    }
    const user: LocalUser = { id: nextId.user++, ...payload }
    db.users.push(user)
    return delay({ token: fakeToken(user.id), user: omitPassword(user) })
  }

  async me(): Promise<User> {
    return delay(this.currentUser())
  }

  async listCategories() {
    return delay([...db.categories])
  }

  async createCategory(name: string) {
    const category: Category = { id: nextId.category++, name }
    db.categories.push(category)
    return delay(category)
  }

  async updateCategory(id: number, name: string) {
    const category = db.categories.find(c => c.id === id)
    if (!category) throw new Error('Category not found')
    category.name = name
    return delay(category)
  }

  async deleteCategory(id: number) {
    db.categories = db.categories.filter(c => c.id !== id)
    return delay(undefined)
  }

  async listProducts() {
    return delay([...db.products])
  }

  async createProduct(payload: NewProduct) {
    const product: Product = { id: nextId.product++, ...payload }
    db.products.push(product)
    return delay(product)
  }

  async updateProduct(id: number, payload: Pick<Product, 'name' | 'price' | 'stock'>) {
    const product = db.products.find(p => p.id === id)
    if (!product) throw new Error('Product not found')
    Object.assign(product, payload)
    return delay(product)
  }

  async deleteProduct(id: number) {
    db.products = db.products.filter(p => p.id !== id)
    return delay(undefined)
  }

  async listCustomers() {
    return delay([...db.customers])
  }

  async findCustomerByDocument(documentId: string) {
    return delay(db.customers.filter(c => c.documentId === documentId))
  }

  async createCustomer(payload: { name: string, documentId: string }) {
    const customer: Customer = { id: nextId.customer++, ...payload }
    db.customers.push(customer)
    return delay(customer)
  }

  async listSales() {
    return delay([...db.sales])
  }

  async createSale(customerId: number) {
    const sale: Sale = {
      id: nextId.sale++,
      customerId,
      userId: this.currentUser().id,
      total: 0,
      createdAt: new Date().toISOString()
    }
    db.sales.push(sale)
    return delay(sale)
  }

  async updateSaleTotal(id: number, total: number) {
    const sale = db.sales.find(s => s.id === id)
    if (!sale) throw new Error('Sale not found')
    sale.total = total
    return delay(sale)
  }

  async deleteSale(id: number) {
    db.sales = db.sales.filter(s => s.id !== id)
    db.receipts = db.receipts.filter(r => r.saleId !== id)
    return delay(undefined)
  }

  async listReceipts() {
    return delay([...db.receipts])
  }

  async createReceipt(payload: NewReceipt) {
    const product = db.products.find(p => p.id === payload.productId)
    const receipt: Receipt = {
      id: nextId.receipt++,
      quantity: payload.quantity,
      productId: payload.productId,
      saleId: payload.saleId,
      subtotal: (product?.price ?? 0) * payload.quantity,
      date: new Date().toISOString().slice(0, 10)
    }
    db.receipts.push(receipt)
    return delay(receipt)
  }

  async deleteReceipt(id: number) {
    db.receipts = db.receipts.filter(r => r.id !== id)
    return delay(undefined)
  }
}
