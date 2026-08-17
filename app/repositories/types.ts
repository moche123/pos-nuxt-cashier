import type { AuthResult, Category, Customer, Product, Receipt, RegisterPayload, Sale, User } from '~/types'

export interface NewProduct {
  name: string
  price: number
  stock: number
  categoryId: number
}

export interface NewReceipt {
  productId: number
  quantity: number
  saleId: number
}

/**
 * Data access port. Everything else in the app (pages, auth store) depends
 * on this interface, never on a concrete implementation — that's what lets
 * the app run in `local` mode (no backend) or `api` mode (a real backend)
 * by changing a single place: useRepository().
 */
export interface Repository {
  login(email: string, password: string): Promise<AuthResult>
  register(payload: RegisterPayload): Promise<AuthResult>
  me(): Promise<User>

  listCategories(): Promise<Category[]>
  createCategory(name: string): Promise<Category>
  updateCategory(id: number, name: string): Promise<Category>
  deleteCategory(id: number): Promise<void>

  listProducts(): Promise<Product[]>
  createProduct(payload: NewProduct): Promise<Product>
  updateProduct(id: number, payload: Pick<Product, 'name' | 'price' | 'stock'>): Promise<Product>
  deleteProduct(id: number): Promise<void>

  listCustomers(): Promise<Customer[]>
  findCustomerByDocument(documentId: string): Promise<Customer[]>
  createCustomer(payload: { name: string, documentId: string }): Promise<Customer>

  listSales(): Promise<Sale[]>
  createSale(customerId: number): Promise<Sale>
  updateSaleTotal(id: number, total: number): Promise<Sale>
  deleteSale(id: number): Promise<void>

  listReceipts(): Promise<Receipt[]>
  createReceipt(payload: NewReceipt): Promise<Receipt>
  deleteReceipt(id: number): Promise<void>
}
