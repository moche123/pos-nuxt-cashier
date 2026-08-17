import type { AuthResult, Category, Customer, Product, Receipt, RegisterPayload, Sale, User } from '~/types'
import type { NewProduct, NewReceipt, Repository } from './types'

interface ApiRepositoryOptions {
  baseURL: string
  getToken: () => string | null
  onUnauthorized: () => void
}

/**
 * Real implementation, against an HTTP backend. Expects English REST routes
 * (`/categories`, `/products`, `/customers`, `/sales`, `/receipts`,
 * `/login`, `/register`, `/me`) returning `{ data: ... }` envelopes.
 */
export class ApiRepository implements Repository {
  private http: typeof $fetch

  constructor(options: ApiRepositoryOptions) {
    this.http = $fetch.create({
      baseURL: options.baseURL,
      onRequest({ options: reqOptions }) {
        const token = options.getToken()
        if (token) reqOptions.headers.set('Authorization', `Bearer ${token}`)
      },
      onResponseError({ response }) {
        if (response.status === 401) options.onUnauthorized()
      }
    })
  }

  async login(email: string, password: string): Promise<AuthResult> {
    const { data } = await this.http<{ data: { token: string } }>('/login', { method: 'POST', body: { email, password } })
    const user = await this.meWithToken(data.token)
    return { token: data.token, user }
  }

  async register(payload: RegisterPayload): Promise<AuthResult> {
    const { data } = await this.http<{ data: { token: string } }>('/register', { method: 'POST', body: payload })
    const user = await this.meWithToken(data.token)
    return { token: data.token, user }
  }

  private async meWithToken(token: string): Promise<User> {
    const { data } = await this.http<{ data: User }>('/me', { headers: { Authorization: `Bearer ${token}` } })
    return data
  }

  async me(): Promise<User> {
    const { data } = await this.http<{ data: User }>('/me')
    return data
  }

  async listCategories() {
    const { data } = await this.http<{ data: Category[] }>('/categories')
    return data
  }

  async createCategory(name: string) {
    const { data } = await this.http<{ data: Category }>('/categories', { method: 'POST', body: { name } })
    return data
  }

  async updateCategory(id: number, name: string) {
    const { data } = await this.http<{ data: Category }>(`/categories/${id}`, { method: 'PATCH', body: { name } })
    return data
  }

  async deleteCategory(id: number) {
    await this.http(`/categories/${id}`, { method: 'DELETE' })
  }

  async listProducts() {
    const { data } = await this.http<{ data: Product[] }>('/products')
    return data
  }

  async createProduct(payload: NewProduct) {
    const { data } = await this.http<{ data: Product }>('/products', { method: 'POST', body: payload })
    return data
  }

  async updateProduct(id: number, payload: Pick<Product, 'name' | 'price' | 'stock'>) {
    const { data } = await this.http<{ data: Product }>(`/products/${id}`, { method: 'PATCH', body: payload })
    return data
  }

  async deleteProduct(id: number) {
    await this.http(`/products/${id}`, { method: 'DELETE' })
  }

  async listCustomers() {
    const { data } = await this.http<{ data: Customer[] }>('/customers')
    return data
  }

  async findCustomerByDocument(documentId: string) {
    const { data } = await this.http<{ data: Customer[] }>(`/customers/document/${documentId}`)
    return data
  }

  async createCustomer(payload: { name: string, documentId: string }) {
    const { data } = await this.http<{ data: Customer }>('/customers', { method: 'POST', body: payload })
    return data
  }

  async listSales() {
    const { data } = await this.http<{ data: Sale[] }>('/sales')
    return data
  }

  async createSale(customerId: number) {
    const { data } = await this.http<{ data: Sale }>('/sales', { method: 'POST', body: { customerId } })
    return data
  }

  async updateSaleTotal(id: number, total: number) {
    const { data } = await this.http<{ data: Sale }>(`/sales/${id}`, { method: 'PATCH', body: { total } })
    return data
  }

  async deleteSale(id: number) {
    await this.http(`/sales/${id}`, { method: 'DELETE' })
  }

  async listReceipts() {
    const { data } = await this.http<{ data: Receipt[] }>('/receipts')
    return data
  }

  async createReceipt(payload: NewReceipt) {
    const { data } = await this.http<{ data: Receipt }>('/receipts', { method: 'POST', body: payload })
    return data
  }

  async deleteReceipt(id: number) {
    await this.http(`/receipts/${id}`, { method: 'DELETE' })
  }
}
